/**
 * Yêu Trồng Cây - Ecosystem Single Source of Truth Registry
 * Trung tâm Cấu hình Đa Ngành Hàng & Hệ Thống Tài Sản Số NFT Độc Bản
 */

import { Plant, PlantCategory, NftAssetClass } from '../types/index.ts';

export interface EcosystemCategoryConfig {
  id: PlantCategory;
  placement: 'navbar_and_home' | 'home_only';
  dedicatedPath: string;
  defaultNftClass: NftAssetClass;
  icon: string;
  badgeColorClass: string;
  labelVi: string;
  labelEn: string;
  shortLabelVi?: string;
  shortLabelEn?: string;
  headingVi: string;
  headingEn: string;
  descriptionVi: string;
  descriptionEn: string;
  summaryVi?: string;
  summaryEn?: string;
  unitVi: string;
  unitEn: string;
  cardBadgeClass?: string;
  cardBorderHover?: string;
  cardTitleHover?: string;
}

export interface NftAssetClassConfig {
  id: NftAssetClass;
  name: string;
  nameVi: string;
  nameEn: string;
  shortName: string;
  certificateTitle: string;
  badgeColorClass: string;
  icon: string;
  mintButtonVi: string;
  mintButtonEn: string;
  // Nhãn ngữ cảnh thông minh (Contextual Action & Ownership Labels)
  mintButtonCompactVi: string;   // Nút hành động gọn (Header bài viết)
  mintButtonCompactEn: string;
  mintButtonBannerVi: string;    // Nút kêu gọi hành động lớn (Hero banner)
  mintButtonBannerEn: string;
  mintButtonActionVi: string;    // Nút hành động chi tiết (Sidebar / Modal)
  mintButtonActionEn: string;
  unclaimedDescVi: string;       // Mô tả khi tài sản chưa có người đúc
  unclaimedDescEn: string;
  claimedDescVi: string;         // Mô tả khi tài sản đã được bảo hộ
  claimedDescEn: string;
  ownerRoleLabelVi: string;      // Tên vai trò chủ sở hữu ("Chủ sở hữu thực vật", "Người giám hộ sinh quyển", "Tác giả phương pháp", ...)
  ownerRoleLabelEn: string;
  studioTitleVi: string;         // Tiêu đề phòng đúc / xưởng ký số trong Web3 Sandbox
  studioTitleEn: string;
  studioNameLabelVi: string;     // Nhãn ô nhập tên đối tượng
  studioNameLabelEn: string;
  studioDetailLabelVi: string;   // Nhãn ô nhập xuất xứ / thông số chi tiết
  studioDetailLabelEn: string;
  studioSuccessTitleVi: string;  // Tiêu đề thông báo đúc thành công
  studioSuccessTitleEn: string;
  onChainPrefix: string;
  supplyMode: 'exclusive_1_of_1' | 'per_lot_10000m2';
  stagesVi: [string, string, string];
  stagesEn: [string, string, string];
  evolutionStages: [string, string, string];
}

