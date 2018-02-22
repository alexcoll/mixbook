package com.mixbook.springmvc.Services;

import java.util.List;

import javax.persistence.PersistenceException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.BadgeDao;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Badge;
import com.mixbook.springmvc.Models.User;

@Service("badgeService")
@Transactional
public class BadgeServiceImpl implements BadgeService {

	@Autowired
	private BadgeDao dao;
	
	private static final Logger logger = LogManager.getLogger(BadgeServiceImpl.class);

	@Override
	public List<Badge> getAllBadges() throws UnknownServerErrorException {
		try {
			return dao.getAllBadges();
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	@Override
	public void checkForNewBadges(User user) throws UnknownServerErrorException {
		try {
			User tempUser = dao.checkForNewBadges(user);
			determineBadgesToAdd(tempUser);
		} catch (PersistenceException e) {
			logger.error("There was an error", e);
		} catch (Exception e) {
			logger.error("There was an error", e);
		}
	}
	
	private void determineBadgesToAdd(User user) throws PersistenceException, Exception {
		try {
			determineRecipeBadgesToAdd(user);
			determineReviewBadgesToAdd(user);
			dao.assignNewBadges(user);
		} catch (PersistenceException e) {
			throw new PersistenceException(e);
		} catch (Exception e) {
			throw new Exception(e);
		}
	}
	
	private void determineRecipeBadgesToAdd(User user) throws Exception {
		int numberOfRecipes = user.getNumber_of_recipes();
		Badge createdFirstRecipe = new Badge(1, "Created First Recipe", "The user has created their first recipe!");
		Badge bronzeRecipeCreation = new Badge(3, "Bronze Recipe Creation", "The user has created 5 total recipes!");
		Badge silverRecipeCreation = new Badge(5, "Silver Recipe Creation", "The user has created 25 total recipes!");
		Badge goldRecipeCreation = new Badge(7, "Gold Recipe Creation", "The user has created 50 total recipes!");
		Badge platinumRecipeCreation = new Badge(9, "Platinum Recipe Creation", "The user has created 100 total recipes!");
		Badge diamondRecipeCreation = new Badge(11, "Diamond Recipe Creation", "The user has created 250 total recipes!");
		Badge centurionRecipeCreation = new Badge(13, "Centurion Recipe Creation", "The user has created 500 total recipes!");
		Badge mixologistRecipeCreation = new Badge(15, "Mixologist Recipe Creation", "The user has created 1000 total recipes!");
		if (numberOfRecipes >= 1000) {
			user.getBadges().add(mixologistRecipeCreation);
		} else if (numberOfRecipes >= 500) {
			user.getBadges().add(centurionRecipeCreation);
		} else if (numberOfRecipes >= 250) {
			user.getBadges().add(diamondRecipeCreation);
		} else if (numberOfRecipes >= 100) {
			user.getBadges().add(platinumRecipeCreation);
		} else if (numberOfRecipes >= 50) {
			user.getBadges().add(goldRecipeCreation);
		} else if (numberOfRecipes >= 25) {
			user.getBadges().add(silverRecipeCreation);
		} else if (numberOfRecipes >= 5) {
			user.getBadges().add(bronzeRecipeCreation);
		} else if (numberOfRecipes >= 1) {
			user.getBadges().add(createdFirstRecipe);
		}
	}
	
	private void determineReviewBadgesToAdd(User user) throws Exception {
		int numberOfRatings = user.getNumber_of_ratings();
		Badge createdFirstReview = new Badge(2, "Created First Review", "The user has reviewed their first recipe!");
		Badge bronzeReviewCreation = new Badge(4, "Bronze Review Creation", "The user has reviewed 5 total recipes!");
		Badge silverReviewCreation = new Badge(6, "Silver Review Creation", "The user has reviewed 25 total recipes!");
		Badge goldReviewCreation = new Badge(8, "Gold Review Creation", "The user has reviewed 50 total recipes!");
		Badge platinumReviewCreation = new Badge(10, "Platinum Review Creation", "The user has reviewed 100 total recipes!");
		Badge diamondReviewCreation = new Badge(12, "Diamond Review Creation", "The user has reviewed 250 total recipes!");
		Badge centurionReviewCreation = new Badge(14, "Centurion Review Creation", "The user has reviewed 500 total recipes!");
		Badge mixologistReviewCreation = new Badge(16, "Mixologist Review Creation", "The user has reviewed 1000 total recipes!");
		if (numberOfRatings >= 1000) {
			user.getBadges().add(mixologistReviewCreation);
		} else if (numberOfRatings >= 500) {
			user.getBadges().add(centurionReviewCreation);
		} else if (numberOfRatings >= 250) {
			user.getBadges().add(diamondReviewCreation);
		} else if (numberOfRatings >= 100) {
			user.getBadges().add(platinumReviewCreation);
		} else if (numberOfRatings >= 50) {
			user.getBadges().add(goldReviewCreation);
		} else if (numberOfRatings >= 25) {
			user.getBadges().add(silverReviewCreation);
		} else if (numberOfRatings >= 5) {
			user.getBadges().add(bronzeReviewCreation);
		} else if (numberOfRatings >= 1) {
			user.getBadges().add(createdFirstReview);
		}
	}

}
