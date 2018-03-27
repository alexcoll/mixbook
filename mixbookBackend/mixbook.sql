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
VALUES (252, 16, 'Kahlua');
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
VALUES (321, 18, 'After Shock');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (322, 18, 'After Shock (Blue)');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (323, 18, 'After Shock (Black)');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (324, 18, 'After Shock (Green)');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (325, 18, 'After Shock (Red)');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (326, 18, 'After Shock (Silver)');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (327, 18, 'Amaro Averna');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (328, 18, 'Amaro Montenegro');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (329, 18, 'Amer Picon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (330, 18, 'Anisette');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (331, 18, 'Cinnamon Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (332, 18, 'Fernet Branca Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (333, 18, 'Jans Herbal Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (334, 18, 'Kummel');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (335, 18, 'Mint Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (336, 18, 'Peppermint Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (337, 18, 'St. Germain Elderflower Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (338, 18, 'Strega Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (339, 19, 'Amaretto');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (340, 19, 'Chestnut Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (341, 19, 'Disaronno Amaretto');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (342, 19, 'Frangelico');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (343, 19, 'Walnut Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (344, 20, 'Advocaat');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (345, 20, 'Cola Stiffies');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (346, 20, 'Cynar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (347, 20, 'Dooleys');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (348, 20, 'Elderflower Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (349, 20, "Fulton's Harvest Pumpkin Pie Liqueur");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (350, 20, 'Ginger Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (351, 20, 'Honey Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (352, 20, 'Natural Yoghurt Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (353, 20, 'Parfait Amour');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (354, 20, 'Tiramisu Liqueur');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (355, 21, 'Baileys');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (356, 21, 'Baileys Glide');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (357, 21, 'Baileys Chocolate Mint');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (358, 21, 'Baileys Irish Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (359, 22, 'Cava');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (360, 22, 'Champagne');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (361, 22, 'Pink Champagne');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (362, 23, 'Cherry Lambrini');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (363, 23, 'Dubonnet');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (364, 23, 'Ginger Wine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (365, 23, 'Lillet Blanc');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (366, 23, 'Rose Wine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (367, 23, 'Stones Ginger Wine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (368, 24, 'Muscat Wine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (369, 24, 'Port');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (370, 24, 'Red Port');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (371, 24, 'Ruby Port');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (372, 25, 'Madeira');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (373, 25, 'Red Wine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (374, 26, 'Sherry Dry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (375, 26, 'Sherry Sweet');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (376, 27, 'Cocchi Di Torino');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (377, 27, 'Dry Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (378, 27, 'Dubonnet Rouge');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (379, 27, 'French Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (380, 27, 'Martini');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (381, 27, 'Martini Bianco Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (382, 27, 'Martini Dry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (383, 27, 'Martini Gold');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (384, 27, 'Martini Rosso');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (385, 27, 'Martini Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (386, 27, 'Noily Prat');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (387, 27, 'Red Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (388, 27, 'Sweet Red Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (389, 27, 'Sweet Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (390, 27, 'Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (391, 27, 'White Vermouth');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (392, 28, 'Chardonnay');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (393, 28, 'Dry White Wine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (394, 28, 'Prosecco');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (395, 28, 'Sparkling White Wine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (396, 28, 'White Whine');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (397, 29, 'Beer');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (398, 29, "Coor's Light");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (399, 29, 'Guiness');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (400, 29, 'Lager');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (401, 29, 'Lemongrass and Chili Beer');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (402, 29, 'Light Beer');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (403, 29, 'Newcastle Brown Ale');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (404, 29, 'Saison Beer');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (405, 29, 'Special Brew');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (406, 29, 'Stout');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (407, 29, 'Tennants Beer');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (408, 30, 'Apple Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (409, 30, 'Babycham');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (410, 30, 'Bulmers Pear Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (411, 30, 'Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (412, 30, 'Dry Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (413, 30, "Frosty Jack's White Cider");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (414, 30, 'Magners Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (415, 30, 'Pear Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (416, 30, 'Strongbow Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (417, 30, 'White Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (418, 31, 'Half and Half');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (419, 31, 'Lemon Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (420, 31, 'Lime Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (421, 31, 'Lime Margarita Mix');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (422, 31, 'Margarita Mix');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (423, 31, 'Orange Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (424, 31, 'Peach Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (425, 31, "Peychaud's Aromatic Bitters");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (426, 31, 'Piña Colada Mix');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (427, 31, 'Plum Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (428, 31, 'Rhubarb Bitters');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (429, 31, 'Sour Mix');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (430, 31, 'Sugar Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (431, 31, "Velvet Falernum");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (432, 31, 'Yohimbe Extract');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (433, 32, 'Apple and Blackcurrant Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (434, 32, 'Apple and Mango Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (435, 32, 'Apple Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (436, 32, 'Apricot Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (437, 32, 'Banana Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (438, 32, 'Beetroot Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (439, 32, 'Blackcurrant Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (440, 32, 'Blueberry Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (441, 32, 'Carrot Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (442, 32, 'Cherry Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (443, 32, 'Clementine Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (444, 32, 'Cranberry Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (445, 32, 'Grape Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (446, 32, 'Guava Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (447, 32, 'Lemon Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (448, 32, 'Lime Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (449, 32, 'Lychee Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (450, 32, 'Mango Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (451, 32, 'Maraschino Cherry Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (452, 32, "Mike's Hard Berry");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (453, 32, 'Olive Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (454, 32, 'Orange Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (455, 32, 'Papaya Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (456, 32, 'Passionfruit Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (457, 32, 'Peach Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (458, 32, 'Peach Nectar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (459, 32, 'Pear Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (460, 32, 'Pear Nectar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (461, 32, 'Pineapple Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (462, 32, 'Pink Grapefruit');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (463, 32, 'Pomegranate Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (464, 32, "Raspberry Juice");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (465, 32, 'Red Grape Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (466, 32, "Rose's Lime Juice");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (467, 32, 'Strawberry Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (468, 32, 'Tangerine Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (469, 32, 'Tomato Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (470, 32, 'Tropical Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (471, 32, 'Ugli Fruit Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (472, 32, 'Watermelon Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (473, 32, 'Wheatgrass Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (474, 32, 'White Cranberry and Apple Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (475, 32, 'White Cranberry Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (476, 32, 'White Grape Juice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (477, 33, '7Up');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (478, 33, 'Arizona Iced Tea');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (479, 33, 'Bitter Lemon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (480, 33, 'Blackcurrant Cordial');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (481, 33, 'Canada Dry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (482, 33, 'Cherryade');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (483, 33, 'Clamato');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (484, 33, 'Club Soda');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (485, 33, 'Coke');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (486, 33, 'Cream Soda');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (487, 33, 'Diet Coke');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (488, 33, 'Dr. Pepper');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (489, 33, 'Elderflower Cordial');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (490, 33, 'Energy Drink');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (491, 33, 'Fanta Fruit Twist');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (492, 33, "Fentiman's Victorian Rose Lemonada Soda");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (493, 33, 'Fizzy Orange Drink');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (494, 33, 'Ginger Ale');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (495, 33, 'Ginger Beer');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (496, 33, 'Grape Sodapop');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (497, 33, 'Ice Tea');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (498, 33, 'Irn Bru');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (499, 33, 'Lemon Cordial');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (500, 33, 'Lemon Lime Soda');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (501, 33, "Lemon Squash");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (502, 33, 'Lemonade');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (503, 33, 'Lime Coke');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (504, 33, 'Lime Cordial');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (505, 33, 'Limeade');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (506, 33, 'Lucozade');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (507, 33, 'Mountain Dew');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (508, 33, 'Non-alcoholic Apple Cider');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (509, 33, "Orange + Cranberry J20");
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (510, 33, 'Orange Blossom Water');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (511, 33, 'Pink Lemonade');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (512, 33, 'Powerade');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (513, 33, 'Raspberry Cordial');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (514, 33, 'Red Bull');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (515, 33, 'Ribena');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (516, 33, 'Rootbeer');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (517, 33, 'Rose Water');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (518, 33, 'Schweppes Bitter Lemon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (519, 33, 'Soda Water');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (520, 33, 'Sparkling Water');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (521, 33, 'Sprite');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (522, 33, 'Strawberry Milkshake');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (523, 33, 'Tizer');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (524, 33, 'Tonic Water');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (525, 33, 'Vanilla Coke');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (526, 33, 'Vimto');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (527, 34, 'Agave Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (528, 34, 'Caramel Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (529, 34, 'Cardamom Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (530, 34, 'Cherry Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (531, 34, 'Chocolate Chip Cookie Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (532, 34, 'Chocolate Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (533, 34, 'Cinnamon Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (534, 34, 'Citrus Agave');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (535, 34, 'Coconut Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (536, 34, 'Coconut Water Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (537, 34, 'Elderflower Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (538, 34, 'Falernum');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (539, 34, 'Ginger Bread Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (540, 34, 'Ginger Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (541, 34, 'Honey Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (542, 34, 'Lavender Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (543, 34, 'Lemon Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (544, 34, 'Maple Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (545, 34, 'Mint Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (546, 34, 'Orange Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (547, 34, 'Orgeat Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (548, 34, 'Passionfruit');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (549, 34, 'Pisachio Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (550, 34, 'Pomegranate Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (551, 34, 'Raspberry Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (552, 34, 'Rose Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (553, 34, 'Rosemary Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (554, 34, 'Spiced Pumpkin Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (555, 34, 'Strawberry Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (556, 34, 'Vanilla Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (557, 34, 'Violet Syrup');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (558, 35, 'Bacardi Breezer Orange');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (559, 35, 'Bacardi Breezer Watermelon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (560, 35, 'Orange Reef');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (561, 35, 'Smirnoff Ice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (562, 35, 'Smirnoff Ice (Black)');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (563, 35, 'Smirnoff Ice Raspberry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (564, 35, 'WKD');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (565, 35, 'WKD Blue');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (566, 35, 'WKD Clear');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (567, 35, 'WKD Original');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (568, 35, 'WKD Red');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (569, 36, 'Apple');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (570, 36, 'Banana');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (571, 36, 'Blackberries');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (572, 36, 'Blueberries');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (573, 36, 'Cherry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (574, 36, 'Coconut');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (575, 36, 'Cucumber');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (576, 36, 'Frozen Peaches');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (577, 36, 'Green Olives');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (578, 36, 'Kiwi');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (579, 36, 'Lemon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (580, 36, 'Lemon Balm');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (581, 36, 'Lime');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (582, 36, 'Mango');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (583, 36, 'Mango Puree');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (584, 36, 'Maraschino Cherry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (585, 36, 'Melon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (586, 36, 'Olives');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (587, 36, 'Orange');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (588, 36, 'Passionfruit Puree');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (589, 36, 'Peach');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (590, 36, 'Peach Puree');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (591, 36, 'Pear');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (592, 36, 'Pineapple');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (593, 36, 'Pomegranate');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (594, 36, 'Raspberry');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (595, 36, 'Raspberry Puree');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (596, 36, 'Strawberry Puree');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (597, 36, 'Tomatoes');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (598, 36, 'Watermelon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (599, 37, 'Allspice');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (600, 37, 'Almond Extract');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (601, 37, 'Almond Milk');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (602, 37, 'Apricot Jam');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (603, 37, 'Basil Leaves');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (604, 37, 'Black Tea');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (605, 37, 'Brown Sugar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (606, 37, 'Brown Toast');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (607, 37, 'Butter');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (608, 37, 'Camomile Tea');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (609, 37, 'Cardamom');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (610, 37, 'Cardamom Pods');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (611, 37, 'Cayenne Pepper');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (612, 37, 'Celery');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (613, 37, 'Celery Salt');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (614, 37, 'Chili Peppers');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (615, 37, 'Chocolate');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (616, 37, 'Chocolate Ice Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (617, 37, 'Chocolate Milk');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (618, 37, 'Chocolate Sauce');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (619, 37, 'Cinnamon');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (620, 37, 'Cloves');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (621, 37, 'Cocoa Powder');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (622, 37, 'Coconut Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (623, 37, 'Coconut Milk');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (624, 37, 'Coffee');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (625, 37, 'Coffee Beans');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (626, 37, 'Coffee Ice Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (627, 37, 'Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (628, 37, 'Dark Chocolate Powder');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (629, 37, 'Demerara Sugar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (630, 37, 'Desiccated Coconut');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (631, 37, 'Double Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (632, 37, 'Earl Grey Tea');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (633, 37, 'Egg White');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (634, 37, 'Egg Yolk');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (635, 37, 'Eggnog');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (636, 37, 'Espresso Coffee');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (637, 37, 'Friji Chocolate Milkshake');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (638, 37, 'Ginger');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (639, 37, 'Gingerbread');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (640, 37, 'Green Food Colouring');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (641, 37, 'Green Tea');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (642, 37, 'Ground Coffee Beans');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (643, 37, 'Honey');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (644, 37, 'Hot Chocolate');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (645, 37, 'Icing Sugar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (646, 37, 'Jasmine Tea');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (647, 37, 'Jelly');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (648, 37, 'Lemon Ice Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (649, 37, 'Lemon Sorbet');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (650, 37, 'Lime Popsicle');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (651, 37, 'Mango Sorbet');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (652, 37, 'Marmalade');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (653, 37, 'Mascarpone');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (654, 37, 'Milk');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (655, 37, 'Milk Chocolate Powder');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (656, 37, 'Mincemeat');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (657, 37, 'Mint Leaves');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (658, 37, 'Natural Yoghurt');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (659, 37, 'Nutella');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (660, 37, 'Nutmeg');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (661, 37, 'Onion');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (662, 37, 'Oreo Cookie');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (663, 37, 'Pepper');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (664, 37, 'Peppermint');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (665, 37, 'Pink Peppercorn');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (666, 37, 'Popcorn');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (667, 37, 'Pumpkin Puree');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (668, 37, 'Rosemary');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (669, 37, 'Rum and Raisin Ice Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (670, 37, 'Salt');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (671, 37, 'Single Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (672, 37, 'Skittles');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (673, 37, 'Soy Sauce');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (674, 37, 'Steamed Milk');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (675, 37, 'Strawberry Vanilla Ice Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (676, 37, 'Sugar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (677, 37, 'Sweetened Condensed Milk');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (678, 37, 'Tabasco Sauce');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (679, 37, 'Vanilla Essence');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (680, 37, 'Vanilla Ice Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (681, 37, 'Vanilla Pod');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (682, 37, 'Wasabi');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (683, 37, 'Whipped Cream');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (684, 37, 'White Balsamic Vinegar');
INSERT INTO brand(brand_id, style_brand_id, brand_name)
VALUES (685, 37, 'Worcestershire Sauce');


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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