export const ECOSYSTEM_CATEGORIES: Record<PlantCategory, EcosystemCategoryConfig> = {
  herb: {
    id: 'herb',
    placement: 'navbar_and_home',
    dedicatedPath: '/thao-duoc',
    defaultNftClass: 'botanical',
    icon: '🌱',
    badgeColorClass: 'bg-emerald-900/85 text-emerald-100 border border-emerald-400/30',
    labelVi: 'Thảo Dược Bản Địa',
    labelEn: 'Native Medicinal Herbs',
    shortLabelVi: 'Thảo Dược',
    shortLabelEn: 'Native Herbs',
    headingVi: 'Tủ Thuốc Xanh (Thảo Dược Bản Địa)',
    headingEn: 'Green Pharmacy (Native Medicinal Herbs)',
    descriptionVi: 'Tra cứu các loài thảo dược bản địa Việt Nam: công dụng trị ho, giải cảm, bổ huyết, liều dùng an toàn và bài thuốc dân gian.',
    descriptionEn: 'Discover native Vietnamese medicinal herbs: safe dosages, folk remedies, and home cultivation.',
    summaryVi: 'Cây thuốc nam, rau gia vị chữa bệnh gia đình & bài thuốc dân gian',
    summaryEn: 'Folk remedies & fresh culinary herbs for household wellness',
    unitVi: 'loài thảo dược',
    unitEn: 'herbal species',
    cardBadgeClass: 'text-herbal-700 dark:text-herbal-300 bg-herbal-50 dark:bg-herbal-950/60 border border-herbal-200/50 dark:border-herbal-800/40',
    cardBorderHover: 'hover:border-herbal-400 dark:hover:border-herbal-500',
    cardTitleHover: 'group-hover:text-herbal-700 dark:group-hover:text-herbal-400',
  },
  fruit: {
    id: 'fruit',
    placement: 'navbar_and_home',
    dedicatedPath: '/cay-an-trai',
    defaultNftClass: 'botanical',
    icon: '🍋',
    badgeColorClass: 'bg-amber-800/85 text-amber-100 border border-amber-400/30',
    labelVi: 'Cây Ăn Quả Ban Công',
    labelEn: 'Balcony Fruit Trees',
    shortLabelVi: 'Cây Ăn Trái',
    shortLabelEn: 'Balcony Fruits',
    headingVi: 'Trái Ngọt Phố (Cây Ăn Quả Ban Công)',
    headingEn: 'Balcony Fruits (Urban Orchards)',
    descriptionVi: 'Cẩm nang trồng cây ăn trái lùn đô thị: ổi lê, cóc Thái, sung Mỹ, dâu tằm, chanh tứ quý trĩu quả quanh năm.',
    descriptionEn: 'Handbook for growing dwarf container fruit varieties: guava, ambarella, honey figs, and continuous limes.',
    summaryVi: 'Giống lùn sai quả, thu hoạch trên sân thượng & ban công đô thị',
    summaryEn: 'Dwarf container fruit varieties & urban rooftop harvesting',
    unitVi: 'giống cây',
    unitEn: 'fruit varieties',
    cardBadgeClass: 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/50 dark:border-amber-800/40',
    cardBorderHover: 'hover:border-amber-400 dark:hover:border-amber-500',
    cardTitleHover: 'group-hover:text-amber-800 dark:group-hover:text-amber-400',
  },
  ornamental: {
    id: 'ornamental',
    placement: 'navbar_and_home',
    dedicatedPath: '/cay-canh',
    defaultNftClass: 'botanical',
    icon: '🌸',
    badgeColorClass: 'bg-purple-900/85 text-purple-100 border border-purple-400/30',
    labelVi: 'Cây Cảnh & Bonsai',
    labelEn: 'Ornamentals & Bonsai',
    shortLabelVi: 'Cây Cảnh',
    shortLabelEn: 'Ornamentals',
    headingVi: 'Cây Cảnh & Thư Thái (Bonsai & Phong Thủy)',
    headingEn: 'Bonsai & Calming Living Spaces',
    descriptionVi: 'Các loài cây cảnh thanh lọc không khí NASA, nghệ thuật tạo tác bonsai phong thủy và cây cảnh nội thất.',
    descriptionEn: 'Air-purifying houseplants, fragrant bonsai creations, and prosperity greenery.',
    summaryVi: 'Cây lọc không khí, bonsai thư giãn, phong thủy & cây nội thất',
    summaryEn: 'Air-purifying houseplants, bonsai serenity, & feng shui greenery',
    unitVi: 'loài cây cảnh',
    unitEn: 'ornamental varieties',
    cardBadgeClass: 'text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200/50 dark:border-purple-800/40',
    cardBorderHover: 'hover:border-purple-400 dark:hover:border-purple-500',
    cardTitleHover: 'group-hover:text-purple-800 dark:group-hover:text-purple-400',
  },
  space: {
    id: 'space',
    placement: 'home_only',
    dedicatedPath: '/khong-gian-xanh',
    defaultNftClass: 'space_method',
    icon: '🏡',
    badgeColorClass: 'bg-cyan-900/85 text-cyan-100 border border-cyan-400/30',
    labelVi: 'Không Gian Trồng Phố',
    labelEn: 'Urban Growing Spaces',
    shortLabelVi: 'Không Gian Trồng',
    shortLabelEn: 'Urban Spaces',
    headingVi: 'Không Gian & Mô Hình Trồng Phố',
    headingEn: 'Urban Growing Spaces & Living Blueprints',
    descriptionVi: 'Bản vẽ kiến trúc vườn ban công hướng Tây, logia khuất nắng, giàn leo sân thượng siêu nhẹ và tiểu cảnh trong nhà.',
    descriptionEn: 'Architectural blueprints for heat-shield balconies, low-light loggias, lightweight rooftops, and indoor greens.',
    summaryVi: 'Bản vẽ kiến trúc ban công hướng Tây, logia khuất nắng & giàn leo',
    summaryEn: 'Architectural blueprints for heat-shield balconies & compact loggias',
    unitVi: 'thiết kế',
    unitEn: 'blueprints',
    cardBadgeClass: 'text-cyan-800 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200/50 dark:border-cyan-800/40',
    cardBorderHover: 'hover:border-cyan-400 dark:hover:border-cyan-500',
    cardTitleHover: 'group-hover:text-cyan-800 dark:group-hover:text-cyan-400',
  },
  recycle: {
    id: 'recycle',
    placement: 'home_only',
    dedicatedPath: '/sang-che-tai-che',
    defaultNftClass: 'eco_invention',
    icon: '♻️',
    badgeColorClass: 'bg-lime-900/85 text-lime-100 border border-lime-400/30',
    labelVi: 'Tái Chế Làm Vườn',
    labelEn: 'Upcycled Garden DIY',
    shortLabelVi: 'Tái Chế',
    shortLabelEn: 'Upcycled DIY',
    headingVi: 'Sáng Chế Tái Chế & Tuần Hoàn Xanh',
    headingEn: 'Upcycled Garden DIY & Circular Inventions',
    descriptionVi: 'Chế tạo chậu tự tưới bấc thấm từ can nhựa an toàn, thùng ủ Bokashi không mùi và thuốc trừ sâu sinh học tại gia.',
    descriptionEn: 'Self-watering capillary planters from safe HDPE jugs, zero-odor Bokashi composting, and organic pest shields.',
    summaryVi: 'Chế tạo chậu tự tưới bấc thấm từ can nhựa, ủ Bokashi & phân bón',
    summaryEn: 'Self-watering wicking planters, zero-odor Bokashi & organic shields',
    unitVi: 'sáng chế',
    unitEn: 'inventions',
    cardBadgeClass: 'text-lime-800 dark:text-lime-300 bg-lime-50 dark:bg-lime-950/60 border border-lime-200/50 dark:border-lime-800/40',
    cardBorderHover: 'hover:border-lime-400 dark:hover:border-lime-500',
    cardTitleHover: 'group-hover:text-lime-800 dark:group-hover:text-lime-400',
  },
  culinary: {
    id: 'culinary',
    placement: 'home_only',
    dedicatedPath: '/am-thuc-duoc-thien',
    defaultNftClass: 'culinary_recipe',
    icon: '🍵',
    badgeColorClass: 'bg-rose-900/85 text-rose-100 border border-rose-400/30',
    labelVi: 'Ẩm Thực Dưỡng Sinh',
    labelEn: 'Herbal Kitchen & Tonics',
    shortLabelVi: 'Ẩm Thực',
    shortLabelEn: 'Herbal Kitchen',
    headingVi: 'Ẩm Thực & Đồ Uống Thảo Mộc (Dược Thiện)',
    headingEn: 'Herbal Kitchen, Tonics & Natural Elixirs',
    descriptionVi: 'Siro trị ho chưng cách thủy, trà hoa đổi màu, nước sâm mát gan và món ăn bài thuốc từ thảo mộc thu hái tại vườn.',
    descriptionEn: 'Steamed herbal cough elixirs, antioxidant floral infusions, detox tonics, and medicinal kitchen recipes.',
    summaryVi: 'Siro chưng cách thủy, trà hoa thảo mộc, nước sâm & món ăn bài thuốc',
    summaryEn: 'Steamed herbal cough elixirs, antioxidant teas & medicinal dishes',
    unitVi: 'bí phương',
    unitEn: 'recipes',
    cardBadgeClass: 'text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200/50 dark:border-rose-800/40',
    cardBorderHover: 'hover:border-rose-400 dark:hover:border-rose-500',
    cardTitleHover: 'group-hover:text-rose-800 dark:group-hover:text-rose-400',
  },
  forest: {
    id: 'forest',
    placement: 'home_only',
    dedicatedPath: '/vuon-quoc-gia',
    defaultNftClass: 'geo_forest_10000m2',
    icon: '🌲',
    badgeColorClass: 'bg-teal-900/85 text-teal-100 border border-teal-400/30',
    labelVi: 'Rừng & Khu Sinh Thái',
    labelEn: 'Natural Forests & Parks',
    shortLabelVi: 'Rừng Sinh Thái',
    shortLabelEn: 'Natural Forests',
    headingVi: 'Rừng Tự Nhiên & Khu Sinh Thái',
    headingEn: 'Natural Forests, National Parks & Biospheres',
    descriptionVi: 'Bảo tồn hệ sinh thái 15 Vườn Quốc Gia & Khu Dự Trữ Sinh Quyển Việt Nam. Đúc chứng chỉ 10.000m² rừng khi có mặt tại khu vực.',
    descriptionEn: 'Conserving Vietnam\'s 15 National Parks and UNESCO Biospheres. Mint 10,000m² conservation NFTs when physically present in the forest zone.',
    summaryVi: 'Bảo tồn 15 Vườn Quốc Gia & Khu Sinh Quyển. Đúc chứng chỉ 10.000m² rừng',
    summaryEn: 'Preserving 15 National Parks & UNESCO Biospheres with 10,000m² NFTs',
    unitVi: 'khu bảo tồn',
    unitEn: 'reserves',
    cardBadgeClass: 'text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-200/50 dark:border-teal-800/40',
    cardBorderHover: 'hover:border-teal-400 dark:hover:border-teal-500',
    cardTitleHover: 'group-hover:text-teal-800 dark:group-hover:text-teal-400',
  },
};

