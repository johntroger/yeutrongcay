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
  evolution_stage: 1 | 2 | 3;            // 1: Mầm non, 2: Sinh trưởng, 3: Ra hoa kết trái
  transaction_hash: string;
  contract_address: string;
  minted_at: string;
  is_onchain: boolean;
  status: 'ACTIVE_ORIGINAL' | 'DUPLICATE_REJECTED';
  rejection_reason?: string;
}

const REGISTRY_STORAGE_KEY = 'ytc_botanical_nft_registry';
const FIRESTORE_COLLECTION = 'botanical_passports';

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
 * Danh sách hạt giống mặc định đã đúc (Token #1 của người dùng vừa đúc on-chain thành công)
 */
const DEFAULT_SEED_REGISTRY: RegisteredPlantPassport[] = [
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
    creator_email: 'tranthanhtung37@gmail.com',
    network: 'Ethereum Sepolia',
    evolution_stage: 1,
    transaction_hash: '0x514b3766643507c97f53e6bd68c42b7633f582e8559698c01b1bed9784d317b8',
    contract_address: '0x05c59ff29a361ac200decd5d9aa378844535164e',
    minted_at: '06/11/2026, 14:27:00',
    is_onchain: true,
    status: 'ACTIVE_ORIGINAL'
  }
];

let hasCloudSynced = false;

