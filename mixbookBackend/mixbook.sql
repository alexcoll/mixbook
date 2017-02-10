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
  `email` VARCHAR(255) NOT NULL,
  `ENABLED` TINYINT(1) NOT NULL,
  `LASTPASSWORDRESETDATE` TIMESTAMP NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `mixbookdb`.`AUTHORITY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mixbookdb`.`AUTHORITY` (
  `ID` BIGINT NOT NULL AUTO_INCREMENT,
  `NAME` VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (NAME))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `mixbookdb`.`USER_AUTHORITY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mixbookdb`.`USER_AUTHORITY` (
  `USER_ID` BIGINT NOT NULL,
  `AUTHORITY_ID` BIGINT NOT NULL,
  PRIMARY KEY (USER_ID, AUTHORITY_ID),
  INDEX `fk_AUTHORITY1_idx` (`AUTHORITY_ID` ASC),
  INDEX `fk_users_idx` (`USER_ID` ASC),
  CONSTRAINT `fk_users` FOREIGN KEY (`USER_ID`) REFERENCES `mixbookdb`.`users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_AUTHORITY1` FOREIGN KEY (`AUTHORITY_ID`) REFERENCES `mixbookdb`.`AUTHORITY` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE)
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


-- -----------------------------------------------------
-- Populate `mixbookdb`.`AUTHORITY`
-- -----------------------------------------------------
INSERT INTO AUTHORITY(ID, NAME)
VALUES (1, 'ROLE_USER');
INSERT INTO AUTHORITY(ID, NAME)
VALUES (2, 'ROLE_ADMIN');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
