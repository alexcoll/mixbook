package com.mixbook.springmvc.Services;

import java.util.Set;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Recommendation;
import com.mixbook.springmvc.Models.User;

public interface RecommendationService {

	/**
	 * Recommends a recipe to another user.
	 * @param recommendation the recommendation to make.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void recommendRecipe(Recommendation recommendation) throws UnknownServerErrorException;

	/**
	 * Deletes a recommendation that a user has received.
	 * @param recommendation the recommendation to delete.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void deleteRecommendation(Recommendation recommendation) throws UnknownServerErrorException;

	/**
	 * Loads a list of recommendations that a user has received.
	 * @param user the user for whom to load the recommendations.
	 * @return a list of recommendations that a user has received.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	Set<Recommendation> loadRecommendations(User user) throws UnknownServerErrorException;

}
