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
-- Table `mixbookdb`.`type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mixbookdb`.`type` (
  `type_id` BIGINT NOT NULL AUTO_INCREMENT,
  `type_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`type_id`),
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
VALUES (51, 7, 'Jim Bim');
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
VALUES (143, 11, 'Whiskey');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
