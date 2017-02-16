-- -----------------------------------------------------
-- Select database `mixbookdb`
-- -----------------------------------------------------
USE `mixbookdb`;

-- -----------------------------------------------------
-- Set foreign key checks off temporarily
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------
-- Truncate all tables in order to clean up database
-- -----------------------------------------------------
TRUNCATE `mixbookdb`.`users`;
TRUNCATE `mixbookdb`.`USER_AUTHORITY`;
TRUNCATE `mixbookdb`.`user_has_brand`;

-- -----------------------------------------------------
-- Set foreign key checks back on
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS = 1;
