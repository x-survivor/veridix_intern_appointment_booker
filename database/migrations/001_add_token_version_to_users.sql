-- Run once if users was created using the original authentication branch schema.
-- Skip this migration on a fresh table created from the updated database/users.sql.
ALTER TABLE users
  ADD COLUMN token_version INT UNSIGNED NOT NULL DEFAULT 0;
