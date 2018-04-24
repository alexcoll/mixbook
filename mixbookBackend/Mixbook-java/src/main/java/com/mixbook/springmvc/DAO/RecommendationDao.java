package com.mixbook.springmvc.DAO;

import java.util.Set;

import com.mixbook.springmvc.Models.Recommendation;
import com.mixbook.springmvc.Models.User;

/**
 * Interface to provide modular data layer functionality for recommendation related tasks for the service layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface RecommendationDao {

	/**
	 * Recommends a recipe to another user.
	 * @param recommendation the recommendation to make.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void recommendRecipe(Recommendation recommendation) throws Exception;

	/**
	 * Deletes a recommendation that a user has received.
	 * @param recommendation the recommendation to delete.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void deleteRecommendation(Recommendation recommendation) throws Exception;

	/**
	 * Loads a list of recommendations that a user has received.
	 * @param user the user for whom to load the recommendations.
	 * @return a list of recommendations that a user has received.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	Set<Recommendation> loadRecommendations(User user) throws Exception;

}
