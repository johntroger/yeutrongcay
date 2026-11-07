// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AgriDeFiVault - Hợp Đồng Thông Minh Nông Nghiệp Tái Tạo & Kho Gửi Hạt Giống (100% Testnet)
 * @author Yêu Trồng Cây (yeutrongcay.com)
 * @notice Nền tảng Giáo dục Tài chính Phi Tập Trung (DeFi) & Tài chính Tái tạo (ReFi) trên các mạng Testnet
 * @dev Hỗ trợ đa chuỗi Testnet: Ethereum Sepolia, Base Sepolia, BNB Testnet, Polygon Amoy, Arbitrum Sepolia
 *      Mục đích hoàn toàn giáo dục - 0đ tiền thật - Tuyệt đối không sử dụng trên Mainnet
 */

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract AgriDeFiVault {
    string public constant NAME = "Yeu Trong Cay Agri-DeFi Sandbox";
    string public constant SYMBOL = "YTC-AGRI";
    uint256 public constant APY_BASIS_POINTS = 1250; // 12.50% APY
    uint256 public constant SECONDS_PER_YEAR = 31536000;

    address public owner;

    // Cấu trúc vị thế Staking của người làm vườn
    struct StakePosition {
        uint256 stakedSeeds;        // Số hạt giống đang stake
        uint256 lastStakeTimestamp; // Thời điểm tương tác gần nhất
        uint256 unclaimedYield;     // Lợi suất phân bón vi sinh tích lũy chưa thu hoạch
    }

    // Mapping: Địa chỉ người làm vườn => Vị thế Staking
    mapping(address => StakePosition) public stakes;

    // Cấu trúc Đề xuất Quản trị DAO
    struct Proposal {
        uint256 id;
        string title;
        string description;
        uint256 yesVotes;
        uint256 noVotes;
        uint256 deadline;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    uint256 public proposalCount;

    // Cấu trúc Tín chỉ Carbon Rừng Tự Nhiên (ReFi Carbon Offset)
    struct CarbonRecord {
        string forestLotId;
        uint256 hectares;
        uint256 co2TonsRetired;
        uint256 timestamp;
    }

    mapping(address => CarbonRecord[]) public userCarbonOffsets;
    uint256 public totalCarbonTonsRetired;

    // Sự kiện On-chain (Dùng để Block Explorer và frontend đọc dữ liệu)
    event SeedsStaked(address indexed gardener, uint256 amount, uint256 timestamp);
    event SeedsUnstaked(address indexed gardener, uint256 amount, uint256 timestamp);
    event BioFertilizerClaimed(address indexed gardener, uint256 yieldAmount, uint256 timestamp);
    event CarbonOffsetRetired(address indexed gardener, string forestLotId, uint256 hectares, uint256 co2Tons, uint256 timestamp);
    event VoteCast(address indexed voter, uint256 indexed proposalId, uint8 support, uint256 timestamp);
    event ProposalCreated(uint256 indexed proposalId, string title, uint256 deadline);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }

    constructor() {
        owner = msg.sender;

        // Khởi tạo đề xuất DAO giáo dục đầu tiên
        proposalCount = 1;
        proposals[1] = Proposal({
            id: 1,
            title: unicode"Cấp vốn Testnet bảo tồn 500 cây Sâm Đại Hành bản địa tại Tây Nguyên",
            description: unicode"Trích 5.000 Token Hạt Giống từ quỹ Kho bạc DAO nhân giống cây sạch bệnh chia sẻ cư dân",
            yesVotes: 128,
            noVotes: 6,
            deadline: block.timestamp + 30 days,
            executed: false
        });
        emit ProposalCreated(1, proposals[1].title, proposals[1].deadline);
    }

    // ==========================================
    // 1. SEED STAKING VAULT (KHO GỬI HẠT GIỐNG)
    // ==========================================

    /**
     * @notice Gửi hạt giống vào bể thanh khoản nông nghiệp để sinh lời phân bón sinh học
     * @param amount Số lượng hạt giống (tính theo đơn vị nguyên)
     */
    function stakeSeeds(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");

        StakePosition storage pos = stakes[msg.sender];
        if (pos.stakedSeeds > 0) {
            pos.unclaimedYield += calculatePendingYield(msg.sender);
        }

        pos.stakedSeeds += amount;
        pos.lastStakeTimestamp = block.timestamp;

        emit SeedsStaked(msg.sender, amount, block.timestamp);
    }

    /**
     * @notice Rút hạt giống khỏi bể staking
     * @param amount Số lượng hạt giống muốn rút
     */
    function unstakeSeeds(uint256 amount) external {
        StakePosition storage pos = stakes[msg.sender];
        require(pos.stakedSeeds >= amount, "Insufficient staked balance");

        pos.unclaimedYield += calculatePendingYield(msg.sender);
        pos.stakedSeeds -= amount;
        pos.lastStakeTimestamp = block.timestamp;

        emit SeedsUnstaked(msg.sender, amount, block.timestamp);
    }

    /**
     * @notice Thu hoạch lợi suất phân bón vi sinh tích lũy từ hợp đồng
     */
    function claimBioFertilizer() external returns (uint256) {
        StakePosition storage pos = stakes[msg.sender];
        uint256 totalYield = pos.unclaimedYield + calculatePendingYield(msg.sender);
        require(totalYield > 0, "No yield available to claim");

        pos.unclaimedYield = 0;
        pos.lastStakeTimestamp = block.timestamp;

        emit BioFertilizerClaimed(msg.sender, totalYield, block.timestamp);
        return totalYield;
    }

    /**
     * @notice Tính toán lợi suất phân bón đang chờ thu hoạch theo công thức APY 12.5%
     */
    function calculatePendingYield(address gardener) public view returns (uint256) {
        StakePosition memory pos = stakes[gardener];
        if (pos.stakedSeeds == 0 || pos.lastStakeTimestamp == 0) return 0;

        uint256 duration = block.timestamp - pos.lastStakeTimestamp;
        // Yield = staked * (duration / SECONDS_PER_YEAR) * (1250 / 10000)
        return (pos.stakedSeeds * duration * APY_BASIS_POINTS) / (SECONDS_PER_YEAR * 10000);
    }

    function getStakeInfo(address gardener) external view returns (uint256 staked, uint256 pendingYield, uint256 lastTimestamp) {
        StakePosition memory pos = stakes[gardener];
        return (pos.stakedSeeds, pos.unclaimedYield + calculatePendingYield(gardener), pos.lastStakeTimestamp);
    }

    // ====================================================
    // 2. REFI CARBON OFFSET (TÍN CHỈ CARBON RỪNG TỰ NHIÊN)
    // ====================================================

    /**
     * @notice Bù trừ khí thải CO2 on-chain thông qua bảo tồn rừng Cúc Phương / U Minh Hạ
     * @param forestLotId Mã định danh lô rừng (vd: "CUC-PHUONG-LOT-01")
     * @param hectares Diện tích hecta bảo tồn (1 ha = 15 tấn CO2/năm)
     */
    function offsetCarbonWithForest(string memory forestLotId, uint256 hectares) external {
        require(hectares > 0, "Hectares must be positive");
        uint256 co2Tons = hectares * 15;

        userCarbonOffsets[msg.sender].push(CarbonRecord({
            forestLotId: forestLotId,
            hectares: hectares,
            co2TonsRetired: co2Tons,
            timestamp: block.timestamp
        }));

        totalCarbonTonsRetired += co2Tons;

        emit CarbonOffsetRetired(msg.sender, forestLotId, hectares, co2Tons, block.timestamp);
    }

    function getUserCarbonRecordCount(address user) external view returns (uint256) {
        return userCarbonOffsets[user].length;
    }

    // =============================================
    // 3. DAO GOVERNANCE VOTING (BIỂU QUYẾT ON-CHAIN)
    // =============================================

    /**
     * @notice Bỏ phiếu on-chain cho đề xuất bảo tồn nguồn gen
     * @param proposalId ID của đề xuất
     * @param support 1 = Đồng ý (Yes), 0 = Bác bỏ (No)
     */
    function castVote(uint256 proposalId, uint8 support) external {
        require(proposalId > 0 && proposalId <= proposalCount, "Proposal does not exist");
        Proposal storage prop = proposals[proposalId];
        require(block.timestamp <= prop.deadline, "Voting period has ended");
        require(!hasVoted[proposalId][msg.sender], "Address already voted on this proposal");

        hasVoted[proposalId][msg.sender] = true;

        if (support == 1) {
            prop.yesVotes += 1;
        } else {
            prop.noVotes += 1;
        }

        emit VoteCast(msg.sender, proposalId, support, block.timestamp);
    }

    function getProposal(uint256 proposalId) external view returns (
        uint256 id,
        string memory title,
        string memory description,
        uint256 yesVotes,
        uint256 noVotes,
        uint256 deadline,
        bool executed
    ) {
        require(proposalId > 0 && proposalId <= proposalCount, "Proposal not found");
        Proposal memory p = proposals[proposalId];
        return (p.id, p.title, p.description, p.yesVotes, p.noVotes, p.deadline, p.executed);
    }
}
