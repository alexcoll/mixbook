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
  `number_of_recipes` INT(11) NOT NULL,
  `number_of_ratings` INT(11) NOT NULL,
  `sum_of_personal_recipe_ratings` INT(11) NOT NULL,
  `number_of_personal_recipe_ratings` INT(11) NOT NULL,
  `ENABLED` TINYINT(1) NOT NULL,
  `LASTPASSWORDRESETDATE` TIMESTAMP NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `mixbookdb`.`badges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mixbookdb`.`badges` (
  `badge_id` BIGINT NOT NULL AUTO_INCREMENT,
  `badge_name` VARCHAR(255) NOT NULL,
  `badge_description` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`badge_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `mixbookdb`.`user_has_badges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mixbookdb`.`user_has_badges` (
  `user_id` BIGINT NOT NULL,
  `badge_id` BIGINT NOT NULL,
  PRIMARY KEY (`user_id`, `badge_id`),
  INDEX `fk_user_has_badge_badge_idx` (`badge_id` ASC),
  INDEX `fk_user_has_badge_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_badge_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `mixbookdb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_badge_badge`
    FOREIGN KEY (`badge_id`)
    REFERENCES `mixbookdb`.`badges` (`badge_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `mixbookdb`.`password_reset_token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mixbookdb`.`password_reset_token` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_user_id` BIGINT NOT NULL UNIQUE,
  `token` VARCHAR(128) NOT NULL UNIQUE,
  `expiry_date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user1_idx` (`user_user_id` ASC),
  CONSTRAINT `fk_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `mixbookdb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `mixbookdb`.`account_unlock_token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mixbookdb`.`account_unlock_token` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_user_id` BIGINT NOT NULL UNIQUE,
  `token` VARCHAR(128) NOT NULL UNIQUE,
  `expiry_date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user2_idx` (`user_user_id` ASC),
  CONSTRAINT `fk_user2`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `mixbookdb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
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
-- Table `mixbookdb`.`type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mixbookdb`.`type` (
  `type_id` BIGINT NOT NULL AUTO_INCREMENT,
  `type_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`type_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `mixbookdb`.`style`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mixbookdb`.`style` (
  `style_id` BIGINT NOT NULL AUTO_INCREMENT,
  `type_style_id` BIGINT NOT NULL,
  `style_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`style_id`),
  INDEX `fk_type_style1_idx` (`style_id` ASC),
  CONSTRAINT `fk_type_style1`
    FOREIGN KEY (`type_style_id`)
    REFERENCES `mixbookdb`.`type` (`type_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `mixbookdb`.`brand`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mixbookdb`.`brand` (
  `brand_id` BIGINT NOT NULL AUTO_INCREMENT,
  `style_brand_id` BIGINT NOT NULL,
  `brand_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`brand_id`),
  INDEX `fk_style_brand1_idx` (`style_brand_id` ASC),
  CONSTRAINT `fk_style_brand1`
    FOREIGN KEY (`style_brand_id`)
    REFERENCES `mixbookdb`.`style` (`style_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `mixbookdb`.`user_has_brand`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mixbookdb`.`user_has_brand` (
  `user_user_id` BIGINT NOT NULL,
  `brand_brand_id` BIGINT NOT NULL,
  PRIMARY KEY (`user_user_id`, `brand_brand_id`),
  INDEX `fk_user_has_brand_brand_brand1_idx` (`brand_brand_id` ASC),
  INDEX `fk_user_has_brand_user_idx` (`user_user_id` ASC),
  CONSTRAINT `fk_user_has_brand_user`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `mixbookdb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_brand_brand_brand1`
    FOREIGN KEY (`brand_brand_id`)
    REFERENCES `mixbookdb`.`brand` (`brand_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `mixbookdb`.`recipe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mixbookdb`.`recipe` (
  `recipe_id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_recipe_id` BIGINT NOT NULL,
  `recipe_name` VARCHAR(255) NOT NULL,
  `directions` TEXT NOT NULL,
  `number_of_ingredients` TINYINT(2) NOT NULL,
  `difficulty` TINYINT(2) NOT NULL,
  `number_of_ratings` INT(11) NOT NULL,
  `total_rating` INT(11) NOT NULL,
  PRIMARY KEY (`recipe_id`),
  INDEX `fk_user_recipe1_idx` (`user_recipe_id` ASC),
  CONSTRAINT `fk_user_recipe1`
    FOREIGN KEY (`user_recipe_id`)
    REFERENCES `mixbookdb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `mixbookdb`.`recipe_has_brand`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mixbookdb`.`recipe_has_brand` (
  `recipe_recipe_id` BIGINT NOT NULL,
  `brand_brand_id` BIGINT NOT NULL,
  PRIMARY KEY (`recipe_recipe_id`, `brand_brand_id`),
  INDEX `fk_recipe_has_brand_brand_brand1_idx` (`brand_brand_id` ASC),
  INDEX `fk_recipe_has_brand_recipe_idx` (`recipe_recipe_id` ASC),
  CONSTRAINT `fk_recipe_has_brand_recipe`
    FOREIGN KEY (`recipe_recipe_id`)
    REFERENCES `mixbookdb`.`recipe` (`recipe_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_recipe_has_brand_brand_brand1`
    FOREIGN KEY (`brand_brand_id`)
    REFERENCES `mixbookdb`.`brand` (`brand_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `mixbookdb`.`users_recipe_has_review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mixbookdb`.`users_recipe_has_review` (
  `users_recipe_has_review_id` BIGINT NOT NULL AUTO_INCREMENT,
  `users_user_id` BIGINT NOT NULL,
  `recipe_recipe_id` BIGINT NOT NULL,
  `review_commentary` TEXT NOT NULL,
  `rating` TINYINT(2) NOT NULL,
  `number_of_up_votes` INT(11) NOT NULL,
  `number_of_down_votes` INT(11) NOT NULL,
  PRIMARY KEY (`users_recipe_has_review_id`),
  INDEX `fk_users_recipe_has_review_recipe1_idx` (`recipe_recipe_id` ASC),
  INDEX `fk_users_recipe_has_review_users_idx` (`users_user_id` ASC),
  CONSTRAINT `fk_users_recipe_has_review_users`
    FOREIGN KEY (`users_user_id`)
    REFERENCES `mixbookdb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_users_recipe_has_review_recipe1`
    FOREIGN KEY (`recipe_recipe_id`)
    REFERENCES `mixbookdb`.`recipe` (`recipe_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
ROW_FORMAT = DYNAMIC;


-- -----------------------------------------------------
-- Table `mixbookdb`.`users_rating_review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mixbookdb`.`users_rating_review` (
  `users_user_id` BIGINT NOT NULL,
  `users_recipe_has_review_id` BIGINT NOT NULL,
  `vote` TINYINT(1) NOT NULL,
  PRIMARY KEY (`users_user_id`, `users_recipe_has_review_id`),
  INDEX `fk_users_rating_review_review1_idx` (`users_recipe_has_review_id` ASC),
  INDEX `fk_users_rating_review_users_idx` (`users_user_id` ASC),
  CONSTRAINT `fk_users_rating_review_users`
    FOREIGN KEY (`users_user_id`)
    REFERENCES `mixbookdb`.`users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_users_rating_review_review1`
    FOREIGN KEY (`users_recipe_has_review_id`)
    REFERENCES `mixbookdb`.`users_recipe_has_review` (`users_recipe_has_review_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
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
-- Alter `mixbookdb`.`type` to add unique index
-- -----------------------------------------------------
ALTER TABLE `type`
ADD UNIQUE INDEX `ix_type_name` (`type_name`);


-- -----------------------------------------------------
-- Alter `mixbookdb`.`style` to add unique index
-- -----------------------------------------------------
ALTER TABLE `style`
ADD UNIQUE INDEX `ix_style_name` (`style_name`);


-- -----------------------------------------------------
-- Alter `mixbookdb`.`brand` to add unique index
-- -----------------------------------------------------
ALTER TABLE `brand`
ADD UNIQUE INDEX `ix_brand_name` (`brand_name`);


-- -----------------------------------------------------
-- Alter `mixbookdb`.`recipe` to add unique index
-- -----------------------------------------------------
ALTER TABLE `recipe`
ADD UNIQUE `ix_recipe_user_name` (`user_recipe_id`, `recipe_name`);


-- -----------------------------------------------------
-- Alter `mixbookdb`.`recipe_has_brand` to add unique index
-- -----------------------------------------------------
ALTER TABLE `recipe_has_brand`
ADD UNIQUE `ix_recipe_has_brand_recipe_brand` (`recipe_recipe_id`, `brand_brand_id`);


-- -----------------------------------------------------
-- Alter `mixbookdb`.`users_recipe_has_review` to add unique index
-- -----------------------------------------------------
ALTER TABLE `users_recipe_has_review`
ADD UNIQUE `ix_users_recipe_has_review_user_recipe` (`users_user_id`, `recipe_recipe_id`);


-- -----------------------------------------------------
-- Alter `mixbookdb`.`users_rating_review` to add unique index
-- -----------------------------------------------------
ALTER TABLE `users_rating_review`
ADD UNIQUE `ix_users_rating_review_user_review` (`users_user_id`, `users_recipe_has_review_id`);


-- -----------------------------------------------------
-- Alter `mixbookdb`.`user_has_brand` to add unique index
-- -----------------------------------------------------
ALTER TABLE `user_has_brand`
ADD UNIQUE `ix_user_user_brand_brand` (`user_user_id`, `brand_brand_id`);


-- -----------------------------------------------------
-- Populate `mixbookdb`.`AUTHORITY`
-- -----------------------------------------------------
INSERT INTO AUTHORITY(ID, NAME)
VALUES (1, 'ROLE_USER');
INSERT INTO AUTHORITY(ID, NAME)
VALUES (2, 'ROLE_ADMIN');


-- -----------------------------------------------------
-- Populate `mixbookdb`.`type`
-- -----------------------------------------------------
INSERT INTO type(type_id, type_name)
VALUES (1, 'Spirits');
INSERT INTO type(type_id, type_name)
VALUES (2, 'Liqueurs');
INSERT INTO type(type_id, type_name)
VALUES (3, 'Wines and Champagnes');
INSERT INTO type(type_id, type_name)
VALUES (4, 'Beers and Ciders');
INSERT INTO type(type_id, type_name)
VALUES (5, 'Mixers');
INSERT INTO type(type_id, type_name)
VALUES (6, 'Others');


-- -----------------------------------------------------
-- Populate `mixbookdb`.`style`
-- -----------------------------------------------------
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (1, 1, 'Absinthe');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (2, 1, 'Brandy and Cognac');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (3, 1, 'Cachaca');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (4, 1, 'Calvados');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (5, 1, 'Gin');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (6, 1, 'Irish Whiskey');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (7, 1, 'Other Whiskey');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (8, 1, 'Rum');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (9, 1, 'Sambuca');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (10, 1, 'Schnapps');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (11, 1, 'Scottish Malt Whiskey');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (12, 1, 'Specialty');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (13, 1, 'Tequila and Mezcal');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (14, 1, 'Vodka');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (15, 2, 'Chocolate Liqueur');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (16, 2, 'Coffee Liqueur');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (17, 2, 'Cream Liqueur');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (18, 2, 'Fruit Liqueur');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (19, 2, 'Herb Liqueur');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (20, 2, 'Nut Liqueur');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (21, 2, 'Other Liqueur');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (22, 2, 'Whiskey Liqueur');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (23, 3, 'Champagne');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (24, 3, 'Fruit Wines');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (25, 3, 'Port');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (26, 3, 'Red Wine');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (27, 3, 'Sherry');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (28, 3, 'Vermouth');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (29, 3, 'White Wine');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (30, 4, 'Beers');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (31, 4, 'Ciders');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (32, 5, 'Bar Stock');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (33, 5, 'Juices');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (34, 5, 'Soft Drinks');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (35, 5, 'Syrups');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (36, 6, 'Alcopops');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (37, 6, 'Fruits');
INSERT INTO style(style_id, type_style_id, style_name)
VALUES (38, 6, 'Home');


-- -----------------------------------------------------
-- Populate `mixbookdb`.`brand`
-- -----------------------------------------------------
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (1, 1, 'Absinthe Red');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (2, 1, 'Absinthe');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (3, 1, 'Black Absinthe');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (4, 1, 'La Fe Absinthe');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (5, 2, 'Apple Brandy');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (6, 2, 'Apricot Brandy');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (7, 2, 'Blackberry Brandy');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (8, 2, 'Brandy');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (9, 2, 'Cherry Brandy');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (10, 2, 'Cognac');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (11, 2, 'Courvoisier Brandy');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (12, 2, 'Grappa');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (13, 2, 'Hennessy Cognac');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (14, 2, 'Hennessy VS');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (15, 2, 'Napoleon Courvoisier Cognac');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (16, 2, 'Pisco');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (17, 2, 'Poire William');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (18, 2, 'Remy Martin VSOP');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (19, 2, 'Yellow Plum Brandy');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (20, 3, 'Brasilla Cachaca');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (21, 3, 'Cachaca');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (22, 4, 'Calvados');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (23, 5, 'Beefeater');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (24, 5, 'Bombay Sapphire Gin');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (25, 5, 'Damson Gin');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (26, 5, 'Dry Gin');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (27, 5, "G'Vine");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (28, 5, 'Genever Gin');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (29, 5, 'Gin');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (30, 5, "Gordon's Gin");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (31, 5, "Hendrick's Gin");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (32, 5, 'London Dry Gin');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (33, 5, "Martin Miller's Gin");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (34, 5, 'Old Tom Gin');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (35, 5, 'Orange Gin');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (36, 5, 'Plymouth Gin');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (37, 5, 'Sloe Gin');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (38, 5, 'Tanqueray Gin');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (39, 5, 'Tom Gin');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (40, 6, 'Irish Mist');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (41, 6, 'Irish Whiskey');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (42, 6, 'Jameson Whiskey');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (43, 6, 'Whiskey');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (44, 7, 'Canadian Club Whiskey');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (45, 7, 'Canadian Whiskey');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (46, 7, 'Cherry Whiskey');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (47, 7, 'Cinnamon Whiskey');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (48, 7, 'Crown Royal');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (49, 7, 'Crown Royal Black');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (50, 7, 'Jack Daniels');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (51, 7, 'Jim Beam');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (52, 7, "Maker's Mark Bourbon");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (53, 7, 'Rye Whiskey');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (54, 7, 'Wild Turkey Bourbon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (55, 7, 'Yukon Jack');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (56, 8, '10 Cane Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (57, 8, '151 Proof Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (58, 8, 'Aged Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (59, 8, 'Amber Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (60, 8, 'Bacardi');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (61, 8, 'Bacardi 151');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (62, 8, 'Bacardi Apple');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (63, 8, 'Bacardi Gold');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (64, 8, 'Bacardi Limon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (65, 8, 'Bacardi O');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (66, 8, 'Bacardi Razz');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (67, 8, 'Bacardi Superior Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (68, 8, 'Bacardi Vanilla Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (69, 8, 'Black Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (70, 8, 'Bundaberg 280 Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (71, 8, "Captain Morgan's Spiced Rum");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (72, 8, "Captain Morgan's Tattoo");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (73, 8, 'Caribbean Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (74, 8, 'Coconut Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (75, 8, 'Dark Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (76, 8, 'Gold Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (77, 8, "Gosling's Black Seal Rum");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (78, 8, "Havana Club 7 Años");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (79, 8, 'Havana Club Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (80, 8, 'Jamaican Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (81, 8, 'Malibu');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (82, 8, 'Malibu Mango Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (83, 8, 'Malibu Passionfruit Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (84, 8, 'Malibu Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (85, 8, "Mango Rum");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (86, 8, "Overproof Rum");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (87, 8, 'Pineapple Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (88, 8, 'Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (89, 8, 'Rumple Minze');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (90, 8, 'Sagatiba Velha');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (91, 8, "Sailor Jerry's");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (92, 8, 'Spiced Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (93, 8, "Stroh Rum (80% Alcohol)");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (94, 8, 'White Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (95, 8, "Wood's 100 Dark Rum");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (96, 8, 'Wray and Nephew Overproof Rum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (97, 9, 'Raspberry Sambuca');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (98, 9, 'Sambuca');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (99, 9, "Sambuca (Black)");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (100, 9, "Sambuca (White)");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (101, 10, '99 Bananas');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (102, 10, 'Apple Pucker');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (103, 10, 'Apple Schnapps');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (104, 10, 'Berentzen Icemint');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (105, 10, 'Black Haus');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (106, 10, 'Blueberry Schnapps');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (107, 10, 'Butter Ripple Schnapps');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (108, 10, 'Butterscotch Schnapps');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (109, 10, 'Chocolate Schnapps');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (110, 10, 'Cinnamon Schnapps');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (111, 10, 'De Kuyper Peachtree');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (112, 10, "Goldschläger");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (113, 10, 'Goldstrike');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (114, 10, 'Grape Pucker');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (115, 10, 'Hot Damn');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (116, 10, 'Mint Schnapps');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (117, 10, 'Peach Schnapps');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (118, 10, 'Peppermint Schnapps');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (119, 10, 'Raspberry Schnapps');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (120, 10, 'Rootbeer Schnapps');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (121, 10, 'Sour Apple');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (122, 10, 'Sour Apple Pucker');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (123, 10, 'Sour Apple Schnapps');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (124, 10, 'Sour Puss');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (125, 10, 'Sour Puss Apple');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (126, 10, 'Sour Puss Blue');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (127, 10, 'Sour Puss Raspberry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (128, 10, 'Strawberry Schnapps');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (129, 10, 'Vanilla Schnapps');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (130, 10, "Watermelon Pucker");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (131, 11, "Bell's Whiskey");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (132, 11, 'Bourbon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (133, 11, 'Chivas Regal');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (134, 11, "Dewar's Scotch Whiskey");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (135, 11, 'Johnnie Walker Black Label');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (136, 11, 'Monkey Shoulder Scotch Whiskey');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (137, 11, 'Scotch Whiskey');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (138, 11, "Seagram's 7 Whiskey");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (139, 11, 'Southern Comfort');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (140, 11, 'Talisker Malt');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (141, 11, 'Talisker Storm');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (142, 11, 'The Wild Geese Whiskey');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (143, 11, 'Akvavit');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (144, 12, 'Aperol');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (145, 12, 'Aquavit');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (146, 12, 'Batida De Coco');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (147, 12, 'Berentzen Bushel & Barrel');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (148, 12, 'Blue Taboo');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (149, 12, 'Campari');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (150, 12, 'Chartreuse');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (151, 12, 'DOM Benedictine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (152, 12, 'Drambuie');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (153, 12, 'Everclear');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (154, 12, 'Galliano');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (155, 12, 'Grain Alcohol');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (156, 12, 'Green Chartreuse');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (157, 12, "Jägermeister");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (158, 12, 'Kamms and Sons');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (159, 12, 'Ouzo');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (160, 12, 'Pastis');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (161, 12, 'Pernod');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (162, 12, "Pimm's No. 1");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (163, 12, 'Pisang Ambon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (164, 12, 'Raki');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (165, 12, 'Sake');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (166, 12, 'Sharbat');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (167, 12, 'Soju');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (168, 12, 'Taboo');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (169, 12, 'West Coast Cooler');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (170, 12, "Wild Turkey - American Honey");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (171, 12, 'Yellow Chartreuse');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (172, 13, 'Baja Rosa');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (173, 13, 'Cabo Wabo Blanco Tequila');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (174, 13, "Cazadores Añejo Tequila");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (175, 13, 'Herradura Plata Tequila');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (176, 13, 'Jose Cuervo');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (177, 13, 'Mezcal');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (178, 13, 'Sierra Reposado Tequila');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (179, 13, 'Tequila');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (180, 13, 'Tequila Blanco');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (181, 13, 'Tequila Blu Reposado');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (182, 13, 'Tequila Oro');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (183, 13, 'Tequila Reposado');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (184, 13, "Tequila Rose");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (185, 13, 'Tequila Rose Strawberry Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (186, 13, 'Tequila Silver');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (187, 14, 'Absolut');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (188, 14, "Absolut Berry Açaí Vodka");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (189, 14, 'Absolut Citron');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (190, 14, 'Absolut Kurrant');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (191, 14, 'Absolut Mandarin');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (192, 14, 'Absolut New Orleans Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (193, 14, 'Absolut Peach');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (194, 14, 'Absolut Pears');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (195, 14, 'Absolut Peppar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (196, 14, 'Absolut Raspberry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (197, 14, 'Absolut Ruby Red');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (198, 14, 'Absolut Vanilla Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (199, 14, 'Absolut Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (200, 14, 'Apple Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (201, 14, 'Black Cherry Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (202, 14, 'Black Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (203, 14, 'Blue Alize');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (204, 14, 'Blueberry Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (205, 14, "Burnett's Fruit Punch Vodka");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (206, 14, 'Caramel Infused Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (207, 14, 'Cariel Vanilla Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (208, 14, 'Cherry Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (209, 14, 'Citron Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (210, 14, 'Finlandia Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (211, 14, 'Fluffed Marshmallow Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (212, 14, 'Grapefruit Flavored Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (213, 14, 'Green Tea Infused Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (214, 14, "Grey Goose L'Orange Vodka");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (215, 14, 'Grey Goose Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (216, 14, 'Ketel One Citroen');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (217, 14, 'Ketel One Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (218, 14, 'King Peter Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (219, 14, 'Lemon Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (220, 14, 'Lime Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (221, 14, 'Mandarin Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (222, 14, 'Mango Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (223, 14, 'Orange Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (224, 14, 'Peach Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (225, 14, 'Pravda Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (226, 14, 'Raspberry Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (227, 14, 'Red Alize');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (228, 14, 'Rose Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (229, 14, 'Russian Standard Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (230, 14, 'Skyy Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (231, 14, 'Smirnoff');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (232, 14, 'Smirnoff Blue Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (233, 14, 'Smirnoff Green Apple Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (234, 14, 'Smirnoff Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (235, 14, 'Stolichnaya');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (236, 14, 'Stolichnaya Blueberry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (237, 14, 'Stolichnaya Raspberry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (238, 14, 'Stolichnaya Vanilla');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (239, 14, 'Stolichnaya Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (240, 14, 'Strawberry Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (241, 14, 'Three Olives Cherry Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (242, 14, 'Three Olives Pomegranate Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (243, 14, 'UV Blue');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (244, 14, 'Vanilla Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (245, 14, 'Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (246, 14, 'Whipped Cream Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (247, 14, 'Wyborowa Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (248, 14, 'Zubrowka Bison Grass Vodka');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (249, 15, 'Chocolate Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (250, 15, 'Godiva White Chocolate Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (251, 16, 'Coffee Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (252, 16, 'Kahlúa');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (253, 16, 'Tia Maria');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (254, 17, 'Amarula Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (255, 17, 'Cape Velvet');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (256, 17, 'Creme De Bananes');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (257, 17, 'Creme De Cacao');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (258, 17, 'Creme De Cacao Dark');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (259, 17, 'Creme De Cacao White');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (260, 17, 'Creme De Cassis');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (261, 17, 'Creme De Fraises');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (262, 17, 'Creme De Framboise');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (263, 17, 'Creme De Menthe');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (264, 17, 'Creme De Mure');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (265, 17, 'Creme De Noyaux');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (266, 17, 'Creme De Peche');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (267, 17, 'Creme De Pomme');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (268, 17, 'Creme De Violette');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (269, 17, 'Rumchata');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (270, 18, 'Apple Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (271, 18, 'Apple Sourz');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (272, 18, 'Apricot Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (273, 18, 'Banana Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (274, 18, 'Berentzen Apple');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (275, 18, 'Berentzen Pear');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (276, 18, 'Berentzen Wild Cherry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (277, 18, 'Blackberry Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (278, 18, 'Blackcurrant Sourz');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (279, 18, 'Blue Curacao');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (280, 18, 'Bols');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (281, 18, 'Bols Apricot');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (282, 18, 'Bols Blue Curacao');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (283, 18, 'Bols Genever');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (284, 18, 'Bols Strawberry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (285, 18, 'Chambord');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (286, 18, 'Cherry Corkys');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (287, 18, 'Cherry Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (288, 18, 'Cherry Marnier');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (289, 18, 'Cherry Sourz');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (290, 18, 'Coconut Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (291, 18, 'Cointreau');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (292, 18, 'Grand Marnier');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (293, 18, 'Greenhook Ginsmiths Beach Plum Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (294, 18, 'Kirsch');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (295, 18, 'Kiwi Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (296, 18, 'Lemon Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (297, 18, 'Licor 43');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (298, 18, 'Limoncello');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (299, 18, "Lychee Liqueur");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (300, 18, 'Mango Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (301, 18, 'Maraschino Cherry Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (302, 18, 'Marie Brizard Grand Orange');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (303, 18, 'Midori');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (304, 18, 'Orange Curacao');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (305, 18, 'Orange Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (306, 18, 'Passionfruit Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (307, 18, 'Passoa');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (308, 18, 'Peach Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (309, 18, 'Pear Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (310, 18, 'Pineapple Sourz');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (311, 18, 'Raspberry Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (312, 18, 'Raspberry Sourz');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (313, 18, 'Razzmatazz');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (314, 18, 'Strawberry Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (315, 18, 'Swedish Punsch');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (316, 18, 'Triple Sec');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (317, 18, 'Tropical Sourz');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (318, 18, 'Vanilla Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (319, 18, 'Watermelon Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (320, 18, 'X Rated Fusion Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (321, 19, 'After Shock');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (322, 19, 'After Shock (Blue)');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (323, 19, 'After Shock (Black)');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (324, 19, 'After Shock (Green)');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (325, 19, 'After Shock (Red)');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (326, 19, 'After Shock (Silver)');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (327, 19, 'Amaro Averna');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (328, 19, 'Amaro Montenegro');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (329, 19, 'Amer Picon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (330, 19, 'Anisette');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (331, 19, 'Cinnamon Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (332, 19, 'Fernet Branca Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (333, 19, 'Jans Herbal Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (334, 19, 'Kummel');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (335, 19, 'Mint Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (336, 19, 'Peppermint Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (337, 19, 'St. Germain Elderflower Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (338, 20, 'Strega Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (339, 20, 'Amaretto');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (340, 20, 'Chestnut Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (341, 20, 'Disaronno Amaretto');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (342, 20, 'Frangelico');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (343, 20, 'Walnut Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (344, 21, 'Advocaat');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (345, 21, 'Cola Stiffies');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (346, 21, 'Cynar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (347, 21, 'Dooleys');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (348, 21, 'Elderflower Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (349, 21, "Fulton's Harvest Pumpkin Pie Liqueur");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (350, 21, 'Ginger Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (351, 21, 'Honey Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (352, 21, 'Natural Yoghurt Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (353, 21, 'Parfait Amour');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (354, 21, 'Tiramisu Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (355, 22, 'Baileys');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (356, 22, 'Baileys Glide');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (357, 22, 'Baileys Chocolate Mint');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (358, 22, 'Baileys Irish Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (359, 23, 'Cava');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (360, 23, 'Champagne');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (361, 23, 'Pink Champagne');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (362, 24, 'Cherry Lambrini');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (363, 24, 'Dubonnet');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (364, 24, 'Ginger Wine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (365, 24, 'Lillet Blanc');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (366, 24, 'Rose Wine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (367, 24, 'Stones Ginger Wine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (368, 25, 'Muscat Wine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (369, 25, 'Port');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (370, 25, 'Red Port');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (371, 25, 'Ruby Port');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (372, 26, 'Madeira');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (373, 26, 'Red Wine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (374, 27, 'Sherry Dry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (375, 27, 'Sherry Sweet');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (376, 28, 'Cocchi Di Torino');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (377, 28, 'Dry Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (378, 28, 'Dubonnet Rouge');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (379, 28, 'French Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (380, 28, 'Martini');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (381, 28, 'Martini Bianco Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (382, 28, 'Martini Dry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (383, 28, 'Martini Gold');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (384, 28, 'Martini Rosso');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (385, 28, 'Martini Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (386, 28, 'Noily Prat');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (387, 28, 'Red Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (388, 28, 'Sweet Red Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (389, 28, 'Sweet Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (390, 28, 'Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (391, 28, 'White Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (392, 29, 'Chardonnay');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (393, 29, 'Dry White Wine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (394, 29, 'Prosecco');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (395, 29, 'Sparkling White Wine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (396, 29, 'White Whine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (397, 30, 'Beer');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (398, 30, "Coor's Light");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (399, 30, 'Guiness');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (400, 30, 'Lager');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (401, 30, 'Lemongrass and Chili Beer');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (402, 30, 'Light Beer');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (403, 30, 'Newcastle Brown Ale');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (404, 30, 'Saison Beer');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (405, 30, 'Special Brew');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (406, 30, 'Stout');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (407, 30, 'Tennants Beer');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (408, 31, 'Apple Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (409, 31, 'Babycham');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (410, 31, 'Bulmers Pear Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (411, 31, 'Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (412, 31, 'Dry Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (413, 31, "Frosty Jack's White Cider");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (414, 31, 'Magners Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (415, 31, 'Pear Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (416, 31, 'Strongbow Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (417, 31, 'White Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (418, 32, 'Angostura Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (419, 32, 'Bittered Sling');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (420, 32, 'Bittered Sling Denman Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (421, 32, 'Bittered Sling Grapefruit & Hops Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (422, 32, 'Bittered Sling Lem-Marrakech Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (423, 32, 'Bittered Sling Moondog Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (424, 32, 'Bittered Sling Orange & Juniper Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (425, 32, 'Bittered Sling Plum & Rootbeer Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (426, 32, 'Bittermens Hopped Grapefruit Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (427, 32, 'Bittermens Xocolatl Mole Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (428, 32, 'Black Walnut Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (429, 32, 'Celery Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (430, 32, 'Chocolate Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (431, 32, 'Earl Grey Gomme Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (432, 32, 'Fee Brothers Plum Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (433, 32, 'Fernet Branca Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (434, 32, 'Ginger Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (435, 32, 'Gomme Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (436, 32, 'Grapefruit Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (437, 32, 'Green Tea Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (438, 32, 'Grenadine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (439, 32, 'Half and Half');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (440, 32, 'Lemon Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (441, 32, 'Lime Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (442, 32, 'Lime Margarita Mix');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (443, 32, 'Margarita Mix');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (444, 32, 'Orange Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (445, 32, 'Peach Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (446, 32, "Peychaud's Aromatic Bitters");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (447, 32, 'Piña Colada Mix');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (448, 32, 'Plum Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (449, 32, 'Rhubarb Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (450, 32, 'Sour Mix');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (451, 32, 'Sugar Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (452, 32, "Velvet Falernum");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (453, 32, 'Yohimbe Extract');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (454, 33, 'Apple and Blackcurrant Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (455, 33, 'Apple and Mango Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (456, 33, 'Apple Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (457, 33, 'Apricot Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (458, 33, 'Banana Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (459, 33, 'Beetroot Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (460, 33, 'Blackcurrant Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (461, 33, 'Blueberry Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (462, 33, 'Carrot Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (463, 33, 'Cherry Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (464, 33, 'Clementine Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (465, 33, 'Cranberry Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (466, 33, 'Grape Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (467, 33, 'Guava Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (468, 33, 'Lemon Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (469, 33, 'Lime Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (470, 33, 'Lychee Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (471, 33, 'Mango Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (472, 33, 'Maraschino Cherry Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (473, 33, "Mike's Hard Berry");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (474, 33, 'Olive Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (475, 33, 'Orange Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (476, 33, 'Papaya Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (477, 33, 'Passionfruit Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (478, 33, 'Peach Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (479, 33, 'Peach Nectar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (480, 33, 'Pear Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (481, 33, 'Pear Nectar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (482, 33, 'Pineapple Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (483, 33, 'Pink Grapefruit');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (484, 33, 'Pomegranate Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (485, 33, "Raspberry Juice");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (486, 33, 'Red Grape Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (487, 33, "Rose's Lime Juice");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (488, 33, 'Strawberry Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (489, 33, 'Tangerine Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (490, 33, 'Tomato Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (491, 33, 'Tropical Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (492, 33, 'Ugli Fruit Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (493, 33, 'Watermelon Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (494, 33, 'Wheatgrass Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (495, 33, 'White Cranberry and Apple Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (496, 33, 'White Cranberry Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (497, 33, 'White Grape Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (498, 34, '7Up');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (499, 34, 'Arizona Iced Tea');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (500, 34, 'Bitter Lemon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (501, 34, 'Blackcurrant Cordial');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (502, 34, 'Canada Dry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (503, 34, 'Cherryade');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (504, 34, 'Clamato');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (505, 34, 'Club Soda');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (506, 34, 'Coke');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (507, 34, 'Cream Soda');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (508, 34, 'Diet Coke');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (509, 34, 'Dr. Pepper');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (510, 34, 'Elderflower Cordial');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (511, 34, 'Energy Drink');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (512, 34, 'Fanta Fruit Twist');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (513, 34, "Fentiman's Victorian Rose Lemonada Soda");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (514, 34, 'Fizzy Orange Drink');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (515, 34, 'Ginger Ale');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (516, 34, 'Ginger Beer');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (517, 34, 'Grape Sodapop');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (518, 34, 'Ice Tea');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (519, 34, 'Irn Bru');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (520, 34, 'Lemon Cordial');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (521, 34, 'Lemon Lime Soda');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (522, 34, "Lemon Squash");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (523, 34, 'Lemonade');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (524, 34, 'Lime Coke');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (525, 34, 'Lime Cordial');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (526, 34, 'Limeade');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (527, 34, 'Lucozade');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (528, 34, 'Mountain Dew');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (529, 34, 'Non-alcoholic Apple Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (530, 34, "Orange + Cranberry J20");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (531, 34, 'Orange Blossom Water');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (532, 34, 'Pink Lemonade');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (533, 34, 'Powerade');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (534, 34, 'Raspberry Cordial');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (535, 34, 'Red Bull');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (536, 34, 'Ribena');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (537, 34, 'Root Beer');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (538, 34, 'Rose Water');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (539, 34, 'Schweppes Bitter Lemon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (540, 34, 'Soda Water');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (541, 34, 'Sparkling Water');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (542, 34, 'Sprite');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (543, 34, 'Strawberry Milkshake');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (544, 34, 'Tizer');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (545, 34, 'Tonic Water');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (546, 34, 'Vanilla Coke');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (547, 34, 'Vimto');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (548, 35, 'Agave Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (549, 35, 'Caramel Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (550, 35, 'Cardamom Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (551, 35, 'Cherry Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (552, 35, 'Chocolate Chip Cookie Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (553, 35, 'Chocolate Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (554, 35, 'Cinnamon Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (555, 35, 'Citrus Agave');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (556, 35, 'Coconut Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (557, 35, 'Coconut Water Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (558, 35, 'Elderflower Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (559, 35, 'Falernum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (560, 35, 'Ginger Bread Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (561, 35, 'Ginger Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (562, 35, 'Honey Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (563, 35, 'Lavender Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (564, 35, 'Lemon Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (565, 35, 'Maple Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (566, 35, 'Mint Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (567, 35, 'Orange Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (568, 35, 'Orgeat Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (569, 35, 'Passionfruit');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (570, 35, 'Pisachio Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (571, 35, 'Pomegranate Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (572, 35, 'Raspberry Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (573, 35, 'Rose Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (574, 35, 'Rosemary Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (575, 35, 'Spiced Pumpkin Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (576, 35, 'Strawberry Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (577, 35, 'Vanilla Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (578, 35, 'Violet Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (579, 36, 'Bacardi Breezer Orange');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (580, 36, 'Bacardi Breezer Watermelon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (581, 36, 'Orange Reef');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (582, 36, 'Smirnoff Ice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (583, 36, 'Smirnoff Ice (Black)');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (584, 36, 'Smirnoff Ice Raspberry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (585, 36, 'WKD');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (586, 36, 'WKD Blue');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (587, 36, 'WKD Clear');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (588, 36, 'WKD Original');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (589, 36, 'WKD Red');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (590, 37, 'Apple');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (591, 37, 'Banana');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (592, 37, 'Blackberries');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (593, 37, 'Blueberries');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (594, 37, 'Cherry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (595, 37, 'Coconut');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (596, 37, 'Cucumber');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (597, 37, 'Frozen Peaches');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (598, 37, 'Green Olives');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (599, 37, 'Kiwi');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (600, 37, 'Lemon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (601, 37, 'Lemon Balm');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (602, 37, 'Lime');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (603, 37, 'Mango');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (604, 37, 'Mango Puree');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (605, 37, 'Maraschino Cherry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (606, 37, 'Melon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (607, 37, 'Olives');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (608, 37, 'Orange');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (609, 37, 'Passionfruit Puree');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (610, 37, 'Peach');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (611, 37, 'Peach Puree');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (612, 37, 'Pear');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (613, 37, 'Pineapple');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (614, 37, 'Pomegranate');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (615, 37, 'Raspberry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (616, 37, 'Raspberry Puree');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (617, 37, 'Strawberry Puree');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (618, 37, 'Tomatoes');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (619, 37, 'Watermelon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (620, 38, 'Allspice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (621, 38, 'Almond Extract');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (622, 38, 'Almond Milk');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (623, 38, 'Apricot Jam');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (624, 38, 'Basil Leaves');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (625, 38, 'Black Tea');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (626, 38, 'Brown Sugar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (627, 38, 'Brown Toast');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (628, 38, 'Butter');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (629, 38, 'Camomile Tea');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (630, 38, 'Cardamom');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (631, 38, 'Cardamom Pods');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (632, 38, 'Cayenne Pepper');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (633, 38, 'Celery');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (634, 38, 'Celery Salt');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (635, 38, 'Chili Peppers');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (636, 38, 'Chocolate');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (637, 38, 'Chocolate Ice Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (638, 38, 'Chocolate Milk');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (639, 38, 'Chocolate Sauce');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (640, 38, 'Cinnamon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (641, 38, 'Cloves');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (642, 38, 'Cocoa Powder');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (643, 38, 'Coconut Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (644, 38, 'Coconut Milk');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (645, 38, 'Coffee');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (646, 38, 'Coffee Beans');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (647, 38, 'Coffee Ice Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (648, 38, 'Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (649, 38, 'Dark Chocolate Powder');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (650, 38, 'Demerara Sugar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (651, 38, 'Desiccated Coconut');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (652, 38, 'Double Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (653, 38, 'Earl Grey Tea');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (654, 38, 'Egg White');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (655, 38, 'Egg Yolk');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (656, 38, 'Eggnog');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (657, 38, 'Espresso Coffee');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (658, 38, 'Friji Chocolate Milkshake');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (659, 38, 'Ginger');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (660, 38, 'Gingerbread');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (661, 38, 'Green Food Colouring');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (662, 38, 'Green Tea');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (663, 38, 'Ground Coffee Beans');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (664, 38, 'Honey');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (665, 38, 'Hot Chocolate');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (666, 38, 'Icing Sugar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (667, 38, 'Jasmine Tea');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (668, 38, 'Jelly');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (669, 38, 'Lemon Ice Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (670, 38, 'Lemon Sorbet');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (671, 38, 'Lime Popsicle');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (672, 38, 'Mango Sorbet');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (673, 38, 'Marmalade');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (674, 38, 'Mascarpone');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (675, 38, 'Milk');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (676, 38, 'Milk Chocolate Powder');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (677, 38, 'Mincemeat');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (678, 38, 'Mint Leaves');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (679, 38, 'Natural Yoghurt');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (680, 38, 'Nutella');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (681, 38, 'Nutmeg');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (682, 38, 'Onion');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (683, 38, 'Oreo Cookie');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (684, 38, 'Pepper');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (685, 38, 'Peppermint');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (686, 38, 'Pink Peppercorn');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (687, 38, 'Popcorn');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (688, 38, 'Pumpkin Puree');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (689, 38, 'Rosemary');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (690, 38, 'Rum and Raisin Ice Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (691, 38, 'Salt');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (692, 38, 'Single Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (693, 38, 'Skittles');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (694, 38, 'Soy Sauce');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (695, 38, 'Steamed Milk');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (696, 38, 'Strawberry Vanilla Ice Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (697, 38, 'Sugar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (698, 38, 'Sweetened Condensed Milk');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (699, 38, 'Tabasco Sauce');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (700, 38, 'Vanilla Essence');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (701, 38, 'Vanilla Ice Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (702, 38, 'Vanilla Pod');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (703, 38, 'Wasabi');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (704, 38, 'Whipped Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (705, 38, 'White Balsamic Vinegar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (706, 38, 'Worcestershire Sauce');


INSERT INTO badges(badge_id, badge_name, badge_description)
VALUES(1, 'Created First Recipe', 'The user has created their first recipe!');
INSERT INTO badges(badge_id, badge_name, badge_description)
VALUES(2, 'Reviewed First Recipe', 'The user has reviewed their first recipe!');
INSERT INTO badges(badge_id, badge_name, badge_description)
VALUES(3, 'Bronze Recipe Creation', 'The user has created 5 total recipes!');
INSERT INTO badges(badge_id, badge_name, badge_description)
VALUES(4, 'Bronze Review Creation', 'The user has reviewed 5 total recipes!');
INSERT INTO badges(badge_id, badge_name, badge_description)
VALUES(5, 'Silver Recipe Creation', 'The user has created 25 total recipes!');
INSERT INTO badges(badge_id, badge_name, badge_description)
VALUES(6, 'Silver Review Creation', 'The user has reviewed 25 total recipes!');
INSERT INTO badges(badge_id, badge_name, badge_description)
VALUES(7, 'Gold Recipe Creation', 'The user has created 50 total recipes!');
INSERT INTO badges(badge_id, badge_name, badge_description)
VALUES(8, 'Gold Review Creation', 'The user has reviewed 50 total recipes!');
INSERT INTO badges(badge_id, badge_name, badge_description)
VALUES(9, 'Platinum Recipe Creation', 'The user has created 100 total recipes!');
INSERT INTO badges(badge_id, badge_name, badge_description)
VALUES(10, 'Platinum Review Creation', 'The user has reviewed 100 total recipes!');
INSERT INTO badges(badge_id, badge_name, badge_description)
VALUES(11, 'Diamond Recipe Creation', 'The user has created 250 total recipes!');
INSERT INTO badges(badge_id, badge_name, badge_description)
VALUES(12, 'Diamond Review Creation', 'The user has reviewed 250 total recipes!');
INSERT INTO badges(badge_id, badge_name, badge_description)
VALUES(13, 'Centurion Recipe Creation', 'The user has created 500 total recipes!');
INSERT INTO badges(badge_id, badge_name, badge_description)
VALUES(14, 'Centurion Review Creation', 'The user has reviewed 500 total recipes!');
INSERT INTO badges(badge_id, badge_name, badge_description)
VALUES(15, 'Mixologist Recipe Creation', 'The user has created 1000 total recipes!');
INSERT INTO badges(badge_id, badge_name, badge_description)
VALUES(16, 'Mixologist Review Creation', 'The user has reviewed 1000 total recipes!');


INSERT INTO users(user_id, username, password, first_name, last_name, email, number_of_recipes, number_of_ratings, sum_of_personal_recipe_ratings, number_of_personal_recipe_ratings, ENABLED, LASTPASSWORDRESETDATE)
VALUES (1, 'the_mixologist', '$2a$10$6ZC5L1q/BwqM4E70GNabc.0/xvk61HzpURdbqxKCwjhS98vMpE94a', 'The', 'Mixologist', 'mixbookhelp@gmail.com', 100, 0, 0, 0, 1, '2018-03-28 22:59:33');

INSERT INTO USER_AUTHORITY(USER_ID, AUTHORITY_ID)
VALUES (1, 1);

INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (1, 1, 'Mint Julep', 'Place 10 mint leaves in the bottom of an old-fashioned glass and top with 1.5 teaspoons of sugar. Muddle these together until the leaves begin to break down. Add a splash of seltzer water, fill the glass 3/4 full with crushed ice, and add 2.5 ounces of bourbon. Top with another splash of seltzer, stir, and garnish with a sprig of mint. Serve immediately.', 4, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (2, 1, 'Gin and Tonic', 'Pour 2 ounces of gin and 3 ounces of tonic water into a highball glass with ice cubes. Stir well. Garnish with the lime wedge.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (3, 1, 'Jack and Coke', 'Pour 2 ounces of Jack Daniels into large glass filled with ice. Pour 10 ounces of Coke into the glass. Stir lightly.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (4, 1, 'Rum and Coke', 'Pour 1 part rum into glass with ice. Add 3 parts Coke. Squeeze the lime and drop into as garnish.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (5, 1, 'Whiskey and Coke', 'Pour 2 ounces of whiskey into large glass filled with ice. Pour 10 ounces of Coke into the glass. Stir lightly.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (6, 1, 'Whiskey Ginger', 'Fill a highball glass with ice. Pour 2-3 ounces of whiskey into glass. Top with ginger ale. Squeeze and float a lime wedge in the glass.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (7, 1, 'Malibu and Coke', 'Fill a chilled highball glass with ice cubes. Add 1 part Malibu and top up with cola. Garnish with a lime wheel.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (8, 1, 'Black Russian', 'Add 2 ounces of vodka and 1 ounce of Kahlúa to a mixing glass with ice and stir. Strain into an Old Fashioned glass over fresh ice.', 2, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (9, 1, 'White Russian', 'Add 2 ounces of vodka and 1 ounce of Kahlúa to an Old Fashioned glass filled with ice. Top with a large splash of heavy cream and stir.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (10, 1, 'Gimlet', 'Add 2.5 ounces of gin and 1 ounce of Rose\'s Lime Juice to a shaker and fill with ice. Shake, and strain into a chilled cocktail glass or an Old Fashioned glass filled with fresh ice. Garnish with a lime wheel.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (11, 1, 'A DeMink', 'Chill 2 ounces of vodka, 1 ounce of Baileys Irish Cream, and 2 ounces of Coke. Pour over ice in a cocktail glass.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (12, 1, 'Apple Coke', 'Mix together 1/3 ounces of Apple Pucker and 2/3 ounces of Coke and serve over ice in highball glass.', 2, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (13, 1, 'Vodka Water Lime', 'Combine 1.5 ounces of vodka and 4 ounces of water in a cocktail glass with ice. Stir and garnish.', 2, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (14, 1, 'Barbarosa', 'Mix 1/2 parts vodka and 1/2 parts Coke and serve chilled in a old fashioned glass. Do not use ice but a drop of lemon juice or a slice of lemon may be added.', 2, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (15, 1, 'Margarita', 'Rim a high ball glass with salt. Put two big handfuls of ice cubes into a cocktail shaker. Add 2 ounces of tequila silver, 2 ounces of Rose\'s Lime Juice, and a 1/2 ounce of triple sec. Shake for a good 10 seconds. Fill high ball glass half full of ice cubes. Pour contents of shaker over top.', 4, 4, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (16, 1, 'Cherry Coke', 'Pour 1 ounce of Stroh Rum (80% Alcohol) and 4 ounces of Coke into an old fashioned glass.', 2, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (17, 1, 'Fuzzy Bear', 'Mix in a cocktail glass over ice. Add 1 ounce of Kahlúa, pour Coke and milk at same time until full. Adding the Coke and milk at the same time will reduce the head on the Coke.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (18, 1, 'Fuzzy Cola', 'Add 1 ounce of peach schnapps and top with Coke. Stir over ice and enjoy.', 2, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (19, 1, 'Hennessy New York', 'Pour about 3.5 ounces of Coke in an ice filled Hennessy VS glass (about 1.5 ounces of Hennessy VS), stir a few seconds with a bar spoon and serve. Garnish with a lemon wedge.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (20, 1, 'Linux', 'Pour 1 1/3 ounces of vodka and 3/4 ounces of lime juice into a highball glass almost filled with ice cubes. Fill with Coke, garnish with lime peel, and serve.', 4, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (21, 1, 'Tom Collins', 'Fill a Collins glass with 1 1/2 cups ice, set aside in the freezer. Combine 2 ounces of gin, 3/4 ounces of lemon juice, and 1/2 ounce of sugar syrup in a cocktail shaker. Add 1 cup ice, cover and shake until chilled. Strain into the chilled Collins glass. Top with club soda and garnish with a lemon wedge.', 5, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (22, 1, 'Mad Bomber', 'Pour 4 ounces of gin and 1 can of Coke over ice cubes into a highball glass.', 2, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (23, 1, 'Mexican Riptide', 'Mix 1 ounce of Kahlúa, 1 ounce of Malibu Rum, and 4 ounces of Coke with ice in a Collins glass.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (24, 1, 'Morgan Coke', 'Fill a 16 ounce glass with ice. Add 4 ounces of Captain Morgan\'s Spiced Rum and fill with Coke.', 2, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (25, 1, 'Tequila Paralyzer', 'Pour 1 ounce of Tequila, 1 ounce of Kahlúa, and a splash of milk in a highball glass and add cream. Fill with Coke.', 5, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (26, 1, 'Moscow Mule', 'Squeeze half lime into a glass and drop in peel. Fill glass with ice and add 2 ounces vodka. Top with 4 ounces of ginger beer.', 3, 1, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (27, 1, 'Vodka Cranberry', 'Fill old-fashioned glass halfway with ice. Add vodka, cranberry, and orange juice.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (28, 1, 'The Kalimotxo', 'Pour equal parts red wine and Coke over ice.', 2, 1, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (29, 1, 'The Greyhound', 'Fill rocks glass with ice, pour in 2 ounces of vodka and 5 ounces of grapefruit juice. Stir well.', 2, 1, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (30, 1, 'Dark and Stormy', 'Add 2 ounces dark rum and 4 ounces ginger beer over ices. Stir and enjoy.', 2, 1, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (31, 1, 'Bourbon Buck', 'Add 2 ounces Bourbon and 5 ounces Ginger Ale over ices. Stir and enjoy.', 2, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (32, 1, 'London Lemonade', 'Add 2 ounces gin and 4 ounces lemonade over ices. Stir and enjoy.', 2, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (33, 1, 'Garibaldi', 'Add 1.5 ounces Campari and 3 ounces orange juice over ice. Stir and enjoy.', 2, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (34, 1, 'Pimm\'s Cup', 'Add 2 ounces Pimm\'s and 6 ounces ginger ale over ice. Stir and enjoy.', 2, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (35, 1, 'Americano', 'Add 1.5 ounces Campari and 1.5 ounces sweet red vermouth into glass. Add ice and top with soda water. Stir and enjoy.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (36, 1, 'Boulevardier', 'Stir with ice, Strain 1 ounce Campari, 1.5 ounces sweet red vermouth, and 1.5 ounces bourbon into glass.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (37, 1, 'Corpse Reviver #2', 'Shake and strain .75 oz gin, .75 oz Cointreau, .75 oz Lillet Blanc, .75 oz Lemon Juice, and .5 tsp Absinthe into chilled cocktail glass.', 5, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (38, 1, 'Cosmopolitan', 'Shake and strain 1.5 oz vodka, .75 oz Cointreau, 1 oz cranberry juice, and .25 oz lime juice, into chilled cocktail glass.', 4, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (39, 1, 'Cuba Libre', 'Build 4 oz coke, .33 oz lime juice, and 1.66 oz white rum in highball glass filled with ice.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (40, 1, 'Daiquiri', 'Shake 2.5 oz rum, .75 oz lime juice, and .5 oz sugar syrup. Strain into chilled cocktail glass.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (41, 1, 'Mimosa', 'Mix 2.5 oz orange juice and 2.5 oz champagne into glass. serve cold.', 2, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (42, 1, 'Negroni', 'Stir and strain 1 oz gin, 1 oz Campari, and 1 oz sweet vermouth into glass with ice.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (43, 1, 'Pisco Sour', 'Dry shake, shake with ice, and strain 2 oz Pisco, .5 oz lime juice, .5 oz lemon juice, .75 oz sugar syrup, and .5 oz egg white into chilled highball glass.', 5, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (44, 1, 'Sea Breeze', 'Fill old-fashioned glass halfway with ice. Add .5 oz vodka, 4 oz cranberry, .5 oz orange juice, and 1 oz grapefruit juice.', 4, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (45, 1, 'Bay Breeze', 'Fill old-fashioned glass halfway with ice. Add .5 oz vodka, 4 oz cranberry, .5 oz orange juice, and 1 oz pineapple juice.', 4, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (46, 1, 'Lounge Lizard', 'Build 4 oz coke, .33 oz lime juice, .5 oz Amaretto and 1.66 oz dark rum in highball glass filled with ice.', 4, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (47, 1, 'Woo Woo', 'Fill old-fashioned glass halfway with ice. Add .5 oz vodka, 4 oz cranberry, .5 oz orange juice, and 1 oz peach schnapps.', 4, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (48, 1, 'Strawberry Daiquiri', 'Shake 2.5 oz rum, .75 oz strawberry juice, and .5 oz sugar syrup. Strain into chilled cocktail glass.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (49, 1, 'Raspberry Daiquiri', 'Shake 2.5 oz rum, .75 oz raspberry juice, and .5 oz sugar syrup. Strain into chilled cocktail glass.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (50, 1, 'Passionfruit Daiquiri', 'Shake 2.5 oz rum, .75 oz passionfruit juice, and .5 oz sugar syrup. Strain into chilled cocktail glass.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (51, 1, 'Grapefruit Daiquiri', 'Shake 2.5 oz rum, .75 oz grapefruit juice, and .5 oz sugar syrup. Strain into chilled cocktail glass.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (52, 1, 'Cherry Daiquiri', 'Shake 2.5 oz rum, .75 oz cherry juice, and .5 oz sugar syrup. Strain into chilled cocktail glass.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (53, 1, 'Manhattan', 'Stir 2 ounces of the rye whiskey, 1 ounce of sweet vermouth, 2 dashes of Peychaud\'s Aromatic Bitters over ice until chilled, about 30 seconds. Strain into chilled coupe glass. Garnish with cherry.', 4, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (54, 1, 'Bacardi El Presidente', 'Pour 2 parts rum, one part vermouth and a dash of bitters into a glass and mix.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (55, 1, 'Bourbon Manhattan', 'Add all of the ingredients to a mixing glass and fill with ice.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (56, 1, 'Traditional Elderfashion', 'Add all of the ingredients to an old fashion glass and fill with ice.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (57, 1, 'Double Eagle', 'In a shaker, muddle the lemon and basil. Add the remaining ingredients and fill with ice. Shake, and double strain into a Martini glass.', 4, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (58, 1, 'Red Hook', 'Add all the ingredients to a mixing glass and fill with ice. Stir, and strain into a cocktail glass.', 2, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (59, 1, 'Crime and Punishment', 'Add all the ingredients to a mixing glass and fill with ice. Stir, and strain into a cocktail glass.', 3, 4, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (60, 1, 'Euro', 'Add all the ingredients to a mixing glass and fill with ice. Stir, and strain into a cocktail glass.', 3, 4, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (61, 1, 'Figgly Wiggly', 'Add all the ingredients to a mixing glass and fill with ice. Stir, and strain into a Yarai glass.', 2, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (62, 1, 'Stone and Co', 'Add all of the ingredients to a blender, and blend until smooth.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (63, 1, 'Beermosa', 'Fill a chilled beer glass with the lager, and top with the orange juice.', 2, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (64, 1, 'Bloody Bulldog', 'In a shaker, stir together the lemon juice and sugar. Add the tequila and Grand Marnier, and fill with ice. Shake well and strain into a chilled cocktail glass.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (65, 1, 'Spicy Grand Margarita', 'Coat the rim of a rocks glass with salt, fill with ice and set aside. In a shaker, muddle the agave nectar or simple syrup, red pepper flakes and chile powder. Add the remaining ingredients, fill with ice and shake vigorously. Strain through a tea strainer into the prepared glass.', 3, 5, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (66, 1, 'Breakfast Margarita', 'Add all the ingredients to a shaker and fill with ice. Shake, and strain into a rocks glass filled with fresh ice.', 4, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (67, 1, 'Tequila Daisy', 'In a shaker, stir together the lemon juice and sugar. Add the tequila and Grand Marnier, and fill with ice. Shake well and strain into a chilled cocktail glass.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (68, 1, 'Tegroni', 'Add all the ingredients to a mixing glass and fill with ice. Stir, and strain into a rocks glass filled with fresh ice or a chilled cocktail glass.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (69, 1, 'Partida Paloma', 'Fill a highball glass with ice and add the tequila and salt. Squeeze the lime half into the glass and drop into the drink.', 2, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (70, 1, 'Herradura Tequila Mojito', 'In a shaker, muddle the mint leaves. Add the tequila, lime juice and agave nectar, and fill with ice. Shake, and strain into a Collins glass filled with fresh ice. Top with club soda.', 4, 4, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (71, 1, '99 Hospital Trips', 'Mix them together, sip sparingly.', 2, 1, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (72, 1, '99 Disgusting', 'Another signature 99 drink.', 4, 1, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (73, 1, 'Blue Hawaiian', 'Mix them with a splash of pineapple juice.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (74, 1, 'Gulfstream', 'Mix them with a splash of pineapple juice.', 4, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (75, 1, 'Alabama Slammer', 'Mix them, splash of Sour.', 5, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (76, 1, 'Baltimore Zoo', 'Mix all the liqours, then a splash of coke and sour.', 9, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (77, 1, 'Bloody Mary', 'Heavy on the Vodka and tomato, sprinkle of Cayenne pepper spice.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (78, 1, 'Colorado Root Beer', 'Splash of Half and Half. Can subsitite root beer with a root beer flavored liqour..', 4, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (79, 1, 'Cape Cod', 'Splash of Half and Half. Can subsitite root beer with a root beer flavored liqour', 2, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (80, 1, 'Dirty Shirley', 'Splash of Grenadine (pomegranate syrup).', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (81, 1, 'Electric Lemonade', 'Splash of Sour and Sprite for a classic Harry\'s style drink.', 6, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (82, 1, 'Fuzzy Navel', 'Twist on fizzy navel by making it Harry\'s style with vodka.', 3, 1, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (83, 1, 'Gin Lemonade', 'Equal parts gin and lemonade.', 2, 1, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (84, 1, 'Grasshopper', 'Lots of ice. Lots of cream. Light on the half and half.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (85, 1, 'Mai Tai', 'Mix them all together, light on the grenadine.', 6, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (86, 1, 'Sex on the Beach', 'Light on the brandy and grenadine.', 6, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (87, 1, 'Stinger, Tia Maria', 'Lots of ice and cream.', 2, 1, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (88, 1, 'Vodka Collins', 'Easy to make drink, nothing fancy here!', 2, 1, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (89, 1, 'Vodka Press', 'Easy to make drink, nothing fancy here!', 2, 1, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (90, 1, 'Vodka Lemonade', 'Put 2 shots vodka in a cup and fill with lemonade. Best enjoyed cold.', 2, 1, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (91, 1, 'Watermelon Margarita', 'Blend watermelon into juice. Add lime juice to water melon. Add two shots tequila. Line glass glass with sea salt and your done.', 4, 1, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (92, 1, 'Grapefruit Mimosa', 'Line rims of cups with sugar, add 1/2 cup grapefruit juice. Then fill cup with champagne', 3, 1, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (93, 1, 'Pear Mimosa', 'Add 3/4 cup of pear juice to a cup. Then top with champagne.', 2, 1, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (94, 1, 'Cherry Bomb Mimosa', 'Add 1 cup of pineapple juice, and 1/4 cup of cherry juice. Top with champagne.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (95, 1, 'Sidecar', 'Shake 2 oz Cognac, 1 oz. Cointreau, and 3/4 oz lemon juice with ice and strain into a chilled glass.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (96, 1, 'Oaxaca Mule', 'Place ice cubes in a copper mug or highball glass. Add 1.5 oz mezcal and .5 oz lime juice, then top with 2 oz ginger beer.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (97, 1, 'Bob Roy', 'Combine 2.5 oz spiced rum, .5 oz sweet vermouth, and 2 dashes of orange bitters in a mixing glass with ice and stir to chill. Strain into a chilled glass and garnish with cherry.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (98, 1, 'Bee\'s Knees', 'Combine 1.5 oz gin, 1 tsp honey, and 1 tsp lemon juice in a shaker. Shake, strain into a chilled glass and garnish.', 3, 3, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (99, 1, 'Cognac Stinger', 'Shake 2 oz Cognac, 1 oz. crème de menthe, and 2 dashes sparkling water well and strain into a chilled glass.', 3, 2, 0, 0);
INSERT INTO recipe(recipe_id, user_recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating)
VALUES (100, 1, 'Gibson Cocktail', 'Stir 2 ½ oz. gin and 1 oz. dry vermouth with ice to chill, then strain into a chilled cocktail glass. Garnish with the pickled pearl onion.', 2, 2, 0, 0);

INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (37, 2);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (85, 6);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (86, 7);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (99, 10);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (19, 14);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (43, 16);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (2, 29);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (10, 29);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (21, 29);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (22, 29);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (32, 29);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (37, 29);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (42, 29);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (62, 29);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (76, 29);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (81, 29);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (83, 29);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (98, 29);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (100, 29);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (75, 37);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (60, 41);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (5, 43);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (6, 43);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (3, 50);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (1, 52);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (53, 53);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (58, 53);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (54, 63);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (24, 71);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (30, 75);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (73, 81);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (74, 81);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (7, 84);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (23, 84);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (4, 88);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (76, 88);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (81, 88);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (85, 88);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (97, 92);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (16, 93);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (39, 94);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (40, 94);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (46, 94);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (48, 94);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (49, 94);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (50, 94);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (51, 94);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (52, 94);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (71, 101);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (72, 101);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (12, 102);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (18, 117);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (47, 117);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (31, 132);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (36, 132);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (55, 132);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (56, 132);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (57, 132);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (59, 132);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (61, 132);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (75, 139);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (76, 139);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (57, 144);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (59, 144);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (33, 149);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (35, 149);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (36, 149);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (42, 149);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (68, 149);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (71, 153);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (34, 162);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (96, 177);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (25, 179);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (64, 179);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (65, 179);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (66, 179);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (67, 179);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (68, 179);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (69, 179);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (70, 179);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (85, 179);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (91, 179);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (72, 183);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (15, 186);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (72, 238);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (8, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (9, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (11, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (13, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (14, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (20, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (26, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (27, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (29, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (38, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (44, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (45, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (47, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (74, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (76, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (77, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (78, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (79, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (80, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (81, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (82, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (86, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (88, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (89, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (90, 245);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (78, 251);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (8, 252);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (9, 252);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (17, 252);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (23, 252);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (25, 252);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (87, 253);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (84, 259);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (84, 263);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (87, 263);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (99, 263);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (73, 279);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (74, 279);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (81, 279);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (37, 291);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (38, 291);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (58, 301);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (15, 316);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (76, 316);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (46, 339);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (75, 339);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (76, 339);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (86, 339);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (11, 358);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (41, 360);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (92, 360);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (93, 360);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (94, 360);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (95, 360);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (37, 365);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (28, 373);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (60, 374);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (60, 377);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (100, 377);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (54, 385);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (55, 385);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (35, 388);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (36, 388);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (68, 388);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (42, 389);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (53, 389);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (97, 389);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (63, 400);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (78, 439);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (84, 439);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (54, 440);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (55, 440);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (56, 440);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (59, 444);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (61, 444);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (97, 444);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (53, 446);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (75, 450);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (76, 450);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (81, 450);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (88, 450);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (21, 451);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (43, 451);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (72, 462);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (52, 463);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (27, 465);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (38, 465);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (44, 465);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (45, 465);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (47, 465);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (79, 465);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (21, 468);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (37, 468);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (43, 468);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (64, 468);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (67, 468);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (98, 468);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (20, 469);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (38, 469);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (39, 469);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (40, 469);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (43, 469);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (46, 469);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (62, 469);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (65, 469);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (66, 469);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (70, 469);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (91, 469);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (96, 469);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (94, 472);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (95, 472);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (27, 475);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (33, 475);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (41, 475);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (44, 475);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (45, 475);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (47, 475);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (63, 475);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (82, 475);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (85, 475);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (86, 475);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (93, 480);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (45, 482);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (73, 482);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (74, 482);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (85, 482);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (94, 482);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (95, 482);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (29, 483);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (44, 483);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (51, 483);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (92, 483);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (49, 485);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (10, 487);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (15, 487);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (48, 488);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (77, 490);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (21, 505);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (56, 505);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (64, 505);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (67, 505);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (70, 505);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (3, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (4, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (5, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (7, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (11, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (12, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (14, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (16, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (17, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (18, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (19, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (20, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (22, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (23, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (24, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (25, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (28, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (39, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (40, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (46, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (48, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (49, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (50, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (51, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (52, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (76, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (78, 506);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (6, 515);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (31, 515);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (34, 515);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (26, 516);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (30, 516);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (96, 516);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (32, 523);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (83, 523);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (90, 523);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (1, 540);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (35, 540);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (89, 540);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (99, 541);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (75, 542);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (80, 542);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (81, 542);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (2, 545);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (66, 548);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (50, 569);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (76, 571);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (80, 571);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (85, 571);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (86, 571);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (62, 596);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (19, 600);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (21, 600);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (57, 600);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (2, 602);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (3, 602);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (4, 602);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (5, 602);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (6, 602);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (7, 602);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (10, 602);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (13, 602);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (20, 602);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (26, 602);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (53, 605);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (82, 610);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (86, 610);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (91, 619);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (57, 624);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (77, 632);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (65, 635);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (25, 648);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (9, 652);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (43, 654);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (98, 664);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (66, 673);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (17, 675);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (25, 675);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (1, 678);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (70, 678);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (15, 691);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (69, 691);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (91, 691);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (1, 697);
INSERT INTO recipe_has_brand(recipe_recipe_id, brand_brand_id)
VALUES (92, 697);

INSERT INTO user_has_badges(user_id, badge_id)
VALUES (1, 1);
INSERT INTO user_has_badges(user_id, badge_id)
VALUES (1, 3);
INSERT INTO user_has_badges(user_id, badge_id)
VALUES (1, 5);
INSERT INTO user_has_badges(user_id, badge_id)
VALUES (1, 7);
INSERT INTO user_has_badges(user_id, badge_id)
VALUES (1, 9);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
