/**
 * Yêu Trồng Cây - Botanical NFT Registry & Exclusivity Engine
 * Dịch vụ Quản lý Sổ Đăng Ký Hộ Chiếu Cây Trồng Số & Cơ Chế Độc Bản Tuyệt Đối
 * 
 * QUY TẮC ĐỘC BẢN CỦA YÊU TRỒNG CÂY:
 * 1. Mỗi giống cây / mã gen mật mã học (SHA-256) chỉ có DUY NHẤT 1 Hộ Chiếu Số gốc (Original Master NFT).
 * 2. Người đúc đầu tiên (First Minter) là chủ nhân độc quyền trong thế giới yeutrongcay.com.
 * 3. Nếu người khác cố tình đúc lại: Hệ thống sẽ chặn trước khi đúc, hoặc gắn cờ DUPLICATE_REJECTED 
 *    và KHÔNG CHO HIỂN THỊ trong Hồ Sơ Cá Nhân / Vườn của tôi để bảo vệ 100% quyền độc bản.
 * 4. Đồng bộ Real-time qua Firebase Cloud Firestore để mọi người dùng trên toàn cầu cùng chia sẻ 1 nguồn sự thật.
 * 5. Tích hợp thuật toán Fuzzy Matching (Levenshtein Distance >= 85%) và khử sạch hậu tố phân loại thực vật để chống lách luật.
 */

import { getFirestoreInstance } from './firebaseClient.ts';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import type { NftAssetClass, PlantCategory } from '../types/index.ts';
import { inferNftClassFromPassport } from '../config/ecosystemRegistry.ts';

export interface RegisteredPlantPassport {
  id: string;
  token_id: string;                       // e.g. "1" or "#1"
  plant_name: string;
  scientific_name: string;
  plant_key: string;                      // Khóa định danh chuẩn hóa (VD: "polyscias-fruticosa")
  image_url: string;
  image_sha256: string;
  owner_address: string;                  // Địa chỉ ví hiện tại sở hữu
  creator_wallet: string;                 // Địa chỉ ví của người đúc đầu tiên (Chủ nhân gốc)
  creator_user_id?: string;               // ID tài khoản trên yeutrongcay.com
  creator_username?: string;              // Tên người dùng định danh theo email (VD: "tranthanhtung37")
  creator_email?: string;                 // Email đăng nhập (VD: "tranthanhtung37@gmail.com")
  network: string;                        // 'Ethereum Sepolia' | 'Base Sepolia' | string
  evolution_stage: 1 | 2 | 3;            // 1: Mầm non, 2: Sinh trưởng, 3: Ra hoa kết trái (hoặc 3 giai đoạn theo NFT Class)
  transaction_hash: string;
  contract_address: string;
  minted_at: string;
  is_onchain: boolean;
  status: 'ACTIVE_ORIGINAL' | 'DUPLICATE_REJECTED' | 'BURNED_RELEASED';
  rejection_reason?: string;
  burned_at?: string;                     // Thời điểm đốt token
  burn_tx_hash?: string;                  // Hash giao dịch đốt on-chain
  burn_reason?: string;                   // Lý do đốt (vd: Đổi ảnh mới)
  reincarnated_from_token_id?: string;    // Token ID gốc trước khi tái sinh
  generation?: number;                    // Thế hệ cây (1: Gốc, 2: Tái sinh lần 1...)
  reincarnation_locked_until?: number;    // Thời hạn ân hạn 24h độc quyền cho chủ cũ
  reincarnation_owner?: string;           // Địa chỉ ví chủ cũ được ưu tiên tái sinh
  current_owner_username?: string;        // Tên người dùng yeutrongcay sở hữu hiện tại (sau khi chuyển nhượng)
  current_owner_email?: string;           // Email người dùng sở hữu hiện tại
  current_owner_user_id?: string;         // User ID người sở hữu hiện tại
  transferred_at?: string;                // Thời điểm chuyển nhượng quyền sở hữu gần nhất
  transfer_tx_hash?: string;              // Mã băm transaction chuyển nhượng on-chain
  nft_class?: NftAssetClass;             // 5 lớp NFT: botanical, space_method, eco_invention, culinary_recipe, geo_forest_10000m2
  category?: PlantCategory;              // 7 danh mục
  forest_slug?: string;                  // Slug định danh khu rừng (nếu là geo_forest_10000m2)
  lot_number?: number;                   // Số thứ tự lô đất (Lô #1, #2... ứng với mỗi 10.000 m2)
  forest_area_m2?: number;               // Diện tích mỗi lô = 10000 m2
}

export interface UserPublicProfileConfig {
  original_handle: string;
  custom_handle: string;
  display_name: string;
  bio: string;
  location: string;
  specialty_tag: string;
  avatar_url?: string;
  has_edited_once: boolean;
  edited_at?: string;
}

const REGISTRY_STORAGE_KEY = 'ytc_botanical_nft_registry';
const FIRESTORE_COLLECTION = 'botanical_passports';
const PROFILE_STORAGE_KEY = 'ytc_public_profiles_v1';
const PROFILE_FIRESTORE_COLLECTION = 'user_public_profiles';

/**
 * Thuật toán tính độ tương đồng xâu ký tự theo Levenshtein Distance (0.0 -> 1.0)
 * Giúp phát hiện các chiêu trò cố tình gõ sai chính tả nhẹ hoặc thêm bớt ký tự để lách kiểm tra độc bản
 */
export function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();
  if (s1 === s2) return 1.0;
  if (!s1 || !s2) return 0.0;

  const m = s1.length;
  const n = s2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= m; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= n; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,        // xóa
        matrix[i][j - 1] + 1,        // chèn
        matrix[i - 1][j - 1] + cost  // thay thế
      );
    }
  }

  const distance = matrix[m][n];
  const maxLen = Math.max(m, n);
  return 1 - distance / maxLen;
}

/**
 * Rút gọn và chuẩn hóa username từ email (VD: tranthanhtung37@gmail.com -> tranthanhtung37)
 * Nếu chưa có email (chưa đăng nhập) -> trả về chuỗi rỗng
 */
export function getUsernameFromEmail(email?: string | null): string {
  if (!email || !email.includes('@')) return '';
  return email.split('@')[0].toLowerCase().replace(/[^a-z0-9_-]/g, '');
}

/**
 * Danh sách Hộ Chiếu Cây Độc Bản đã xác thực trên Smart Contract Ethereum Sepolia (0x5994cd371311fb1ddc1a3354b6979acd3cd342a7)
 */
const SEPOLIA_CONTRACT_ADDR = '0x5994cd371311fb1ddc1a3354b6979acd3cd342a7';

