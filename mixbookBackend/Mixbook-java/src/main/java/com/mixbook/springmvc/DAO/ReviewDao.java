package com.mixbook.springmvc.DAO;

import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Exceptions.RateOwnReviewException;
import com.mixbook.springmvc.Exceptions.ReviewOwnRecipeException;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Models.UserRatingReview;
import com.mixbook.springmvc.Models.UserRecipeHasReview;

/**
 * Interface to provide modular data layer functionality for review related tasks for the service layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface ReviewDao {

	/**
	 * Creates a review.
	 * @param review the review to create.
	 * @throws ReviewOwnRecipeException the exception is thrown when a user tries to review their own recipe.
	 * @throws PersistenceException the exception is thrown when a user tries to leave a duplicate review.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to leave a review on a nonexistent recipe.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void createReview(UserRecipeHasReview review) throws ReviewOwnRecipeException, PersistenceException, NoDataWasChangedException, Exception;

	/**
	 * Edits a review.
	 * @param review the review to edit.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to edit a nonexistent review.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void editReview(UserRecipeHasReview review) throws NoDataWasChangedException, Exception;

	/**
	 * Deletes a review.
	 * @param review the review to delete.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to delete a nonexistent review.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void deleteReview(UserRecipeHasReview review) throws NoDataWasChangedException, Exception;

	/**
	 * Up votes a review.
	 * @param rating the rating to leave on a review.
	 * @throws RateOwnReviewException the exception is thrown when a user tries to rate their own review.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void upVoteReview(UserRatingReview rating) throws RateOwnReviewException, Exception;

	/**
	 * Down votes a review.
	 * @param rating the rating to leave on a review.
	 * @throws RateOwnReviewException the exception is thrown when a user tries to rate their own review.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void downVoteReview(UserRatingReview rating) throws RateOwnReviewException, Exception;

	/**
	 * Loads a list of reviews made by a user.
	 * @param user the user for whom to load their reviews.
	 * @return a list of reviews made by a user.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	List<UserRecipeHasReview> viewAllReviewsByUser(User user) throws Exception;

	/**
	 * Loads a list of reviews for a recipe.
	 * @param recipe the recipe for which to load reviews.
	 * @return a list of reviews for a recipe.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	List<UserRecipeHasReview> loadReviewsForRecipe(Recipe recipe) throws Exception;

}