export const NFT_ASSET_CLASSES: Record<NftAssetClass, NftAssetClassConfig> = {
  botanical: {
    id: 'botanical',
    name: 'Hộ Chiếu Thực Vật Số',
    nameVi: 'Hộ Chiếu Thực Vật Số',
    nameEn: 'Botanical NFT Passport',
    shortName: 'Thực Vật',
    certificateTitle: 'Hộ Chiếu Cây Trồng Số',
    badgeColorClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    icon: '🌱',
    mintButtonVi: 'Cấp Hộ Chiếu Cây Này (Chưa có chủ)',
    mintButtonEn: 'Mint Plant Passport (Unclaimed)',
    mintButtonCompactVi: 'Cấp Hộ Chiếu Cây Này',
    mintButtonCompactEn: 'Mint Plant Passport',
    mintButtonBannerVi: 'Cấp Hộ Chiếu Thực Vật Cho Giống Cây Này',
    mintButtonBannerEn: 'Mint Botanical Passport For This Plant',
    mintButtonActionVi: 'Đúc Hộ Chiếu & Nhận Quyền Sở Hữu',
    mintButtonActionEn: 'Mint Passport & Claim Ownership',
    unclaimedDescVi: 'Giống cây này hiện chưa có người cấp Hộ Chiếu Số. Hãy là người đầu tiên đúc hộ chiếu để bảo hộ nguồn gen bản địa và gắn huy hiệu lên bài viết!',
    unclaimedDescEn: 'No one has minted the exclusive NFT passport for this plant species yet. Mint it first to certify native genetics & display your ownership badge!',
    claimedDescVi: 'Loài thực vật bản địa này đã được đúc Hộ Chiếu Cây Trồng Số độc bản trên blockchain',
    claimedDescEn: 'This plant species has been verified with an exclusive Botanical NFT Passport on the blockchain',
    ownerRoleLabelVi: 'Chủ sở hữu thực vật',
    ownerRoleLabelEn: 'Botanical Owner',
    studioTitleVi: 'Xưởng Ký Số & Cấp Hộ Chiếu Thực Vật Bản Địa (Ví Thật)',
    studioTitleEn: 'Botanical Passport Studio (Dynamic NFT)',
    studioNameLabelVi: '1. Tên chậu cây của bạn:',
    studioNameLabelEn: '1. Your Plant Name:',
    studioDetailLabelVi: 'Giống cây / Xuất xứ (Tùy chọn):',
    studioDetailLabelEn: 'Variety / Provenance (Optional):',
    studioSuccessTitleVi: 'Hộ Chiếu Cây Trồng Số Đã Cấp Thành Công!',
    studioSuccessTitleEn: 'Digital Plant Passport Successfully Minted!',
    onChainPrefix: '',
    supplyMode: 'exclusive_1_of_1',
    stagesVi: ['1/3 - Mầm Non', '2/3 - Sinh Trưởng Thân Lá', '3/3 - Ra Hoa Kết Trái'],
    stagesEn: ['1/3 - Seedling', '2/3 - Vegetative Growth', '3/3 - Flowering & Fruiting'],
    evolutionStages: ['1/3 - Mầm Non', '2/3 - Sinh Trưởng Thân Lá', '3/3 - Ra Hoa Kết Trái'],
  },
  space_method: {
    id: 'space_method',
    name: 'Bản Quyền Kiến Trúc & Phương Pháp Canh Tác',
    nameVi: 'Bản Quyền Kiến Trúc & Phương Pháp Canh Tác',
    nameEn: 'Green Architecture & Method Blueprint',
    shortName: 'Phương Pháp',
    certificateTitle: 'Bản Quyền Phương Pháp & Kiến Trúc Xanh',
    badgeColorClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    icon: '📐',
    mintButtonVi: 'Bảo Hộ Phương Pháp Này (Chưa có chủ)',
    mintButtonEn: 'Protect This Method (Unclaimed)',
    mintButtonCompactVi: 'Bảo Hộ Phương Pháp Này',
    mintButtonCompactEn: 'Protect This Method',
    mintButtonBannerVi: 'Đăng Ký Bản Quyền Phương Pháp / Thiết Kế Này',
    mintButtonBannerEn: 'Mint Method / Blueprint Copyright',
    mintButtonActionVi: 'Đúc NFT Bản Quyền & Xác Nhận Tác Quyền',
    mintButtonActionEn: 'Mint Method NFT & Claim Authorship',
    unclaimedDescVi: 'Phương pháp / bản vẽ thiết kế này hiện chưa có người đăng ký tác quyền số. Hãy đúc NFT để trở thành tác giả tiên phong được chứng nhận!',
    unclaimedDescEn: 'This spatial blueprint & growing method has not been copyrighted on-chain yet. Mint it first to claim original authorship!',
    claimedDescVi: 'Phương pháp / bản vẽ kiến trúc này đã được xác thực tác quyền số độc bản trên blockchain',
    claimedDescEn: 'This green architectural method has been registered with an exclusive on-chain copyright',
    ownerRoleLabelVi: 'Tác giả phương pháp',
    ownerRoleLabelEn: 'Method Architect',
    studioTitleVi: 'Xưởng Xác Thực Bản Quyền Kiến Trúc & Phương Pháp Canh Tác',
    studioTitleEn: 'Green Method & Architecture Studio (NFT Proof)',
    studioNameLabelVi: '1. Tên thiết kế / Phương pháp canh tác:',
    studioNameLabelEn: '1. Blueprint / Method Title:',
    studioDetailLabelVi: 'Mô hình ứng dụng / Thông số kỹ thuật (Tùy chọn):',
    studioDetailLabelEn: 'Target System / Technical Specs (Optional):',
    studioSuccessTitleVi: 'Bản Quyền Phương Pháp Đã Được Xác Thực Thành Công!',
    studioSuccessTitleEn: 'Method Blueprint NFT Successfully Minted!',
    onChainPrefix: 'Method:',
    supplyMode: 'exclusive_1_of_1',
    stagesVi: ['1/3 - Bản Vẽ Thiết Kế', '2/3 - Thi Công Thực Địa', '3/3 - Hệ Sinh Thái Hoàn Chỉnh'],
    stagesEn: ['1/3 - Blueprint Draft', '2/3 - Field Implementation', '3/3 - Fully Operating Space'],
    evolutionStages: ['1/3 - Bản Vẽ Thiết Kế', '2/3 - Thi Công Thực Địa', '3/3 - Hệ Sinh Thái Hoàn Chỉnh'],
  },
  eco_invention: {
    id: 'eco_invention',
    name: 'Bằng Sáng Chế Sinh Thái Tuần Hoàn',
    nameVi: 'Bằng Sáng Chế Sinh Thái Tuần Hoàn',
    nameEn: 'Circular Eco-Patent',
    shortName: 'Sáng Chế',
    certificateTitle: 'Bằng Sáng Chế Sinh Thái Tuần Hoàn',
    badgeColorClass: 'bg-lime-500/20 text-lime-300 border-lime-400/40',
    icon: '♻️',
    mintButtonVi: 'Bảo Hộ Sáng Chế Này (Chưa có chủ)',
    mintButtonEn: 'Patent This Invention (Unclaimed)',
    mintButtonCompactVi: 'Bảo Hộ Sáng Chế Này',
    mintButtonCompactEn: 'Patent This Invention',
    mintButtonBannerVi: 'Đúc Bằng Sáng Chế Sinh Thái Tuần Hoàn Ngay',
    mintButtonBannerEn: 'Mint Circular Eco-Patent For This Invention',
    mintButtonActionVi: 'Đăng Ký Bằng Sáng Chế & Nhận Quyền Độc Bản',
    mintButtonActionEn: 'Register Eco-Patent & Claim Ownership',
    unclaimedDescVi: 'Giải pháp sáng chế tuần hoàn này chưa được đăng ký bằng chứng số. Hãy đúc NFT để bảo hộ ý tưởng sáng tạo và ghi danh nhà sáng chế!',
    unclaimedDescEn: 'This circular eco-invention has not been registered on-chain yet. Mint it first to protect the idea & display inventor credentials!',
    claimedDescVi: 'Sáng chế sinh thái này đã được đăng ký Bằng Sáng Chế Số độc bản trên blockchain',
    claimedDescEn: 'This circular eco-invention has been patented as an exclusive NFT on the blockchain',
    ownerRoleLabelVi: 'Nhà sáng chế sinh thái',
    ownerRoleLabelEn: 'Eco-Inventor',
    studioTitleVi: 'Xưởng Đăng Ký Bằng Sáng Chế Sinh Thái Tuần Hoàn',
    studioTitleEn: 'Circular Eco-Patent Studio (NFT Proof)',
    studioNameLabelVi: '1. Tên sáng chế / Chế phẩm tuần hoàn:',
    studioNameLabelEn: '1. Invention / Eco-Solution Name:',
    studioDetailLabelVi: 'Nguyên lý vận hành / Vật liệu tái chế (Tùy chọn):',
    studioDetailLabelEn: 'Operating Principle / Recycled Materials (Optional):',
    studioSuccessTitleVi: 'Bằng Sáng Chế Tuần Hoàn Đã Được Đăng Ký Thành Công!',
    studioSuccessTitleEn: 'Circular Eco-Patent Successfully Registered!',
    onChainPrefix: 'Patent:',
    supplyMode: 'exclusive_1_of_1',
    stagesVi: ['1/3 - Nguyên Mẫu DIY', '2/3 - Vận Hành Ổn Định', '3/3 - Chuẩn Hóa Nhân Rộng'],
    stagesEn: ['1/3 - DIY Prototype', '2/3 - Stable Operation', '3/3 - Scaled Standard'],
    evolutionStages: ['1/3 - Nguyên Mẫu DIY', '2/3 - Vận Hành Ổn Định', '3/3 - Chuẩn Hóa Nhân Rộng'],
  },
  culinary_recipe: {
    id: 'culinary_recipe',
    name: 'Chứng Nhận Bản Quyền Bí Phương Dưỡng Sinh',
    nameVi: 'Chứng Nhận Bản Quyền Bí Phương Dưỡng Sinh',
    nameEn: 'Healing Culinary Recipe & Formula',
    shortName: 'Bí Phương',
    certificateTitle: 'Chứng Nhận Bản Quyền Bí Phương Dưỡng Sinh',
    badgeColorClass: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    icon: '🍵',
    mintButtonVi: 'Bảo Hộ Công Thức Này (Chưa có chủ)',
    mintButtonEn: 'Certify This Formula (Unclaimed)',
    mintButtonCompactVi: 'Bảo Hộ Công Thức Này',
    mintButtonCompactEn: 'Certify This Formula',
    mintButtonBannerVi: 'Xác Thực Bản Quyền Công Thức / Bí Phương Ngay',
    mintButtonBannerEn: 'Mint Recipe & Herbal Formula Copyright',
    mintButtonActionVi: 'Xác Thực Bản Quyền & Nắm Giữ Bí Phương',
    mintButtonActionEn: 'Mint Formula NFT & Claim Recipe',
    unclaimedDescVi: 'Công thức bài thuốc / món ăn dưỡng sinh này chưa được chứng nhận bản quyền số. Hãy đúc NFT để trở thành người bảo chứng độc bản!',
    unclaimedDescEn: 'This healing culinary formula has not been copyrighted on-chain yet. Mint it first to certify the master recipe & claim ownership!',
    claimedDescVi: 'Bí phương dưỡng sinh này đã được xác thực chứng nhận số độc bản trên blockchain',
    claimedDescEn: 'This healing recipe has been certified with an exclusive on-chain copyright',
    ownerRoleLabelVi: 'Người nắm giữ bí phương',
    ownerRoleLabelEn: 'Master Herbalist',
    studioTitleVi: 'Xưởng Ký Số & Chứng Nhận Bản Quyền Bí Phương Dược Thiện',
    studioTitleEn: 'Healing Culinary & Herbal Formula Studio (NFT Proof)',
    studioNameLabelVi: '1. Tên công thức / Bài thuốc dưỡng sinh:',
    studioNameLabelEn: '1. Recipe / Formula Title:',
    studioDetailLabelVi: 'Thành phần dược liệu / Nguồn gốc bài thuốc (Tùy chọn):',
    studioDetailLabelEn: 'Herbal Ingredients / Origin (Optional):',
    studioSuccessTitleVi: 'Bản Quyền Bí Phương Đã Được Xác Thực Thành Công!',
    studioSuccessTitleEn: 'Healing Formula NFT Successfully Certified!',
    onChainPrefix: 'Formula:',
    supplyMode: 'exclusive_1_of_1',
    stagesVi: ['1/3 - Sơ Chế Nguyên Liệu', '2/3 - Chiết Xuất / Ủ Men', '3/3 - Thượng Phẩm Dưỡng Sinh'],
    stagesEn: ['1/3 - Raw Preparation', '2/3 - Infusion / Fermentation', '3/3 - Master Remedy'],
    evolutionStages: ['1/3 - Sơ Chế Nguyên Liệu', '2/3 - Chiết Xuất / Ủ Men', '3/3 - Thượng Phẩm Dưỡng Sinh'],
  },
  geo_forest_10000m2: {
    id: 'geo_forest_10000m2',
    name: 'Chứng Chỉ Bảo Tồn 10.000m² Rừng Tự Nhiên',
    nameVi: 'Chứng Chỉ Bảo Tồn 10.000m² Rừng Tự Nhiên',
    nameEn: '10,000m² Natural Forest Conservation Certificate',
    shortName: 'Lô Rừng',
    certificateTitle: 'Chứng Chỉ Bảo Tồn 10.000m² Rừng',
    badgeColorClass: 'bg-teal-500/20 text-teal-300 border-teal-400/40',
    icon: '🌲',
    mintButtonVi: 'Bảo Trợ Lô Rừng Này (Tại Khu Vực)',
    mintButtonEn: 'Conserve Forest Plot (On-site)',
    mintButtonCompactVi: 'Bảo Trợ Lô Rừng Này',
    mintButtonCompactEn: 'Conserve Forest Plot',
    mintButtonBannerVi: 'Đo Đạc & Cấp Chứng Chỉ 10.000m² Rừng Tự Nhiên',
    mintButtonBannerEn: 'Survey & Mint 10,000m² Forest Plot Certificate',
    mintButtonActionVi: 'Đo Đạc & Cấp Chứng Chỉ Bảo Tồn Lô Rừng',
    mintButtonActionEn: 'Survey & Claim Forest Lot NFT',
    unclaimedDescVi: 'Khu rừng tự nhiên này đang mở quyền giám hộ sinh thái. Hãy đo đạc toạ độ GPS thực địa để nhận Chứng Chỉ Bảo Tồn 10.000m² Rừng!',
    unclaimedDescEn: 'This natural forest is open for ecological custody. Verify on-site GPS coordinates to mint a 10,000m² Conservation Certificate!',
    claimedDescVi: 'Khu rừng tự nhiên này đã được cấp Chứng Chỉ Bảo Tồn 10.000m² Rừng và số hoá trên sổ cái dMRV',
    claimedDescEn: 'This forest plot has been conserved with an on-chain 10,000m² dMRV certificate',
    ownerRoleLabelVi: 'Người giám hộ sinh quyển',
    ownerRoleLabelEn: 'Forest Steward',
    studioTitleVi: 'Xưởng Số Hóa & Cấp Chứng Chỉ 10.000m² Rừng Tự Nhiên (dMRV)',
    studioTitleEn: '10,000m² Natural Forest dMRV Studio',
    studioNameLabelVi: '1. Tên phân khu / Lô rừng bảo tồn:',
    studioNameLabelEn: '1. Forest Sector / Plot Name:',
    studioDetailLabelVi: 'Toạ độ GPS / Vị trí phân khu sinh thái:',
    studioDetailLabelEn: 'GPS Coordinates / Ecological Zone:',
    studioSuccessTitleVi: 'Chứng Chỉ 10.000m² Rừng Tự Nhiên Đã Cấp Thành Công!',
    studioSuccessTitleEn: '10,000m² Forest Plot Certificate Successfully Minted!',
    onChainPrefix: 'GeoForest 10000m²:',
    supplyMode: 'per_lot_10000m2',
    stagesVi: ['1/3 - Đặt Chân Khu Vực Rừng', '2/3 - Giám Hộ Sinh Quyển', '3/3 - Di Sản Rừng Vĩnh Cửu'],
    stagesEn: ['1/3 - Forest Zone Verified', '2/3 - Biosphere Steward', '3/3 - Eternal Heritage'],
    evolutionStages: ['1/3 - Đặt Chân Khu Vực Rừng', '2/3 - Giám Hộ Sinh Quyển', '3/3 - Di Sản Rừng Vĩnh Cửu'],
  },
};

