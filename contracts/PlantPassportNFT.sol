// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PlantPassportNFT - Hộ Chiếu Thực Vật Số (Yêu Trồng Cây - 100% Testnet)
 * @notice Hợp đồng thông minh chuẩn ERC-721 đúc thẻ căn cước số cho chậu cây
 * @dev Hỗ trợ mạng Ethereum Sepolia (Chain ID: 11155111) và Base Sepolia (Chain ID: 84532)
 */

interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

interface IERC721 is IERC165 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address operator);
    function setApprovalForAll(address operator, bool _approved) external;
    function isApprovedForAll(address owner, address operator) external view returns (bool);
}

interface IERC721Metadata is IERC721 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function tokenURI(uint256 tokenId) external view returns (string memory);
}

contract PlantPassportNFT is IERC721Metadata {
    string private _name;
    string private _symbol;
    uint256 private _nextTokenId;
    address public owner;

    // Mapping tokenId => chủ sở hữu
    mapping(uint256 => address) private _owners;
    // Mapping địa chỉ => số lượng NFT
    mapping(address => uint256) private _balances;
    // Mapping tokenId => tokenURI metadata
    mapping(uint256 => string) private _tokenURIs;
    // Mapping tokenId => địa chỉ được ủy quyền
    mapping(uint256 => address) private _tokenApprovals;
    // Mapping owner => operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    // Cấu trúc dữ liệu ghi lại thông tin hộ chiếu thực vật
    struct BotanicalRecord {
        string plantName;
        string scientificName;
        uint8 stage;
        string sha256Proof;
        uint256 mintedAt;
    }

    mapping(uint256 => BotanicalRecord) public passports;

    event PassportMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string plantName,
        string sha256Proof,
        string tokenURI
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner");
        _;
    }

    constructor() {
        _name = "Yeu Trong Cay Plant Passport";
        _symbol = "YTC-PLANT";
        _nextTokenId = 1;
        owner = msg.sender;
    }

    function name() public view override returns (string memory) {
        return _name;
    }

    function symbol() public view override returns (string memory) {
        return _symbol;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_owners[tokenId] != address(0), "URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    function balanceOf(address account) public view override returns (uint256) {
        require(account != address(0), "Address zero is not a valid owner");
        return _balances[account];
    }

    function ownerOf(uint256 tokenId) public view override returns (address) {
        address tokenOwner = _owners[tokenId];
        require(tokenOwner != address(0), "Token nonexistent");
        return tokenOwner;
    }

    function supportsInterface(bytes4 interfaceId) public pure override returns (bool) {
        return
            interfaceId == type(IERC165).interfaceId ||
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId;
    }

    /**
     * @notice Đúc Hộ Chiếu Cây Trồng Số On-chain (Bất kỳ ai cũng có thể mint 0đ phí token, chỉ tốn testnet gas)
     * @param plantName Tên cây trồng (VD: Mai Vàng Cổ Thụ, Ổi Lùn Ban Công)
     * @param scientificName Tên khoa học hoặc giống cây
     * @param stage Giai đoạn sinh trưởng (1: Mầm non, 2: Sinh trưởng, 3: Ra hoa/kết trái)
     * @param sha256Proof Mã băm SHA-256 của ảnh cây làm bằng chứng độc bản
     * @param uri Đường dẫn JSON metadata / ảnh cây
     */
    function mintPassport(
        string memory plantName,
        string memory scientificName,
        uint8 stage,
        string memory sha256Proof,
        string memory uri
    ) public returns (uint256) {
        require(bytes(plantName).length > 0, "Plant name required");
        require(bytes(sha256Proof).length > 0, "SHA-256 proof required");

        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _owners[tokenId] = msg.sender;
        _balances[msg.sender] += 1;
        _tokenURIs[tokenId] = uri;

        passports[tokenId] = BotanicalRecord({
            plantName: plantName,
            scientificName: scientificName,
            stage: stage,
            sha256Proof: sha256Proof,
            mintedAt: block.timestamp
        });

        emit Transfer(address(0), msg.sender, tokenId);
        emit PassportMinted(tokenId, msg.sender, plantName, sha256Proof, uri);

        return tokenId;
    }

    function approve(address to, uint256 tokenId) public override {
        address tokenOwner = ownerOf(tokenId);
        require(to != tokenOwner, "Approval to current owner");
        require(msg.sender == tokenOwner || isApprovedForAll(tokenOwner, msg.sender), "Not authorized");
        _tokenApprovals[tokenId] = to;
        emit Approval(tokenOwner, to, tokenId);
    }

    function getApproved(uint256 tokenId) public view override returns (address) {
        require(_owners[tokenId] != address(0), "Nonexistent token");
        return _tokenApprovals[tokenId];
    }

    function setApprovalForAll(address operator, bool approved) public override {
        require(operator != msg.sender, "Approve to caller");
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function isApprovedForAll(address tokenOwner, address operator) public view override returns (bool) {
        return _operatorApprovals[tokenOwner][operator];
    }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Transfer not authorized");
        require(ownerOf(tokenId) == from, "From is not owner");
        require(to != address(0), "Transfer to zero address");

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        delete _tokenApprovals[tokenId];
        emit Transfer(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public override {
        transferFrom(from, to, tokenId);
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address tokenOwner = ownerOf(tokenId);
        return (spender == tokenOwner || isApprovedForAll(tokenOwner, spender) || getApproved(tokenId) == spender);
    }
}
