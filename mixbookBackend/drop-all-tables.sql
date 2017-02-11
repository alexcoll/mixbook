-- -----------------------------------------------------
-- Select database `activitizedbtest`
-- -----------------------------------------------------
USE `mixbookdb`;

-- -----------------------------------------------------
-- Set foreign key checks off temporarily
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------
-- Drop all tables in order to upgrade database schema
-- -----------------------------------------------------
TRUNCATE `mixbookdb`.`users`;
TRUNCATE `mixbookdb`.`USER_AUTHORITY`;

-- -----------------------------------------------------
-- Set foreign key checks back on
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS = 1;