export const NFT_ASSET_CLASSES_LIST: NftAssetClassConfig[] = Object.values(NFT_ASSET_CLASSES);

export function getCategoryConfig(category: string | PlantCategory): EcosystemCategoryConfig {
  if (category && (category in ECOSYSTEM_CATEGORIES)) {
    return ECOSYSTEM_CATEGORIES[category as PlantCategory];
  }
  // Dynamic fallback cho bất kỳ category mới nào được thêm vào hệ thống
  const safeCat = String(category || 'other');
  const formattedName = safeCat
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    id: safeCat as PlantCategory,
    placement: 'home_only',
    dedicatedPath: `/danh-muc/${encodeURIComponent(safeCat)}`,
    defaultNftClass: 'botanical',
    icon: '🌿',
    badgeColorClass: 'bg-emerald-900/85 text-emerald-100 border border-emerald-400/30',
    labelVi: formattedName,
    labelEn: formattedName,
    shortLabelVi: formattedName,
    shortLabelEn: formattedName,
    headingVi: `Chuyên mục: ${formattedName}`,
    headingEn: `Category: ${formattedName}`,
    descriptionVi: `Khám phá các ấn phẩm, cây trồng và giải pháp thuộc chuyên mục ${formattedName}.`,
    descriptionEn: `Explore publications, botanical knowledge, and solutions for ${formattedName}.`,
    summaryVi: `Tri thức và giải pháp thuộc chuyên mục ${formattedName}`,
    summaryEn: `Knowledge and solutions for ${formattedName}`,
    unitVi: 'ấn phẩm',
    unitEn: 'items',
    cardBadgeClass: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/50 dark:border-emerald-800/40',
    cardBorderHover: 'hover:border-emerald-400 dark:hover:border-emerald-500',
    cardTitleHover: 'group-hover:text-emerald-700 dark:group-hover:text-emerald-400',
  };
}

