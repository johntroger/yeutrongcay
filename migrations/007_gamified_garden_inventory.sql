-- ==========================================================
-- BẢN MIGRATION 007: VƯỜN SỐ GAME HÓA, TÚI ĐỒ NGHỀ & WEB3 NFT PASSPORT ON-CHAIN
-- Hệ thống: Yêu Trồng Cây (yeutrongcay.com)
-- Ngày tạo: 09/11/2026
-- ==========================================================

-- 1. Bảng lưu trữ túi đồ nghề người làm vườn (Inventory)
CREATE TABLE IF NOT EXISTS user_inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    item_type ENUM('water', 'fertilizer', 'soil', 'sunlight', 'spray') NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_user_item (user_id, item_type),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Bổ sung các cột game hóa & Web3 On-Chain cho bảng chậu cây (garden_plants)
-- Sử dụng stored procedure an toàn để tránh lỗi trùng lặp cột khi chạy nhiều lần
DELIMITER $$
CREATE PROCEDURE AddGamifiedGardenColumns()
BEGIN
    IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'garden_plants' AND COLUMN_NAME = 'growth_stage') THEN
        ALTER TABLE garden_plants ADD COLUMN growth_stage TINYINT NOT NULL DEFAULT 1 COMMENT '1: Sprout, 2: Seedling, 3: Vegetative, 4: Flowering, 5: Fruiting';
    END IF;

    IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'garden_plants' AND COLUMN_NAME = 'growth_exp') THEN
        ALTER TABLE garden_plants ADD COLUMN growth_exp INT NOT NULL DEFAULT 0 COMMENT 'Điểm kinh nghiệm sinh trưởng';
    END IF;

    IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'garden_plants' AND COLUMN_NAME = 'health_score') THEN
        ALTER TABLE garden_plants ADD COLUMN health_score TINYINT NOT NULL DEFAULT 100 COMMENT '0-100%';
    END IF;

    IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'garden_plants' AND COLUMN_NAME = 'moisture_level') THEN
        ALTER TABLE garden_plants ADD COLUMN moisture_level TINYINT NOT NULL DEFAULT 80 COMMENT '0-100%';
    END IF;

    IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'garden_plants' AND COLUMN_NAME = 'nutrient_level') THEN
        ALTER TABLE garden_plants ADD COLUMN nutrient_level TINYINT NOT NULL DEFAULT 75 COMMENT '0-100%';
    END IF;

    IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'garden_plants' AND COLUMN_NAME = 'sunlight_level') THEN
        ALTER TABLE garden_plants ADD COLUMN sunlight_level TINYINT NOT NULL DEFAULT 80 COMMENT '0-100%';
    END IF;

    IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'garden_plants' AND COLUMN_NAME = 'soil_level') THEN
        ALTER TABLE garden_plants ADD COLUMN soil_level TINYINT NOT NULL DEFAULT 90 COMMENT '0-100%';
    END IF;

    IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'garden_plants' AND COLUMN_NAME = 'last_evaluated_at') THEN
        ALTER TABLE garden_plants ADD COLUMN last_evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    END IF;

    IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'garden_plants' AND COLUMN_NAME = 'total_harvests') THEN
        ALTER TABLE garden_plants ADD COLUMN total_harvests INT NOT NULL DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'garden_plants' AND COLUMN_NAME = 'passport_token_id') THEN
        ALTER TABLE garden_plants ADD COLUMN passport_token_id VARCHAR(50) DEFAULT NULL COMMENT 'Token ID trên Blockchain Sepolia';
    END IF;

    IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'garden_plants' AND COLUMN_NAME = 'passport_tx_hash') THEN
        ALTER TABLE garden_plants ADD COLUMN passport_tx_hash VARCHAR(100) DEFAULT NULL COMMENT 'Transaction Hash đúc NFT Sepolia';
    END IF;

    IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'garden_plants' AND COLUMN_NAME = 'passport_network') THEN
        ALTER TABLE garden_plants ADD COLUMN passport_network VARCHAR(50) DEFAULT 'Ethereum Sepolia';
    END IF;

    IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'garden_plants' AND COLUMN_NAME = 'passport_contract_addr') THEN
        ALTER TABLE garden_plants ADD COLUMN passport_contract_addr VARCHAR(50) DEFAULT '0x5994cd371311fb1ddc1a3354b6979acd3cd342a7';
    END IF;

    IF NOT EXISTS (SELECT * FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'garden_plants' AND COLUMN_NAME = 'passport_minted_at') THEN
        ALTER TABLE garden_plants ADD COLUMN passport_minted_at DATETIME DEFAULT NULL;
    END IF;
END$$
DELIMITER ;

CALL AddGamifiedGardenColumns();
DROP PROCEDURE IF EXISTS AddGamifiedGardenColumns;

-- 3. Bảng nhật ký thu hoạch mùa vụ
CREATE TABLE IF NOT EXISTS garden_harvest_logs (
    id VARCHAR(50) PRIMARY KEY,
    garden_plant_id VARCHAR(50) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    harvest_date DATE NOT NULL,
    reward_hearts INT NOT NULL DEFAULT 0,
    notes VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_plant_harvest (garden_plant_id),
    INDEX idx_user_harvest (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bảng quản lý Nonce EIP-712 Voucher đúc NFT (Chống tấn công Replay Attack)
CREATE TABLE IF NOT EXISTS nft_mint_vouchers (
    nonce VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    garden_plant_id VARCHAR(50) NOT NULL,
    recipient_address VARCHAR(42) NOT NULL,
    is_claimed BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_plant (garden_plant_id),
    INDEX idx_user_voucher (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Ghi nhận lịch sử migration
CREATE TABLE IF NOT EXISTS migrations_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    migration_name VARCHAR(255) NOT NULL UNIQUE,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO migrations_history (migration_name) VALUES ('007_gamified_garden_inventory.sql');
