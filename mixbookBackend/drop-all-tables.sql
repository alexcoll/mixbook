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
DROP TABLE IF EXISTS `mixbookdb`.`users`;
DROP TABLE IF EXISTS `mixbookdb`.`USER_AUTHORITY`;
DROP TABLE IF EXISTS `mixbookdb`.`inventories`;

-- -----------------------------------------------------
-- Set foreign key checks back on
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS = 1;
