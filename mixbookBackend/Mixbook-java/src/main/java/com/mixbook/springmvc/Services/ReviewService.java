package com.mixbook.springmvc.Services;

import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Exceptions.RateOwnReviewException;
import com.mixbook.springmvc.Exceptions.ReviewOwnRecipeException;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Models.UserRatingReview;
import com.mixbook.springmvc.Models.UserRecipeHasReview;

/**
 * Interface to provide modular service layer functionality for review related tasks for the controller layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface ReviewService {

	/**
	 * Creates a review.
	 * @param review the review to create.
	 * @throws ReviewOwnRecipeException the exception is thrown when a user tries to review their own recipe.
	 * @throws PersistenceException the exception is thrown when a user tries to leave a duplicate review.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to leave a review on a nonexistent recipe.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void createReview(UserRecipeHasReview review) throws ReviewOwnRecipeException, PersistenceException, NoDataWasChangedException, UnknownServerErrorException;

	/**
	 * Edits a review.
	 * @param review the review to edit.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to edit a nonexistent review.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void editReview(UserRecipeHasReview review) throws NoDataWasChangedException, UnknownServerErrorException;

	/**
	 * Deletes a review.
	 * @param review the review to delete.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to delete a nonexistent review.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void deleteReview(UserRecipeHasReview review) throws NoDataWasChangedException, UnknownServerErrorException;

	/**
	 * Up votes a review.
	 * @param rating the rating to leave on a review.
	 * @throws RateOwnReviewException the exception is thrown when a user tries to rate their own review.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void upVoteReview(UserRatingReview rating) throws RateOwnReviewException, UnknownServerErrorException;

	/**
	 * Down votes a review.
	 * @param rating the rating to leave on a review.
	 * @throws RateOwnReviewException the exception is thrown when a user tries to rate their own review.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void downVoteReview(UserRatingReview rating) throws RateOwnReviewException, UnknownServerErrorException;

	/**
	 * Loads a list of reviews made by a user.
	 * @param user the user for whom to load their reviews.
	 * @return a list of reviews made by a user.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	List<UserRecipeHasReview> viewAllReviewsByUser(User user) throws UnknownServerErrorException;

	/**
	 * Loads a list of reviews for a recipe.
	 * @param recipe the recipe for which to load reviews.
	 * @return a list of reviews for a recipe.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	List<UserRecipeHasReview> loadReviewsForRecipe(Recipe recipe) throws UnknownServerErrorException;

	/**
	 * Determines if a review's information is valid.
	 * @param review the review to validate.
	 * @return true if a review's information is valid, or false if any one piece of information is invalid.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	boolean isReviewInfoValid(UserRecipeHasReview review) throws UnknownServerErrorException;

	/**
	 * Determines if a review's commentary is valid.
	 * @param reviewCommentary the review's commentary to validate.
	 * @return true if a review's commentary is valid, or false if it is not valid.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	boolean isReviewCommentaryValid(String reviewCommentary) throws UnknownServerErrorException;

	/**
	 * Determines if a review's rating is valid.
	 * @param rating the review's rating to validate.
	 * @return true if a review's rating is valid, or false if it is not valid.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	boolean isReviewRatingValid(int rating) throws UnknownServerErrorException;

}