/**
 * Lấy danh sách toàn bộ chuyên mục hệ sinh thái (Cơ chế động)
 * - Tự động nạp toàn bộ categories đã đăng ký
 * - Quét thêm từ dữ liệu thực vật/ấn phẩm nếu có chuyên mục mới phát sinh
 */
export function getAllEcosystemCategories(plants?: Plant[]): EcosystemCategoryConfig[] {
  const registered = Object.values(ECOSYSTEM_CATEGORIES);

  if (plants && plants.length > 0) {
    const knownIds = new Set(registered.map((c) => c.id as string));
    const extraCategoryIds = Array.from(
      new Set(plants.map((p) => p.category).filter(Boolean))
    ).filter((cat) => !knownIds.has(cat as string));

    for (const extraId of extraCategoryIds) {
      registered.push(getCategoryConfig(extraId));
    }
  }

  return registered;
}

/**
 * Đăng ký chuyên mục mới vào hệ thống tại runtime
 */
export function registerEcosystemCategory(config: EcosystemCategoryConfig): void {
  ECOSYSTEM_CATEGORIES[config.id] = config;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ytc_ecosystem_categories_updated', { detail: config }));
  }
}

export function getNftClassConfig(nftClass: NftAssetClass): NftAssetClassConfig {
  return NFT_ASSET_CLASSES[nftClass] || NFT_ASSET_CLASSES.botanical;
}