const DEFAULT_SEED_REGISTRY: RegisteredPlantPassport[] = [
  {
    id: 'passport-eth-sepolia-4',
    token_id: '4',
    plant_name: 'Xuyên Tâm Liên',
    scientific_name: 'Andrographis paniculata',
    plant_key: 'andrographis-paniculata',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Andrographis_paniculata_%28Kalpa%29_in_Narshapur_forest%2C_AP_W2_IMG_0867.jpg/330px-Andrographis_paniculata_%28Kalpa%29_in_Narshapur_forest%2C_AP_W2_IMG_0867.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail',
    image_sha256: '7109069741738df23ddc690208423b57f4f18d073f37a7de7e52421b577c96bc',
    owner_address: '0x1A81221CF769d8C3398b168Dc974D945ef9F0C26',
    creator_wallet: '0x1A81221CF769d8C3398b168Dc974D945ef9F0C26',
    creator_user_id: 'usr-local-me',
    creator_username: 'tranthanhtung37',
    network: 'Ethereum Sepolia',
    evolution_stage: 1,
    transaction_hash: '0x40028c3cd90c54e09c73f919acd01c4ef1e5c849d0c266171a13de91c9e7b317',
    contract_address: SEPOLIA_CONTRACT_ADDR,
    minted_at: '07/11/2026, 09:47:12',
    is_onchain: true,
    status: 'ACTIVE_ORIGINAL',
    nft_class: 'botanical',
    category: 'herb'
  },
  {
    id: 'passport-eth-sepolia-3',
    token_id: '3',
    plant_name: 'Cà Chua Bi Lùn Đỏ Mọng',
    scientific_name: 'Solanum lycopersicum var. cerasiforme',
    plant_key: 'solanum-lycopersicum-cerasiforme',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/330px-Tomato_je.jpg',
    image_sha256: 'c894ab997413a480fab79c055f7b4a7605985de24f2bf87b13041d3ac8732385',
    owner_address: '0x1A81221CF769d8C3398b168Dc974D945ef9F0C26',
    creator_wallet: '0x1A81221CF769d8C3398b168Dc974D945ef9F0C26',
    creator_user_id: 'usr-local-me',
    creator_username: 'tranthanhtung37',
    network: 'Ethereum Sepolia',
    evolution_stage: 3,
    transaction_hash: '0x024fa87ce78d1531a1effdb835c292288b69d401cb7f9b1fa2968fa6830ce7f7',
    contract_address: SEPOLIA_CONTRACT_ADDR,
    minted_at: '06/11/2026, 16:09:12',
    is_onchain: true,
    status: 'ACTIVE_ORIGINAL',
    nft_class: 'botanical',
    category: 'fruit'
  },
  {
    id: 'passport-eth-sepolia-2',
    token_id: '2',
    plant_name: 'Ổi Lê Ruột Đỏ Lùn Ban Công',
    scientific_name: 'Psidium guajava',
    plant_key: 'psidium-guajava',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Guava_ID.jpg/330px-Guava_ID.jpg',
    image_sha256: '9476f5538280656c7e79221af7f0865758037d75d8c19f7a6df783454a1c1024',
    owner_address: '0x1A81221CF769d8C3398b168Dc974D945ef9F0C26',
    creator_wallet: '0x1A81221CF769d8C3398b168Dc974D945ef9F0C26',
    creator_user_id: 'usr-local-me',
    creator_username: 'tranthanhtung37',
    network: 'Ethereum Sepolia',
    evolution_stage: 3,
    transaction_hash: '0x28731c9f4c53929fd3702b5d3c02dfe061391a6d9b4c668ab99162f09f7504f5',
    contract_address: SEPOLIA_CONTRACT_ADDR,
    minted_at: '06/11/2026, 16:07:48',
    is_onchain: true,
    status: 'ACTIVE_ORIGINAL',
    nft_class: 'botanical',
    category: 'fruit'
  },
  {
    id: 'passport-eth-sepolia-1',
    token_id: '1',
    plant_name: 'Đinh Lăng Nếp Lá Nhỏ (3 Năm Tuổi)',
    scientific_name: 'Polyscias fruticosa',
    plant_key: 'polyscias-fruticosa',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Polyscias_fruticosa,_Hong_Kong_Park,_December_2019_16.jpg/330px-Polyscias_fruticosa,_Hong_Kong_Park,_December_2019_16.jpg',
    image_sha256: '1f99d053655730bc5849c8586166b9fdd66b27c9e640cb8ad09803c7551787e9',
    owner_address: '0x1A81221CF769d8C3398b168Dc974D945ef9F0C26',
    creator_wallet: '0x1A81221CF769d8C3398b168Dc974D945ef9F0C26',
    creator_user_id: 'usr-local-me',
    creator_username: 'tranthanhtung37',
    network: 'Ethereum Sepolia',
    evolution_stage: 1,
    transaction_hash: '0x514b3766643507c97f53e6bd68c42b7633f582e8559698c01b1bed9784d317b8',
    contract_address: SEPOLIA_CONTRACT_ADDR,
    minted_at: '06/11/2026, 14:27:00',
    is_onchain: true,
    status: 'ACTIVE_ORIGINAL',
    nft_class: 'botanical',
    category: 'herb'
  }
];

let hasCloudSynced = false;

