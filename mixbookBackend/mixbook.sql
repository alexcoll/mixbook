SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_ENGINE_SUBSTITUTION,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mixbookdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mixbookdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mixbookdb` DEFAULT CHARACTER SET utf8mb4 ;
USE `mixbookdb` ;

ALTER DATABASE mixbookdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `mixbookdb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mixbookdb`.`users` (
  `user_id` BIGINT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `nickname` VARCHAR(255) NULL,
  `age` DATE NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(20) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Alter `mixbookdb`.`users` to add unique index
-- -----------------------------------------------------
ALTER TABLE `users`
ADD UNIQUE INDEX `ix_users_username` (`username`);


-- -----------------------------------------------------
-- Alter `mixbookdb`.`users` to add unique index
-- -----------------------------------------------------
ALTER TABLE `users`
ADD UNIQUE INDEX `ix_users_email` (`email`);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