export function resolvePlantNftClass(plant: Plant): NftAssetClass {
  if (plant.nft_class) {
    return plant.nft_class;
  }
  const catConfig = getCategoryConfig(plant.category);
  return catConfig.defaultNftClass;
}

export function inferNftClassFromPassport(passport: {
  scientific_name?: string;
  plant_name?: string;
  nft_class?: string;
}): NftAssetClass {
  if (passport.nft_class && passport.nft_class in NFT_ASSET_CLASSES) {
    return passport.nft_class as NftAssetClass;
  }
  const sci = (passport.scientific_name || '').trim();
  if (sci.startsWith('GeoForest 10000m²:')) return 'geo_forest_10000m2';
  if (sci.startsWith('Method:')) return 'space_method';
  if (sci.startsWith('Patent:')) return 'eco_invention';
  if (sci.startsWith('Formula:')) return 'culinary_recipe';
  return 'botanical';
}

export function isBotanicalSpecies(category: PlantCategory): boolean {
  return category === 'herb' || category === 'fruit' || category === 'ornamental';
}

/**
 * Thuật toán Haversine tính khoảng cách đường chim bay (km) giữa 2 tọa độ GPS
 */
export function calculateHaversineDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Bán kính Trái Đất (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 100) / 100;
}

/**
 * Vé Check-in GPS Thực Địa Lưu Tạm 24 Giờ (Chống mất sóng 4G ở rừng sâu)
 */
