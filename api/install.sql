-- ==========================================================================
-- 小课桌 · 学习码云同步 建表脚本
-- 用法：宝塔 → 数据库 → phpMyAdmin / 导入，或 mysql -u root -p xiaokedz < install.sql
-- MySQL 5.7+ / MariaDB 10.2+，字符集 utf8mb4
-- 可重复执行（IF NOT EXISTS），不会覆盖已有数据
-- ==========================================================================
SET NAMES utf8mb4;

-- 用户：只存昵称与身份标识，不存真实姓名、手机号、生日
-- provider + external_id 预留给将来接微信 / Passkey：
--   code    → 学习码的 HMAC-SHA256
--   wechat  → openid
--   passkey → credential_id
CREATE TABLE IF NOT EXISTS xk_user (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nick VARCHAR(32) NOT NULL,
  provider VARCHAR(16) NOT NULL DEFAULT 'code',
  external_id VARCHAR(64) DEFAULT NULL,
  login_code CHAR(255) DEFAULT NULL COMMENT '学习码的 password_hash，明文不落库',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_identity (provider, external_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 进度：一个知识点一行；done_at 是客户端毫秒时间戳，用于多设备冲突合并
CREATE TABLE IF NOT EXISTS xk_progress (
  user_id BIGINT UNSIGNED NOT NULL,
  point_id VARCHAR(32) NOT NULL,
  score BIGINT NOT NULL DEFAULT 0,
  total BIGINT NOT NULL DEFAULT 3,
  done_at BIGINT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, point_id),
  KEY idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 登录态：只存 token 的哈希，数据库泄露也无法直接冒用
CREATE TABLE IF NOT EXISTS xk_token (
  token_hash CHAR(64) NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (token_hash),
  KEY idx_user (user_id),
  KEY idx_exp (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 学习码只有 6 位，按 IP 做每日失败次数限制，防止在线爆破
CREATE TABLE IF NOT EXISTS xk_attempt (
  ip VARCHAR(64) NOT NULL,
  day DATE NOT NULL,
  fails BIGINT NOT NULL DEFAULT 0,
  PRIMARY KEY (ip, day)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