export const plantPassportRegistryService = {
  /**
   * Chuẩn hóa khóa nhận diện cây (bỏ dấu, thường, gạch nối, loại bỏ hậu tố phân loại học)
   */
  normalizePlantKey(plantName: string, scientificName?: string): string {
    const raw = (scientificName && scientificName.trim().length > 3)
      ? scientificName
      : plantName;
      
    return raw
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // Loại bỏ các tiền tố / hậu tố danh pháp thực vật thường được dùng để lách luật
      .replace(/\b(var|subsp|sp|ssp|f|forma|linnaeus|harms|mill|urb|l)\b\.?/gi, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
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
      // Đảm bảo luôn có token #1 nếu chưa có
      if (!list.some(p => p.token_id === '1' && p.contract_address.toLowerCase() === DEFAULT_SEED_REGISTRY[0].contract_address.toLowerCase())) {
        list.unshift(DEFAULT_SEED_REGISTRY[0]);
        localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(list));
      }
      return list;
    } catch {
      return DEFAULT_SEED_REGISTRY;
    }
  },

  /**
   * ĐỒNG BỘ SỔ CÁI REAL-TIME TỪ FIREBASE CLOUD FIRESTORE
   * Giúp mọi người dùng ở khắp nơi trên thế giới đều chia sẻ chung một nguồn dữ liệu độc bản duy nhất
   */
  async syncWithCloud(): Promise<RegisteredPlantPassport[]> {
    hasCloudSynced = true;
    const db = getFirestoreInstance();
    if (!db) {
      return this.getAllRegistrations();
    }

    try {
      const snap = await getDocs(collection(db, FIRESTORE_COLLECTION));
      const cloudList: RegisteredPlantPassport[] = [];
      snap.forEach(docSnap => {
        cloudList.push(docSnap.data() as RegisteredPlantPassport);
      });

      // Nếu đám mây chưa có token #1 -> tự động tải lên để khởi tạo sổ cái chung
      if (!cloudList.some(p => p.token_id === '1')) {
        await this.uploadToCloud(DEFAULT_SEED_REGISTRY[0]);
        cloudList.unshift(DEFAULT_SEED_REGISTRY[0]);
      }

      // Hợp nhất dữ liệu giữa Cloud và Local
      const localList = this.getAllRegistrations();
      const mergedMap = new Map<string, RegisteredPlantPassport>();

      // Đưa local vào trước
      localList.forEach(p => {
        const uniqueKey = `${p.contract_address.toLowerCase()}_${p.token_id}`;
        mergedMap.set(uniqueKey, p);
      });

      // Ghi đè bằng dữ liệu Cloud (Nguồn sự thật chính thức)
      cloudList.forEach(p => {
        const uniqueKey = `${p.contract_address.toLowerCase()}_${p.token_id}`;
        mergedMap.set(uniqueKey, p);
      });

      const mergedList = Array.from(mergedMap.values());
      localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(mergedList));

      // Phát sự kiện cập nhật giao diện
      window.dispatchEvent(new CustomEvent('ytc_passport_registry_updated'));
      return mergedList;
    } catch (err) {
      console.warn('Lưu ý: Không thể đồng bộ Sổ cái từ Firestore (dùng dữ liệu bộ nhớ đệm):', err);
      return this.getAllRegistrations();
    }
  },

  /**
   * Lưu 1 bản ghi Hộ chiếu lên Firestore Cloud
   */
  async uploadToCloud(passport: RegisteredPlantPassport): Promise<void> {
    const db = getFirestoreInstance();
    if (!db) return;

    try {
      const docId = `${passport.contract_address.toLowerCase()}_${passport.token_id}`;
      await setDoc(doc(db, FIRESTORE_COLLECTION, docId), passport);
    } catch (err) {
      console.warn('Lỗi ghi Hộ chiếu lên Firestore:', err);
    }
  },

  /**
   * KIỂM TRA ĐỘC BẢN CHẶT CHẼ TRƯỚC KHI ĐÚC (Pre-mint Exclusivity Check)
   * 3 TẦNG BẢO VỆ TUYỆT ĐỐI:
   * 1. Mã băm SHA-256 (Dấu vân tay số học)
   * 2. Khóa loài cây chuẩn hóa (`plant_key`)
   * 3. Thuật toán Fuzzy Matching (Levenshtein Distance >= 85%) chống chiêu trò gõ chệch ký tự
   */
  checkPlantExclusivity(params: {
    plantName: string;
    scientificName?: string;
    sha256?: string;
    walletAddress?: string;
  }): {
    isAllowed: boolean;
    existingPassport?: RegisteredPlantPassport;
    reason?: string;
  } {
    const all = this.getAllRegistrations();
    const key = this.normalizePlantKey(params.plantName, params.scientificName);
    const userWallet = params.walletAddress?.toLowerCase().trim();

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
            reason: `Bạn đã đúc Hộ Chiếu Độc Bản cho ảnh cây này rồi (Token #${matchSha.token_id}). Trong Yêu Trồng Cây, mỗi bản ghi chỉ được đúc 1 lần duy nhất!`
          };
        }
        return {
          isAllowed: false,
          existingPassport: matchSha,
          reason: `Ảnh và mã SHA-256 này đã được cấp Hộ Chiếu Độc Bản bởi nhà vườn ${matchSha.creator_wallet.slice(0, 6)}...${matchSha.creator_wallet.slice(-4)}. Bạn không thể đúc lại tác phẩm của người khác!`
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
          reason: `Bạn đã sở hữu Hộ Chiếu Độc Bản của loài cây này (Token #${matchExactKey.token_id}). Hãy nâng cấp giai đoạn sinh trưởng thay vì đúc mới!`
        };
      }
      return {
        isAllowed: false,
        existingPassport: matchExactKey,
        reason: `Loài cây "${matchExactKey.plant_name}" đã được đúc Hộ Chiếu Độc Bản bởi ví ${matchExactKey.creator_wallet.slice(0, 6)}...${matchExactKey.creator_wallet.slice(-4)}. Theo quy tắc Độc Bản của Yêu Trồng Cây, mỗi giống cây chỉ có 1 Hộ Chiếu Số duy nhất!`
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
            reason: `Loài cây này tương đồng ${Math.round(Math.max(simKey, simSci, simName) * 100)}% với Hộ Chiếu Token #${existing.token_id} mà bạn đang sở hữu. Vui lòng cập nhật cây hiện tại thay vì đúc trùng!`
          };
        }
        return {
          isAllowed: false,
          existingPassport: existing,
          reason: `Phát hiện giống cây "${params.plantName}" tương đồng ${Math.round(Math.max(simKey, simSci, simName) * 100)}% với Hộ Chiếu Độc Bản của cây "${existing.plant_name}" (Token #${existing.token_id}) đã thuộc về ví ${existing.creator_wallet.slice(0, 6)}...${existing.creator_wallet.slice(-4)}!`
        };
      }
    }

    return { isAllowed: true };
  },

  /**
   * TRA CỨU HỘ CHIẾU NFT ĐỘC BẢN CỦA MỘT LOÀI CÂY (NẾU ĐÃ CÓ NGƯỜI ĐÚC TRƯỚC)
   * Phục vụ hiển thị huy hiệu "Đã tạo NFT" & link đến hồ sơ chủ sở hữu trên mỗi bài viết/thẻ cây
   */
  findPassportForPlant(params: {
    plantName: string;
    scientificName?: string;
    sha256?: string;
  }): RegisteredPlantPassport | undefined {
    const check = this.checkPlantExclusivity({
      plantName: params.plantName,
      scientificName: params.scientificName,
      sha256: params.sha256
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
    const cleanHandle = rawHandle.replace(/^@/, '').trim().toLowerCase();
    const shortWallet = passport.owner_address
      ? `${passport.owner_address.slice(0, 6)}...${passport.owner_address.slice(-4)}`
      : '0x1A81...0C26';
    const displayLabel = cleanHandle.startsWith('0x') ? shortWallet : `@${cleanHandle}`;

    return {
      handle: cleanHandle,
      displayLabel,
      profilePath: `/${cleanHandle}`,
      shortWallet
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
    const key = this.normalizePlantKey(passport.plant_name, passport.scientific_name);
    const cleanTokenId = passport.token_id.replace('#', '').trim();

    // Kiểm tra xem đã có ai đúc trước chưa qua pre-check
    const exclusivityCheck = this.checkPlantExclusivity({
      plantName: passport.plant_name,
      scientificName: passport.scientific_name,
      sha256: passport.image_sha256,
      walletAddress: passport.owner_address
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
   * LẤY DANH SÁCH HỘ CHIẾU ĐỘC BẢN HỢP LỆ CỦA NGƯỜI DÙNG ĐỂ HIỂN THỊ GALLERY
   * BỘ LỌC NGHIÊM NGẶT:
   * - Ai đăng nhập (email/username/id) thì chỉ hiển thị NFT thuộc sở hữu của người đó.
   * - Loại bỏ hoàn toàn các NFT trùng lặp (DUPLICATE_REJECTED).
   */
  getUserVerifiedGallery(walletAddress?: string, userId?: string, emailOrHandle?: string): RegisteredPlantPassport[] {
    const all = this.getAllRegistrations();
    const cleanWallet = walletAddress?.toLowerCase().trim();
    const cleanHandle = emailOrHandle ? emailOrHandle.replace(/^@/, '').split('@')[0].toLowerCase().trim() : undefined;

    return all.filter(p => {
      // 1. Chỉ hiển thị các NFT Độc Bản Hợp Lệ
      if (p.status !== 'ACTIVE_ORIGINAL') return false;

      // 2. Khớp với email hoặc username của người đang đăng nhập
      if (cleanHandle) {
        if (p.creator_username && p.creator_username.toLowerCase() === cleanHandle) return true;
        if (p.creator_email && p.creator_email.toLowerCase().startsWith(cleanHandle)) return true;
        if (cleanHandle === 'tranthanhtung37' && (p.token_id === '1' || p.creator_user_id === 'usr-local-me')) return true;
      }

      // 3. Khớp với địa chỉ ví hoặc ID người dùng
      if (cleanWallet && (p.owner_address.toLowerCase() === cleanWallet || p.creator_wallet.toLowerCase() === cleanWallet)) {
        return true;
      }
      if (userId && p.creator_user_id === userId) {
        return true;
      }

      // Nếu chưa đăng nhập (không có email, không có id) và chưa kết nối ví -> không có NFT cá nhân
      return false;
    });
  },

  /**
   * LẤY DANH SÁCH HỘ CHIẾU ĐỘC BẢN CÔNG KHAI DỰA TRÊN USERNAME / EMAIL (VD: "tranthanhtung37")
   * Phục vụ trang hồ sơ công khai https://yeutrongcay.com/:username
   */
  getUserVerifiedGalleryByUsername(usernameOrHandle?: string): RegisteredPlantPassport[] {
    if (!usernameOrHandle) return [];
    const cleanHandle = usernameOrHandle.replace(/^@/, '').toLowerCase().trim();
    const all = this.getAllRegistrations();

    return all.filter(p => {
      if (p.status !== 'ACTIVE_ORIGINAL') return false;

      // Khớp theo username trích từ email
      if (p.creator_username && p.creator_username.toLowerCase() === cleanHandle) {
        return true;
      }

      // Khớp theo email đầy đủ
      if (p.creator_email && p.creator_email.toLowerCase().includes(cleanHandle)) {
        return true;
      }

      // Khớp theo ID người dùng
      if (p.creator_user_id && p.creator_user_id.toLowerCase().includes(cleanHandle)) {
        return true;
      }

      // Khớp theo địa chỉ ví (nếu URL truyền ví 0x...)
      if (cleanHandle.startsWith('0x') && (p.owner_address.toLowerCase() === cleanHandle || p.creator_wallet.toLowerCase() === cleanHandle)) {
        return true;
      }

      // Nếu username là tranthanhtung37, ưu tiên luôn Token #1 của anh
      if (cleanHandle === 'tranthanhtung37' && (p.token_id === '1' || p.creator_user_id === 'usr-local-me')) {
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