export interface ForestGpsCheckinPass {
  forestSlug: string;
  userLat: number;
  userLng: number;
  distanceKm: number;
  timestamp: number;
  expiresAt: number; // 24 giờ sau khi check-in thành công
}

export function saveForestGpsCheckinPass(
  slug: string,
  userLat: number,
  userLng: number,
  distanceKm: number
): ForestGpsCheckinPass {
  const now = Date.now();
  const pass: ForestGpsCheckinPass = {
    forestSlug: slug,
    userLat,
    userLng,
    distanceKm,
    timestamp: now,
    expiresAt: now + 24 * 60 * 60 * 1000,
  };
  try {
    localStorage.setItem(`ytc_forest_gps_pass_${slug}`, JSON.stringify(pass));
  } catch (err) {
    console.warn('Cannot save GPS pass to localStorage:', err);
  }
  return pass;
}

export function getValidForestGpsCheckinPass(slug: string): ForestGpsCheckinPass | null {
  try {
    const raw = localStorage.getItem(`ytc_forest_gps_pass_${slug}`);
    if (!raw) return null;
    const pass = JSON.parse(raw) as ForestGpsCheckinPass;
    if (pass.expiresAt && pass.expiresAt > Date.now()) {
      return pass;
    }
    localStorage.removeItem(`ytc_forest_gps_pass_${slug}`);
  } catch {
    // Ignore
  }
  return null;
}

/**
 * Thuật toán Trộn Xen Kẽ Vòng Tròn (Smart Marketplace Interleaving)
 * Khi ở chế độ 'all' và không tìm kiếm, trộn đều các ngành hàng để ngay trong
 * 9-12 sản phẩm đầu tiên khách thấy phong phú đa ngành.
 */
export function interleaveMarketplaceItems(items: Plant[]): Plant[] {
  const order: PlantCategory[] = ['herb', 'space', 'fruit', 'recycle', 'ornamental', 'culinary', 'forest'];
  const buckets: Record<PlantCategory, Plant[]> = {
    herb: [],
    fruit: [],
    ornamental: [],
    space: [],
    recycle: [],
    culinary: [],
    forest: [],
  };

  for (const item of items) {
    if (buckets[item.category]) {
      buckets[item.category].push(item);
    } else {
      buckets.herb.push(item);
    }
  }

  const result: Plant[] = [];
  let added = true;
  let idx = 0;

  while (added) {
    added = false;
    for (const cat of order) {
      if (idx < buckets[cat].length) {
        result.push(buckets[cat][idx]);
        added = true;
      }
    }
    idx++;
  }

  return result;
}