export const plantPassportRegistryService = {
  /**
   * Chuẩn hóa khóa nhận diện tài sản số (bỏ dấu, thường, gạch nối)
   * Tự động điều chỉnh theo từng lớp NFT:
   * - botanical: loại bỏ các hậu tố phân loại thực vật (var, subsp, l...)
   * - phi thực vật (space, recycle, culinary, forest): loại bỏ tiền tố nhãn (Method, Patent, Recipe...)
   */
  normalizeAssetKey(name: string, subtitleOrSci?: string, nftClass?: NftAssetClass): string {
    const raw = (subtitleOrSci && subtitleOrSci.trim().length > 3)
      ? subtitleOrSci
      : name;

    const base = raw
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    if (!nftClass || nftClass === 'botanical') {
      return base
        .replace(/\b(var|subsp|sp|ssp|f|forma|linnaeus|harms|mill|urb|l)\b\.?/gi, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    return base
      .replace(/\b(method|patent|formula|recipe|quy-trinh|lo-dat)\b[:\-]?/gi, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  /**
   * Chuẩn hóa khóa nhận diện cây (bảo toàn tương thích ngược cho botanical)
   */
  normalizePlantKey(plantName: string, scientificName?: string): string {
    return this.normalizeAssetKey(plantName, scientificName, 'botanical');
  },

  /**
   * Thống kê diện tích và các lô đất đã được đúc NFT của một khu rừng (1 NFT = 10.000 m2 = 1 ha)
   */
  getForestMintedAreaStats(forestSlug: string, totalAreaM2: number): {
    mintedCount: number;
    maxSupply: number;
    nextLotNumber: number;
    mintedM2: number;
    remainingM2: number;
    isSoldOut: boolean;
    mintedLots: number[];
  } {
    const all = this.getAllRegistrations().filter(
      p => p.status === 'ACTIVE_ORIGINAL' && (
        p.forest_slug === forestSlug ||
        (p.nft_class === 'geo_forest_10000m2' && (p.plant_key.includes(forestSlug) || p.forest_slug === forestSlug))
      )
    );

    const mintedLots: number[] = [];
    all.forEach(p => {
      const lot = p.lot_number || parseInt(p.token_id.replace(/\D/g, ''), 10) || 1;
      if (!mintedLots.includes(lot)) {
        mintedLots.push(lot);
      }
    });

    const mintedCount = mintedLots.length;
    const maxSupply = Math.max(1, Math.floor(totalAreaM2 / 10000));
    const nextLotNumber = mintedCount + 1;
    const mintedM2 = mintedCount * 10000;
    const remainingM2 = Math.max(0, totalAreaM2 - mintedM2);
    const isSoldOut = mintedCount >= maxSupply;

    return {
      mintedCount,
      maxSupply,
      nextLotNumber,
      mintedM2,
      remainingM2,
      isSoldOut,
      mintedLots: mintedLots.sort((a, b) => a - b)
    };
  },

  /**
   * Khử trùng lặp thông minh giữa bản ghi lưu tạm (random token_id) và bản ghi On-chain chuẩn (token_id #1, #2, #3...)
   * Hỗ trợ độc bản từng lớp tài sản: Rừng phân lô theo 10.000 m2 (không xung đột giữa các lô), cây thực vật độc bản theo loài.
   */
  deduplicatePassports(items: RegisteredPlantPassport[]): RegisteredPlantPassport[] {
    // Ưu tiên bản ghi có token_id nhỏ (chuẩn ERC-721 tuần tự 1, 2, 3, 4...) hơn random 4 chữ số
    const sorted = [...items].sort((a, b) => {
      const numA = parseInt(a.token_id.replace(/\D/g, ''), 10) || 999999;
      const numB = parseInt(b.token_id.replace(/\D/g, ''), 10) || 999999;
      return numA - numB;
    });

    const seenKeyOrSha = new Set<string>();
    const result: RegisteredPlantPassport[] = [];

    for (const item of sorted) {
      if (item.status !== 'ACTIVE_ORIGINAL') continue;
      const itemClass = item.nft_class || inferNftClassFromPassport(item);
      const shaKey = (item.image_sha256 || '').toLowerCase().trim();
      const txKey = (item.transaction_hash || '').toLowerCase().trim();
      const pKey = this.normalizeAssetKey(item.plant_name, item.scientific_name, itemClass);

      // Riêng lớp rừng sinh thái: mỗi lô 10.000 m2 là 1 NFT độc lập, các lô khác nhau của cùng 1 rừng không được loại trừ nhau
      if (itemClass === 'geo_forest_10000m2') {
        const forestSlug = item.forest_slug || pKey;
        const lotNum = item.lot_number || parseInt(item.token_id.replace(/\D/g, ''), 10) || 1;
        const forestLotKey = `forest:${forestSlug}:lot:${lotNum}`;

        if (seenKeyOrSha.has(forestLotKey) || (txKey && !txKey.includes('...') && seenKeyOrSha.has(`tx:${txKey}`))) {
          continue;
        }
        seenKeyOrSha.add(forestLotKey);
        if (txKey && !txKey.includes('...')) seenKeyOrSha.add(`tx:${txKey}`);
        result.push({ ...item, nft_class: itemClass });
        continue;
      }

      if ((shaKey && seenKeyOrSha.has(`sha:${shaKey}`)) || (pKey && seenKeyOrSha.has(`key:${pKey}`)) || (txKey && !txKey.includes('...') && seenKeyOrSha.has(`tx:${txKey}`))) {
        continue;
      }

      if (shaKey) seenKeyOrSha.add(`sha:${shaKey}`);
      if (pKey) seenKeyOrSha.add(`key:${pKey}`);
      if (txKey && !txKey.includes('...')) seenKeyOrSha.add(`tx:${txKey}`);
      result.push({ ...item, nft_class: itemClass });
    }

    // Sắp xếp lại theo token_id giảm dần (mới nhất lên đầu)
    return result.sort((a, b) => {
      const numA = parseInt(a.token_id.replace(/\D/g, ''), 10) || 0;
      const numB = parseInt(b.token_id.replace(/\D/g, ''), 10) || 0;
      return numB - numA;
    });
  },

  /**
   * Lấy toàn bộ danh bạ NFT trong hệ thống yeutrongcay.com (Tích hợp LocalStorage + Trigger Cloud Sync)
   */
  getAllRegistrations(): RegisteredPlantPassport[] {
    // Kích hoạt đồng bộ đám mây ngầm nếu chưa sync lần nào
    if (!hasCloudSynced) {
      this.syncWithCloud().catch(() => {});
    }

    try {
      const saved = localStorage.getItem(REGISTRY_STORAGE_KEY);
      if (!saved) {
        localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(DEFAULT_SEED_REGISTRY));
        return DEFAULT_SEED_REGISTRY;
      }
      const list = JSON.parse(saved) as RegisteredPlantPassport[];
      const combined = this.deduplicatePassports([...DEFAULT_SEED_REGISTRY, ...list]);
      if (combined.length !== list.length) {
        localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(combined));
      }
      return combined;
    } catch {
      return DEFAULT_SEED_REGISTRY;
    }
  },

  /**
   * ĐỒNG BỘ TRỰC TIẾP TỪ BLOCKCHAIN EXPLORER (BLOCKSCOUT SEPOLIA API)
   * Hoạt động 100% công khai cho cả người dùng chưa đăng nhập!
   */
  async fetchOnChainPassportsFromBlockscout(): Promise<RegisteredPlantPassport[]> {
    try {
      const [instRes, txRes] = await Promise.all([
        fetch(`https://eth-sepolia.blockscout.com/api/v2/tokens/${SEPOLIA_CONTRACT_ADDR}/instances`),
        fetch(`https://eth-sepolia.blockscout.com/api/v2/tokens/${SEPOLIA_CONTRACT_ADDR}/transfers`)
      ]);

      if (!instRes.ok) return [];
      const instJson = await instRes.json();
      const txJson = txRes.ok ? await txRes.json() : { items: [] };

      const txMap = new Map<string, { hash: string; timestamp: string }>();
      if (Array.isArray(txJson.items)) {
        for (const t of txJson.items) {
          const tid = String(t?.total?.token_id || '');
          if (tid && t?.transaction_hash && !txMap.has(tid)) {
            const d = t.timestamp ? new Date(t.timestamp).toLocaleString('vi-VN') : '07/11/2026';
            txMap.set(tid, { hash: t.transaction_hash, timestamp: d });
          }
        }
      }

      const onChainList: RegisteredPlantPassport[] = [];
      if (Array.isArray(instJson.items)) {
        for (const item of instJson.items) {
          const tokenId = String(item.id || '');
          if (!tokenId) continue;
          const meta = item.metadata || {};
          const attrs: Array<{ trait_type?: string; value?: string }> = Array.isArray(meta.attributes) ? meta.attributes : [];

          const findAttr = (keyword: string) =>
            attrs.find((a) => (a.trait_type || '').toLowerCase().includes(keyword))?.value || '';

          const rawName = findAttr('loài') || (meta.name ? String(meta.name).replace(/#\d+$/, '').trim() : `Cây Độc Bản #${tokenId}`);
          const sciName = findAttr('khoa học') || 'Plantae Indigena';
          const stageStr = findAttr('giai đoạn') || '1/3';
          const stageNum = (parseInt(stageStr, 10) || 1) as 1 | 2 | 3;
          const sha = findAttr('sha-256') || '';
          const ownerHash = item.owner?.hash || '0x1A81221CF769d8C3398b168Dc974D945ef9F0C26';
          const isAdminWallet = ownerHash.toLowerCase() === '0x1a81221cf769d8c3398b168dc974d945ef9f0c26';
          const txInfo = txMap.get(tokenId);

          const baseRecord = {
            id: `passport-eth-sepolia-${tokenId}`,
            token_id: tokenId,
            plant_name: rawName,
            scientific_name: sciName,
            plant_key: this.normalizePlantKey(rawName, sciName),
            image_url: meta.image || item.image_url || '',
            image_sha256: sha,
            owner_address: ownerHash,
            creator_wallet: ownerHash,
            creator_user_id: isAdminWallet ? 'usr-local-me' : undefined,
            creator_username: isAdminWallet ? 'tranthanhtung37' : ownerHash.toLowerCase(),
            network: 'Ethereum Sepolia',
            evolution_stage: stageNum,
            transaction_hash: txInfo?.hash || '0x514b3766643507c97f53e6bd68c42b7633f582e8559698c01b1bed9784d317b8',
            contract_address: SEPOLIA_CONTRACT_ADDR,
            minted_at: txInfo?.timestamp || '06/11/2026',
            is_onchain: true,
            status: 'ACTIVE_ORIGINAL' as const
          };
          const inferredClass = inferNftClassFromPassport(baseRecord);

          onChainList.push({
            ...baseRecord,
            nft_class: inferredClass,
            plant_key: this.normalizeAssetKey(rawName, sciName, inferredClass)
          });
        }
      }
      return onChainList;
    } catch {
      return [];
    }
  },

  /**
   * ĐỒNG BỘ SỔ CÁI ĐA TẦNG REAL-TIME (BLOCKSCOUT ON-CHAIN + PLESK PUBLIC API + FIRESTORE)
   * Đảm bảo khách truy cập dù ĐĂNG NHẬP hay KHÔNG ĐĂNG NHẬP đều thấy đủ 100% số lượng NFT!
   */
  async syncWithCloud(): Promise<RegisteredPlantPassport[]> {
    hasCloudSynced = true;
    const collected: RegisteredPlantPassport[] = [...DEFAULT_SEED_REGISTRY];

    // 1. Lấy dữ liệu hiện có trong LocalStorage
    try {
      const saved = localStorage.getItem(REGISTRY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as RegisteredPlantPassport[];
        if (Array.isArray(parsed)) collected.push(...parsed);
      }
    } catch {
      // ignore
    }

    // 2. Đồng bộ trực tiếp từ Blockchain Explorer (Blockscout Sepolia - Public 100%, không cần đăng nhập)
    const onChainItems = await this.fetchOnChainPassportsFromBlockscout();
    if (onChainItems.length > 0) {
      collected.push(...onChainItems);
    }

    // 3. Đồng bộ từ Plesk Public API (/api/passports.php - Public 100%, không cần đăng nhập)
    try {
      const apiRes = await fetch('/api/passports.php', { headers: { Accept: 'application/json' } });
      if (apiRes.ok) {
        const apiJson = await apiRes.json();
        if (apiJson.success && Array.isArray(apiJson.passports)) {
          collected.push(...apiJson.passports);
        }
        if (apiJson.success && apiJson.profiles && typeof apiJson.profiles === 'object') {
          const localProfiles = this.getAllPublicProfiles();
          const mergedProfiles = { ...localProfiles, ...apiJson.profiles };
          localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(mergedProfiles));
          window.dispatchEvent(new CustomEvent('ytc_public_profile_updated'));
        }
      }
    } catch {
      // ignore
    }

    // 4. Đồng bộ từ Firebase Firestore (nếu có phiên đăng nhập)
    const db = getFirestoreInstance();
    if (db) {
      try {
        const snap = await getDocs(collection(db, FIRESTORE_COLLECTION));
        snap.forEach((docSnap) => {
          collected.push(docSnap.data() as RegisteredPlantPassport);
        });
      } catch {
        // Khi khách chưa đăng nhập Firebase, Firestore có thể trả 403 -> đã có Tầng 1 & 2 đảm nhiệm!
      }
    }

    // Hợp nhất & khử trùng lặp chuẩn xác
    const mergedList = this.deduplicatePassports(collected);
    localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(mergedList));

    // Đẩy ngược danh sách đã chuẩn hóa lên Plesk Public API để mọi khách ẩn danh đều nhận được
    fetch('/api/passports.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'sync_passports', passports: mergedList })
    }).catch(() => {});

    window.dispatchEvent(new CustomEvent('ytc_passport_registry_updated'));
    return mergedList;
  },

  /**
   * Lưu 1 bản ghi Hộ chiếu lên cả Plesk Public API & Firestore Cloud
   */
  async uploadToCloud(passport: RegisteredPlantPassport): Promise<void> {
    // 1. Ghi lên Plesk Public API (phục vụ khách không đăng nhập)
    fetch('/api/passports.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'save_passport', passport })
    }).catch(() => {});

    // 2. Ghi lên Firestore Cloud
    const db = getFirestoreInstance();
    if (!db) return;

    try {
      const docId = `${passport.contract_address.toLowerCase()}_${passport.token_id}`;
      await setDoc(doc(db, FIRESTORE_COLLECTION, docId), passport);
    } catch (err) {
      console.warn('Lưu ý ghi Hộ chiếu lên Firestore:', err);
    }
  },

  /**
   * KIỂM TRA ĐỘC BẢN CHẶT CHẼ TRƯỚC KHI ĐÚC (Pre-mint Exclusivity Check)
   * Đa tầng bảo vệ theo từng lớp tài sản:
   * 1. Với geo_forest_10000m2: Kiểm tra hạn mức diện tích rừng (1 NFT = 10.000 m2) và số lô đất đã mint.
   * 2. Với botanical và các lớp khác: Mã băm SHA-256 + Khóa định danh chuẩn hóa + Thuật toán Fuzzy Matching (>=85%).
   */
  checkPlantExclusivity(params: {
    plantName: string;
    scientificName?: string;
    sha256?: string;
    walletAddress?: string;
    nftClass?: NftAssetClass;
    forestSlug?: string;
    lotNumber?: number;
    totalAreaM2?: number;
  }): {
    isAllowed: boolean;
    existingPassport?: RegisteredPlantPassport;
    reason?: string;
  } {
    const resolvedClass = params.nftClass || 'botanical';

    // XỬ LÝ ĐẶC BIỆT CHO LỚP RỪNG SINH THÁI (1 NFT = 10.000 m2 = 1 ha)
    if (resolvedClass === 'geo_forest_10000m2') {
      const fSlug = params.forestSlug || this.normalizeAssetKey(params.plantName, '', 'geo_forest_10000m2');
      const totalM2 = params.totalAreaM2 || 1000000;
      const stats = this.getForestMintedAreaStats(fSlug, totalM2);

      if (stats.isSoldOut) {
        return {
          isAllowed: false,
          reason: `Khu rừng này đã đúc hết 100% diện tích NFT (${stats.maxSupply}/${stats.maxSupply} lô - ${(stats.mintedM2 / 10000).toLocaleString('vi-VN')} ha)! Không thể đúc thêm.`
        };
      }

      if (params.lotNumber && stats.mintedLots.includes(params.lotNumber)) {
        return {
          isAllowed: false,
          reason: `Lô đất #${params.lotNumber} (10.000 m²) của khu rừng này đã được xác thực bảo trợ. Vui lòng nhận lô tiếp theo (#${stats.nextLotNumber})!`
        };
      }

      return { isAllowed: true };
    }

    const all = this.getAllRegistrations();
    const key = this.normalizeAssetKey(params.plantName, params.scientificName, resolvedClass);
    const userWallet = params.walletAddress?.toLowerCase().trim();

    // TẦNG 0: Kiểm tra thời hạn ân hạn độc quyền 24h sau khi đốt (Grace Period)
    // Chống cướp quyền đúc: Trong 24h, chỉ duy nhất người sở hữu vừa đốt mới được phép đúc lại!
    const recentlyBurned = all.find(
      p => p.status === 'BURNED_RELEASED' &&
           p.plant_key === key &&
           p.reincarnation_locked_until &&
           p.reincarnation_locked_until > Date.now()
    );
    if (recentlyBurned) {
      const isOwner = userWallet && recentlyBurned.reincarnation_owner?.toLowerCase() === userWallet;
      if (!isOwner) {
        return {
          isAllowed: false,
          existingPassport: recentlyBurned,
          reason: `Loài cây "${recentlyBurned.plant_name}" vừa được hóa vàng bởi chủ nhân để tái sinh. Hiện đang trong thời hạn ân hạn 24 giờ ưu tiên độc quyền cho ví chủ cũ (${recentlyBurned.reincarnation_owner?.slice(0, 6)}...${recentlyBurned.reincarnation_owner?.slice(-4)})!`
        };
      }
    }

    // TẦNG 1: Kiểm tra trùng khớp mã băm SHA-256 (Dấu vân tay hình ảnh số)
    if (params.sha256) {
      const matchSha = all.find(
        p => p.status === 'ACTIVE_ORIGINAL' && p.image_sha256.toLowerCase() === params.sha256!.toLowerCase()
      );
      if (matchSha) {
        if (userWallet && matchSha.creator_wallet.toLowerCase() === userWallet) {
          return {
            isAllowed: false,
            existingPassport: matchSha,
            reason: `Bạn đã đúc Hộ Chiếu Độc Bản cho ảnh này rồi (Token #${matchSha.token_id}). Trong Yêu Trồng Cây, mỗi bản ghi chỉ được đúc 1 lần duy nhất!`
          };
        }
        return {
          isAllowed: false,
          existingPassport: matchSha,
          reason: `Ảnh và mã SHA-256 này đã được cấp Hộ Chiếu Độc Bản bởi tác giả ${matchSha.creator_wallet.slice(0, 6)}...${matchSha.creator_wallet.slice(-4)}. Bạn không thể đúc lại tác phẩm của người khác!`
        };
      }
    }

    // TẦNG 2: Kiểm tra trùng khớp chính xác Giống Cây / Tên Khoa Học chuẩn hóa (`plant_key`)
    const matchExactKey = all.find(
      p => p.status === 'ACTIVE_ORIGINAL' && p.plant_key === key
    );
    if (matchExactKey) {
      if (userWallet && matchExactKey.creator_wallet.toLowerCase() === userWallet) {
        return {
          isAllowed: false,
          existingPassport: matchExactKey,
          reason: `Bạn đã sở hữu Hộ Chiếu Độc Bản của loài này (Token #${matchExactKey.token_id}). Hãy nâng cấp giai đoạn sinh trưởng thay vì đúc mới!`
        };
      }
      return {
        isAllowed: false,
        existingPassport: matchExactKey,
        reason: `Tài sản "${matchExactKey.plant_name}" đã được đúc Hộ Chiếu Độc Bản bởi ví ${matchExactKey.creator_wallet.slice(0, 6)}...${matchExactKey.creator_wallet.slice(-4)}. Theo quy tắc Độc Bản của Yêu Trồng Cây, mỗi đối tượng chỉ có 1 Hộ Chiếu Số duy nhất!`
      };
    }

    // TẦNG 3: Thuật toán Fuzzy Matching (Đo khoảng cách xâu Levenshtein >= 85%)
    // Phát hiện các trường hợp cố tình viết thêm bớt ký tự (ví dụ: "Polyscias-fruticosaa" hay "Polyscias fruticosa L.")
    for (const existing of all) {
      if (existing.status !== 'ACTIVE_ORIGINAL') continue;

      const simKey = calculateSimilarity(existing.plant_key, key);
      const simSci = params.scientificName
        ? calculateSimilarity(existing.scientific_name, params.scientificName)
        : 0;
      const simName = calculateSimilarity(existing.plant_name, params.plantName);

      // Nếu độ tương đồng vượt ngưỡng 85%
      if (simKey >= 0.85 || simSci >= 0.85 || simName >= 0.88) {
        if (userWallet && existing.creator_wallet.toLowerCase() === userWallet) {
          return {
            isAllowed: false,
            existingPassport: existing,
            reason: `Tài sản này tương đồng ${Math.round(Math.max(simKey, simSci, simName) * 100)}% với Hộ Chiếu Token #${existing.token_id} mà bạn đang sở hữu. Vui lòng cập nhật thay vì đúc trùng!`
          };
        }
        return {
          isAllowed: false,
          existingPassport: existing,
          reason: `Phát hiện "${params.plantName}" tương đồng ${Math.round(Math.max(simKey, simSci, simName) * 100)}% với Hộ Chiếu Độc Bản của "${existing.plant_name}" (Token #${existing.token_id}) đã thuộc về ví ${existing.creator_wallet.slice(0, 6)}...${existing.creator_wallet.slice(-4)}!`
        };
      }
    }

    return { isAllowed: true };
  },

  /**
   * TRA CỨU HỘ CHIẾU NFT ĐỘC BẢN CỦA MỘT LOÀI CÂY / TÀI SẢN (NẾU ĐÃ CÓ NGƯỜI ĐÚC TRƯỚC)
   * Phục vụ hiển thị huy hiệu "Đã tạo NFT" & link đến hồ sơ chủ sở hữu trên mỗi bài viết/thẻ cây
   */
  findPassportForPlant(params: {
    plantName: string;
    scientificName?: string;
    sha256?: string;
    nftClass?: NftAssetClass;
    forestSlug?: string;
    lotNumber?: number;
    totalAreaM2?: number;
  }): RegisteredPlantPassport | undefined {
    const check = this.checkPlantExclusivity({
      plantName: params.plantName,
      scientificName: params.scientificName,
      sha256: params.sha256,
      nftClass: params.nftClass,
      forestSlug: params.forestSlug,
      lotNumber: params.lotNumber,
      totalAreaM2: params.totalAreaM2
    });
    if (!check.isAllowed && check.existingPassport && check.existingPassport.status === 'ACTIVE_ORIGINAL') {
      return check.existingPassport;
    }
    return undefined;
  },

  /**
   * LẤY THÔNG TIN ĐỊNH DANH & ĐƯỜNG DẪN HỒ SƠ CỦA CHỦ SỞ HỮU NFT
   */
  getOwnerProfileMeta(passport: RegisteredPlantPassport): {
    handle: string;
    displayLabel: string;
    profilePath: string;
    shortWallet: string;
  } {
    const rawHandle =
      passport.creator_username ||
      getUsernameFromEmail(passport.creator_email) ||
      passport.owner_address ||
      'tranthanhtung37';
    const cleanRaw = rawHandle.replace(/^@/, '').trim().toLowerCase();
    const profileCfg = this.getPublicProfile(cleanRaw);
    const effectiveHandle = profileCfg.custom_handle || cleanRaw;

    const shortWallet = passport.owner_address
      ? `${passport.owner_address.slice(0, 6)}...${passport.owner_address.slice(-4)}`
      : '0x1A81...0C26';
    const displayLabel = effectiveHandle.startsWith('0x') ? shortWallet : `@${effectiveHandle}`;

    return {
      handle: effectiveHandle,
      displayLabel,
      profilePath: `/${effectiveHandle}`,
      shortWallet
    };
  },

  /**
   * LẤY CẤU HÌNH HỒ SƠ CÔNG KHAI CỦA NGƯỜI DÙNG (ẨN EMAIL BẢO MẬT, HỖ TRỢ SỬA 1 LẦN DUY NHẤT)
   */
  getAllPublicProfiles(): Record<string, UserPublicProfileConfig> {
    try {
      const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Record<string, UserPublicProfileConfig>) : {};
    } catch {
      return {};
    }
  },

  getPublicProfile(handleOrUsername: string): UserPublicProfileConfig {
    const clean = (handleOrUsername || 'tranthanhtung37').replace(/^@/, '').trim().toLowerCase();
    const map = this.getAllPublicProfiles();

    // Tìm theo original_handle hoặc custom_handle
    const found =
      map[clean] ||
      Object.values(map).find(
        (cfg) => cfg.original_handle.toLowerCase() === clean || cfg.custom_handle.toLowerCase() === clean
      );

    if (found) {
      return found;
    }

    const isDefaultAdmin = clean === 'tranthanhtung37';
    return {
      original_handle: clean,
      custom_handle: clean,
      display_name: isDefaultAdmin ? 'Trần Thanh Tùng' : clean,
      bio: 'Chào mừng bạn đến với vườn thực vật số công khai của tôi! Toàn bộ các giống cây bên dưới đều được cấp Hộ Chiếu Thực Vật Số độc bản duy nhất trên sổ cái blockchain, gắn liền với bảo chứng mật mã học và cam kết sinh thái bền vững.',
      location: 'Việt Nam',
      specialty_tag: 'Nhà Vườn Độc Bản Xác Thực',
      has_edited_once: false
    };
  },

  async syncPublicProfileFromCloud(handleOrUsername: string): Promise<UserPublicProfileConfig> {
    const clean = (handleOrUsername || '').replace(/^@/, '').trim().toLowerCase();
    if (!clean) return this.getPublicProfile(clean);

    const map = this.getAllPublicProfiles();

    // 1. Tải cấu hình hồ sơ từ Plesk Public API (hoạt động ngay cả khi chưa đăng nhập)
    try {
      const apiRes = await fetch('/api/passports.php', { headers: { Accept: 'application/json' } });
      if (apiRes.ok) {
        const apiJson = await apiRes.json();
        if (apiJson?.profiles && typeof apiJson.profiles === 'object') {
          Object.entries(apiJson.profiles).forEach(([k, val]) => {
            if (val && typeof val === 'object') {
              map[k.toLowerCase()] = val as UserPublicProfileConfig;
            }
          });
        }
      }
    } catch {
      // ignore
    }

    // 2. Tải cấu hình hồ sơ từ Firestore (nếu có quyền)
    const db = getFirestoreInstance();
    if (db) {
      try {
        const snap = await getDocs(collection(db, PROFILE_FIRESTORE_COLLECTION));
        snap.forEach((docSnap) => {
          const data = docSnap.data() as UserPublicProfileConfig;
          if (data && data.original_handle) {
            map[data.original_handle.toLowerCase()] = data;
          }
        });
      } catch {
        // ignore
      }
    }

    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent('ytc_public_profile_updated'));
    return this.getPublicProfile(clean);
  },

  /**
   * LƯU THÔNG TIN HỒ SƠ CÁ NHÂN (MỖI NGƯỜI CHỈ ĐƯỢC SỬA DUY NHẤT 1 LẦN)
   */
  saveOneTimeProfileEdit(
    handleOrUsername: string,
    updates: {
      custom_handle: string;
      display_name: string;
      bio: string;
      location: string;
      specialty_tag: string;
      avatar_url?: string;
    },
    reservedRoutes: string[] = []
  ): {
    success: boolean;
    error?: string;
    profile?: UserPublicProfileConfig;
  } {
    const current = this.getPublicProfile(handleOrUsername);

    // Chặn tuyệt đối nếu đã từng sửa 1 lần
    if (current.has_edited_once) {
      return {
        success: false,
        error: 'Bạn đã sử dụng 1/1 lượt chỉnh sửa hồ sơ duy nhất! Thông tin định danh hiện đã được khóa vĩnh viễn.'
      };
    }

    const cleanCustomHandle = updates.custom_handle
      .replace(/^@/, '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '');

    if (cleanCustomHandle.length < 3 || cleanCustomHandle.length > 32) {
      return {
        success: false,
        error: 'Mã định danh (@username) phải từ 3 đến 32 ký tự (chữ thường, số, gạch ngang hoặc gạch dưới).'
      };
    }

    if (reservedRoutes.includes(cleanCustomHandle)) {
      return {
        success: false,
        error: 'Mã định danh này trùng với đường dẫn hệ thống. Vui lòng chọn mã khác!'
      };
    }

    const map = this.getAllPublicProfiles();
    const conflict = Object.values(map).find(
      (cfg) =>
        cfg.original_handle !== current.original_handle &&
        (cfg.custom_handle.toLowerCase() === cleanCustomHandle ||
          cfg.original_handle.toLowerCase() === cleanCustomHandle)
    );
    if (conflict) {
      return {
        success: false,
        error: `Mã định danh @${cleanCustomHandle} đã thuộc về nhà vườn khác!`
      };
    }

    const cleanDisplayName = updates.display_name.trim();
    if (!cleanDisplayName || cleanDisplayName.length < 2) {
      return {
        success: false,
        error: 'Tên hiển thị phải có ít nhất 2 ký tự.'
      };
    }

    const updatedProfile: UserPublicProfileConfig = {
      original_handle: current.original_handle,
      custom_handle: cleanCustomHandle,
      display_name: cleanDisplayName,
      bio: updates.bio.trim() || current.bio,
      location: updates.location.trim() || 'Việt Nam',
      specialty_tag: updates.specialty_tag.trim() || 'Nhà Vườn Độc Bản Xác Thực',
      avatar_url: updates.avatar_url?.trim() || current.avatar_url,
      has_edited_once: true,
      edited_at: new Date().toLocaleString('vi-VN')
    };

    map[current.original_handle.toLowerCase()] = updatedProfile;
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(map));

    // Đồng bộ tên hiển thị vào ytc_user nếu đang đăng nhập
    try {
      const savedUser = localStorage.getItem('ytc_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        parsed.name = updatedProfile.display_name;
        if (updatedProfile.avatar_url) {
          parsed.avatar_url = updatedProfile.avatar_url;
        }
        localStorage.setItem('ytc_user', JSON.stringify(parsed));
      }
    } catch {
      // ignore
    }

    // Nếu người dùng đổi custom_handle, cập nhật creator_username trên các NFT của họ
    if (cleanCustomHandle !== current.original_handle) {
      const allPassports = this.getAllRegistrations();
      let changed = false;
      const updatedPassports = allPassports.map((p) => {
        const pHandle = (p.creator_username || getUsernameFromEmail(p.creator_email) || '').toLowerCase();
        if (pHandle === current.original_handle.toLowerCase()) {
          changed = true;
          const nextP = { ...p, creator_username: cleanCustomHandle };
          this.uploadToCloud(nextP).catch(() => {});
          return nextP;
        }
        return p;
      });
      if (changed) {
        localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(updatedPassports));
      }
    }

    // 1. Đồng bộ cấu hình hồ sơ lên Plesk Public Server API
    fetch('/api/passports.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'save_profile', profile: updatedProfile })
    }).catch(() => {});

    // 2. Đồng bộ cấu hình hồ sơ lên Firestore Cloud
    const db = getFirestoreInstance();
    if (db) {
      setDoc(doc(db, PROFILE_FIRESTORE_COLLECTION, current.original_handle.toLowerCase()), updatedProfile).catch(
        () => {}
      );
    }

    window.dispatchEvent(new CustomEvent('ytc_public_profile_updated', { detail: updatedProfile }));
    window.dispatchEvent(new CustomEvent('ytc_passport_registry_updated'));

    return {
      success: true,
      profile: updatedProfile
    };
  },

  /**
   * ĐĂNG KÝ HỘ CHIẾU MỚI VÀO SỔ CÁI HỆ THỐNG
   * Tự động áp dụng cơ chế xác thực Độc Bản:
   * - Nếu hợp lệ -> ACTIVE_ORIGINAL (Được phép hiển thị)
   * - Nếu phát hiện trùng lặp -> DUPLICATE_REJECTED (Loại khỏi hồ sơ cá nhân)
   * - Đồng thời ghi danh lên Firestore Cloud Database
   */
  registerPassport(passport: Omit<RegisteredPlantPassport, 'id' | 'status' | 'plant_key' | 'creator_wallet'> & { creator_wallet?: string }): {
    success: boolean;
    isOriginal: boolean;
    registered: RegisteredPlantPassport;
    message: string;
  } {
    const all = this.getAllRegistrations();
    const resolvedClass = passport.nft_class || 'botanical';
    const cleanTokenId = passport.token_id.replace('#', '').trim();
    const key = resolvedClass === 'geo_forest_10000m2'
      ? `geoforest10k_${passport.forest_slug || 'forest'}_lot_${passport.lot_number || 1}`
      : this.normalizeAssetKey(passport.plant_name, passport.scientific_name, resolvedClass);

    // Kiểm tra xem đã có ai đúc trước chưa qua pre-check
    const exclusivityCheck = this.checkPlantExclusivity({
      plantName: passport.plant_name,
      scientificName: passport.scientific_name,
      sha256: passport.image_sha256,
      walletAddress: passport.owner_address,
      nftClass: resolvedClass,
      forestSlug: passport.forest_slug,
      lotNumber: passport.lot_number
    });

    const isDuplicate = !exclusivityCheck.isAllowed && !!exclusivityCheck.existingPassport &&
      exclusivityCheck.existingPassport.creator_wallet.toLowerCase() !== passport.owner_address.toLowerCase();

    // Tự động nhận diện username từ phiên đăng nhập nếu chưa truyền
    let autoUsername = passport.creator_username;
    let autoEmail = passport.creator_email;
    if (!autoUsername) {
      try {
        const u = localStorage.getItem('ytc_user');
        if (u) {
          const parsed = JSON.parse(u);
          if (parsed.email) {
            autoEmail = parsed.email;
            autoUsername = getUsernameFromEmail(parsed.email);
          }
        }
      } catch {
        // ignore
      }
    }

    const newRecord: RegisteredPlantPassport = {
      ...passport,
      id: `passport-${Date.now()}-${cleanTokenId}`,
      token_id: cleanTokenId,
      plant_key: key,
      nft_class: resolvedClass,
      creator_wallet: passport.creator_wallet || passport.owner_address,
      creator_username: autoUsername || 'tranthanhtung37',
      creator_email: autoEmail || 'tranthanhtung37@gmail.com',
      status: isDuplicate ? 'DUPLICATE_REJECTED' : 'ACTIVE_ORIGINAL',
      rejection_reason: isDuplicate
        ? exclusivityCheck.reason || `Trùng lặp với Hộ Chiếu Độc Bản gốc. Không được phép hiển thị trong hồ sơ cá nhân.`
        : undefined
    };

    // Lưu vào danh bạ LocalStorage
    const updated = [newRecord, ...all.filter(p => p.token_id !== cleanTokenId || p.contract_address.toLowerCase() !== passport.contract_address.toLowerCase())];
    localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(updated));

    // Đẩy lên Firestore Cloud đồng bộ toàn cầu
    this.uploadToCloud(newRecord).catch(() => {});

    // Phát sự kiện toàn ứng dụng
    window.dispatchEvent(new CustomEvent('ytc_passport_registry_updated', { detail: newRecord }));

    if (isDuplicate) {
      return {
        success: false,
        isOriginal: false,
        registered: newRecord,
        message: 'NFT này đã bị loại khỏi hồ sơ cá nhân vì trùng lặp với Hộ Chiếu Cây Độc Bản đã tồn tại trước đó!'
      };
    }

    return {
      success: true,
      isOriginal: true,
      registered: newRecord,
      message: 'Hộ Chiếu Cây Độc Bản đã được ghi nhận thành công và hiển thị trong Hồ Sơ Cá Nhân!'
    };
  },

  /**
   * ĐỐT BỎ HỘ CHIẾU THỰC VẬT SỐ ĐỂ TÁI SINH
   * QUY TẮC BẢO MẬT: BẮT BUỘC CHỈ CHỦ SỞ HỮU (owner_address) MỚI CÓ QUYỀN ĐỐT!
   */
  burnPassport(params: {
    tokenId: string;
    callerWalletAddress: string;
    txHash: string;
    reason?: string;
  }): {
    success: boolean;
    burnedPassport?: RegisteredPlantPassport;
    message: string;
  } {
    const all = this.getAllRegistrations();
    const cleanTokenId = params.tokenId.replace('#', '').trim();
    const caller = params.callerWalletAddress.toLowerCase().trim();

    const targetIndex = all.findIndex(
      p => (p.token_id === cleanTokenId || p.token_id === `#${cleanTokenId}` || p.id === cleanTokenId) && p.status === 'ACTIVE_ORIGINAL'
    );

    if (targetIndex === -1) {
      return {
        success: false,
        message: `Không tìm thấy Hộ Chiếu Độc Bản còn hiệu lực với Token ID #${cleanTokenId}`
      };
    }

    const passport = all[targetIndex];

    // KIỂM TRA BẢO MẬT BẮT BUỘC: CHỈ NGƯỜI SỞ HỮU NFT MỚI ĐƯỢC QUYỀN ĐỐT
    const owner = (passport.owner_address || passport.creator_wallet).toLowerCase().trim();
    if (owner !== caller) {
      return {
        success: false,
        message: `Bảo mật vi phạm: Bạn không phải là chủ sở hữu của Hộ Chiếu này! Chỉ địa chỉ ví chủ sở hữu (${owner.slice(0, 6)}...${owner.slice(-4)}) mới có quyền đốt bỏ.`
      };
    }

    // Cập nhật trạng thái sang BURNED_RELEASED
    const burnedRecord: RegisteredPlantPassport = {
      ...passport,
      status: 'BURNED_RELEASED',
      burned_at: new Date().toLocaleString('vi-VN'),
      burn_tx_hash: params.txHash,
      burn_reason: params.reason || 'Người dùng đốt bỏ để tái sinh với hình ảnh mới đẹp hơn',
      reincarnation_locked_until: Date.now() + 24 * 60 * 60 * 1000, // 24 giờ ân hạn độc quyền cho chủ cũ
      reincarnation_owner: caller
    };

    all[targetIndex] = burnedRecord;
    localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(all));

    // Đẩy cập nhật lên Firestore
    this.uploadToCloud(burnedRecord).catch(() => {});

    // Phát sự kiện toàn hệ thống
    window.dispatchEvent(new CustomEvent('ytc_passport_burned', { detail: burnedRecord }));

    return {
      success: true,
      burnedPassport: burnedRecord,
      message: `Đã đốt bỏ thành công Hộ Chiếu #${cleanTokenId}! Khóa độc bản của loài "${passport.plant_name}" được giải phóng và ưu tiên cho bạn đúc lại trong 24 giờ tới.`
    };
  },

  /**
   * Lấy danh sách các Hộ Chiếu Cây đã từng được đốt của người dùng
   */
  getUserBurnedPassports(walletAddress: string): RegisteredPlantPassport[] {
    const clean = walletAddress.toLowerCase().trim();
    return this.getAllRegistrations().filter(
      p => p.status === 'BURNED_RELEASED' && (
        p.owner_address.toLowerCase() === clean ||
        p.creator_wallet.toLowerCase() === clean ||
        p.reincarnation_owner?.toLowerCase() === clean
      )
    );
  },

  /**
   * CHUYỂN NHƯỢNG QUYỀN SỞ HỮU HỘ CHIẾU THỰC VẬT SỐ (P2P NFT Transfer)
   * QUY TẮC BẢO MẬT:
   * - Người mới (chủ sở hữu mới) nhận toàn quyền sở hữu và QUYỀN ĐỐT / TÁI SINH NFT.
   * - Người cũ (chủ cũ) MẤT HOÀN TOÀN QUYỀN ĐỐT VÀ QUYỀN QUẢN LÝ.
   */
  transferPassportOwnership(params: {
    tokenId: string;
    fromWallet: string;
    toWallet: string;
    toUsername?: string;
    toEmail?: string;
    toUserId?: string;
    txHash?: string;
  }): {
    success: boolean;
    transferredPassport?: RegisteredPlantPassport;
    message: string;
  } {
    const all = this.getAllRegistrations();
    const cleanTokenId = params.tokenId.replace('#', '').trim();
    const from = params.fromWallet.toLowerCase().trim();
    const to = params.toWallet.toLowerCase().trim();

    const targetIndex = all.findIndex(
      p => (p.token_id === cleanTokenId || p.token_id === `#${cleanTokenId}` || p.id === cleanTokenId) && p.status === 'ACTIVE_ORIGINAL'
    );

    if (targetIndex === -1) {
      return {
        success: false,
        message: `Không tìm thấy Hộ Chiếu Độc Bản còn hiệu lực với Token ID #${cleanTokenId}`
      };
    }

    const passport = all[targetIndex];
    const currentOwner = (passport.owner_address || passport.creator_wallet).toLowerCase().trim();

    // KIỂM TRA BẢO MẬT: Bắt buộc người gửi phải là chủ sở hữu hiện tại!
    if (currentOwner !== from) {
      return {
        success: false,
        message: `Bảo mật vi phạm: Ví của bạn (${from.slice(0, 6)}...${from.slice(-4)}) không phải là chủ sở hữu hiện tại của Hộ Chiếu này!`
      };
    }

    // Cập nhật chủ sở hữu mới (Người cũ mất quyền, người mới nhận quyền)
    const updatedRecord: RegisteredPlantPassport = {
      ...passport,
      owner_address: to,
      current_owner_username: params.toUsername || to.slice(0, 8),
      current_owner_email: params.toEmail,
      current_owner_user_id: params.toUserId,
      transferred_at: new Date().toLocaleString('vi-VN'),
      transfer_tx_hash: params.txHash || passport.transaction_hash
    };

    all[targetIndex] = updatedRecord;
    localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(all));

    // Đồng bộ lên Cloud Firestore
    this.uploadToCloud(updatedRecord).catch(() => {});

    // Phát sự kiện chuyển nhượng quyền sở hữu
    window.dispatchEvent(new CustomEvent('ytc_passport_transferred', { detail: updatedRecord }));

    return {
      success: true,
      transferredPassport: updatedRecord,
      message: `Đã chuyển nhượng thành công Hộ Chiếu #${cleanTokenId} cho ví ${to.slice(0, 6)}...${to.slice(-4)}! Người mới hiện có toàn quyền quản lý và quyền đốt NFT.`
    };
  },

  /**
   * LẤY DANH SÁCH HỘ CHIẾU ĐỘC BẢN HỢP LỆ CỦA NGƯỜI DÙNG ĐỂ HIỂN THỊ GALLERY
   * BỘ LỌC NGHIÊM NGẶT:
   * - Ai đăng nhập (email/username/id) thì chỉ hiển thị NFT thuộc sở hữu của người đó.
   * - Người cũ sau khi chuyển nhượng sẽ MẤT QUYỀN hiển thị trong bộ sưu tập cá nhân.
   * - Loại bỏ hoàn toàn các NFT trùng lặp (DUPLICATE_REJECTED).
   */
  getUserVerifiedGallery(walletAddress?: string, userId?: string, emailOrHandle?: string): RegisteredPlantPassport[] {
    const all = this.getAllRegistrations();
    const cleanWallet = walletAddress?.toLowerCase().trim();
    const cleanHandle = emailOrHandle ? emailOrHandle.replace(/^@/, '').split('@')[0].toLowerCase().trim() : undefined;

    return all.filter(p => {
      // 1. Chỉ hiển thị các NFT Độc Bản Hợp Lệ
      if (p.status !== 'ACTIVE_ORIGINAL') return false;

      // Xác định định danh người sở hữu hiện tại (Ưu tiên current_owner_* nếu đã từng chuyển nhượng)
      const currentOwnerHandle = (p.current_owner_username || p.creator_username || '').toLowerCase();
      const currentOwnerEmail = (p.current_owner_email || p.creator_email || '').toLowerCase();
      const currentOwnerAddress = (p.owner_address || p.creator_wallet).toLowerCase();
      const currentUserId = p.current_owner_user_id || p.creator_user_id;

      // 2. Khớp với email hoặc username của người đang đăng nhập
      if (cleanHandle) {
        if (currentOwnerHandle && currentOwnerHandle === cleanHandle) return true;
        if (currentOwnerEmail && currentOwnerEmail.startsWith(cleanHandle)) return true;
        if (cleanHandle === 'tranthanhtung37' && (p.token_id === '1' || currentUserId === 'usr-local-me') && !p.current_owner_username) return true;
      }

      // 3. Khớp với địa chỉ ví của chủ sở hữu hiện tại (Người cũ MẤT QUYỀN hiển thị)
      if (cleanWallet && currentOwnerAddress === cleanWallet) {
        return true;
      }
      if (userId && currentUserId === userId) {
        return true;
      }

      // Nếu chưa đăng nhập và chưa kết nối ví -> không có NFT cá nhân
      return false;
    });
  },

  /**
   * LẤY DANH SÁCH HỘ CHIẾU ĐỘC BẢN CÔNG KHAI DỰA TRÊN USERNAME / EMAIL (VD: "tranthanhtung37")
   * Phục vụ trang hồ sơ công khai https://yeutrongcay.com/:username
   * Sau khi chuyển nhượng, NFT thuộc về hồ sơ của người nhận mới
   */
  getUserVerifiedGalleryByUsername(usernameOrHandle?: string): RegisteredPlantPassport[] {
    if (!usernameOrHandle) return [];
    const cleanHandle = usernameOrHandle.replace(/^@/, '').toLowerCase().trim();
    const profileCfg = this.getPublicProfile(cleanHandle);
    const matchHandles = new Set([
      cleanHandle,
      profileCfg.original_handle.toLowerCase(),
      profileCfg.custom_handle.toLowerCase()
    ]);
    const all = this.getAllRegistrations();

    return all.filter(p => {
      if (p.status !== 'ACTIVE_ORIGINAL') return false;

      const currentOwnerHandle = (p.current_owner_username || p.creator_username || '').toLowerCase();
      const currentOwnerEmail = (p.current_owner_email || p.creator_email || '').toLowerCase();
      const currentOwnerAddress = (p.owner_address || p.creator_wallet).toLowerCase();

      // Khớp theo username của chủ sở hữu hiện tại
      if (currentOwnerHandle && matchHandles.has(currentOwnerHandle)) {
        return true;
      }

      // Khớp theo email prefix
      const emailPrefix = getUsernameFromEmail(currentOwnerEmail);
      if (emailPrefix && matchHandles.has(emailPrefix)) {
        return true;
      }

      // Khớp theo địa chỉ ví (nếu URL truyền ví 0x...)
      if (cleanHandle.startsWith('0x') && currentOwnerAddress === cleanHandle) {
        return true;
      }

      // Nếu là hồ sơ gốc tranthanhtung37, ưu tiên luôn Token #1
      if (matchHandles.has('tranthanhtung37') && (p.token_id === '1' || p.creator_user_id === 'usr-local-me') && !p.current_owner_username) {
        return true;
      }

      return false;
    });
  },

  /**
   * Lấy danh sách toàn bộ Hộ Chiếu Độc Bản trong thế giới Yêu Trồng Cây (Phục vụ Triển lãm chung)
   */
  getAllVerifiedOriginals(): RegisteredPlantPassport[] {
    return this.getAllRegistrations().filter(p => p.status === 'ACTIVE_ORIGINAL');
  }
};
