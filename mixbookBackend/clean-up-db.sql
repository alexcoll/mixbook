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
TRUNCATE `mixbookdb`.`user_has_badges`;
TRUNCATE `mixbookdb`.`password_reset_token`;
TRUNCATE `mixbookdb`.`account_unlock_token`;
TRUNCATE `mixbookdb`.`recommendation`;
TRUNCATE `mixbookdb`.`USER_AUTHORITY`;
TRUNCATE `mixbookdb`.`user_has_brand`;
TRUNCATE `mixbookdb`.`recipe`;
TRUNCATE `mixbookdb`.`recipe_has_brand`;
TRUNCATE `mixbookdb`.`users_recipe_has_review`;
TRUNCATE `mixbookdb`.`users_rating_review`;

-- -----------------------------------------------------
-- Set foreign key checks back on
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS = 1;
