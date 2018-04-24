package com.mixbook.springmvc.DAO;

import java.math.BigInteger;
import java.util.List;

import javax.persistence.PersistenceException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.hibernate.query.NativeQuery;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Exceptions.RateOwnReviewException;
import com.mixbook.springmvc.Exceptions.ReviewOwnRecipeException;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Models.UserRatingReview;
import com.mixbook.springmvc.Models.UserRecipeHasReview;
import com.mixbook.springmvc.Services.UserService;

/**
 * Provides the concrete implementation of the modular data layer functionality for review related tasks for the service layer.
 * @author John Tyler Preston
 * @version 1.0
 */
@Repository("reviewDao")
public class ReviewDaoImpl extends AbstractDao<Integer, UserRecipeHasReview> implements ReviewDao {

	/**
	 * Provides ability to access user service layer functions.
	 */
	@Autowired
	UserService userService;

	/**
	 * Standard logger used to log the exceptions and do audit logging.
	 */
	private static final Logger logger = LogManager.getLogger(ReviewDaoImpl.class);

	@Override
	public void createReview(UserRecipeHasReview review) throws ReviewOwnRecipeException, PersistenceException, NoDataWasChangedException, Exception {
		User user = this.userService.findByEntityUsername(review.getUser().getUsername());
		NativeQuery query = getSession().createNativeQuery("SELECT COUNT(*) FROM recipe WHERE recipe_id = :recipe_id AND user_recipe_id != :user_recipe_id");
		query.setParameter("recipe_id", review.getRecipe().getRecipeId());
		query.setParameter("user_recipe_id", user.getUserId());
		Object countObj = query.getResultList().get(0);
		int count = ((Number) countObj).intValue();
		if (count < 1) {
			throw new ReviewOwnRecipeException("Attempted to review own recipe or recipe does not exist!");
		}
		NativeQuery insertQuery = getSession().createNativeQuery("INSERT INTO users_recipe_has_review (users_user_id, recipe_recipe_id, review_commentary, rating, number_of_up_votes, number_of_down_votes) VALUES (:users_user_id, :recipe_recipe_id, :review_commentary, :rating, 0, 0)");
		insertQuery.setParameter("users_user_id", user.getUserId());
		insertQuery.setParameter("recipe_recipe_id", review.getRecipe().getRecipeId());
		insertQuery.setParameter("review_commentary", review.getReviewCommentary());
		insertQuery.setParameter("rating", review.getRating());
		int numRowsAffected = insertQuery.executeUpdate();
		if (numRowsAffected > 0) {
			NativeQuery updateQuery = getSession().createNativeQuery("UPDATE recipe SET number_of_ratings = number_of_ratings + 1, total_rating = total_rating + :rating WHERE recipe_id = :recipe_id");
			updateQuery.setParameter("rating", review.getRating());
			updateQuery.setParameter("recipe_id", review.getRecipe().getRecipeId());
			updateQuery.executeUpdate();
			NativeQuery q = getSession().createNativeQuery("UPDATE users SET number_of_ratings = number_of_ratings + 1 WHERE user_id = :user_id");
			q.setParameter("user_id", user.getUserId());
			q.executeUpdate();
			q = getSession().createNativeQuery("SELECT user_recipe_id FROM recipe WHERE recipe_id = :recipe_id");
			q.setParameter("recipe_id", review.getRecipe().getRecipeId());
			Integer userId = ((BigInteger) q.getSingleResult()).intValue();
			q = getSession().createNativeQuery("UPDATE users SET sum_of_personal_recipe_ratings = sum_of_personal_recipe_ratings + :rating, number_of_personal_recipe_ratings = number_of_personal_recipe_ratings + 1 WHERE user_id = :user_id");
			q.setParameter("rating", review.getRating());
			q.setParameter("user_id", userId);
			q.executeUpdate();
		}
		else {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		}
	}

	@Override
	public void editReview(UserRecipeHasReview review) throws NoDataWasChangedException, Exception {
		User user = this.userService.findByEntityUsername(review.getUser().getUsername());
		//Updating both review commentary and review rating
		if (review.getReviewCommentary() != null && review.getRating() != 0) {
			NativeQuery lookupQuery = getSession().createNativeQuery("SELECT rating AS result FROM users_recipe_has_review WHERE users_user_id = :users_user_id AND recipe_recipe_id = :recipe_recipe_id");
			lookupQuery.setParameter("users_user_id", user.getUserId());
			lookupQuery.setParameter("recipe_recipe_id", review.getRecipe().getRecipeId());
			Integer tempNum = (Integer) lookupQuery.getSingleResult();
			int previousRating = tempNum.intValue();
			NativeQuery updateQuery = getSession().createNativeQuery("UPDATE users_recipe_has_review SET review_commentary = :review_commentary, rating = :rating WHERE users_user_id = :users_user_id AND recipe_recipe_id = :recipe_recipe_id");
			updateQuery.setParameter("review_commentary", review.getReviewCommentary());
			updateQuery.setParameter("rating", review.getRating());
			updateQuery.setParameter("users_user_id", user.getUserId());
			updateQuery.setParameter("recipe_recipe_id", review.getRecipe().getRecipeId());
			int numRowsAffected = updateQuery.executeUpdate();
			if (previousRating > review.getRating() && numRowsAffected > 0) {
				updateQuery = getSession().createNativeQuery("UPDATE recipe SET total_rating = total_rating - :rating WHERE recipe_id = :recipe_id");
				int resultantRating = previousRating - review.getRating();
				updateQuery.setParameter("rating", resultantRating);
				updateQuery.setParameter("recipe_id", review.getRecipe().getRecipeId());
				updateQuery.executeUpdate();
				NativeQuery q = getSession().createNativeQuery("SELECT user_recipe_id FROM recipe WHERE recipe_id = :recipe_id");
				q.setParameter("recipe_id", review.getRecipe().getRecipeId());
				Integer userId = ((BigInteger) q.getSingleResult()).intValue();
				q = getSession().createNativeQuery("UPDATE users SET sum_of_personal_recipe_ratings = sum_of_personal_recipe_ratings - :rating WHERE user_id = :user_id");
				q.setParameter("rating", resultantRating);
				q.setParameter("user_id", userId);
				q.executeUpdate();
			}
			else if (previousRating < review.getRating() && numRowsAffected > 0) {
				updateQuery = getSession().createNativeQuery("UPDATE recipe SET total_rating = total_rating + :rating WHERE recipe_id = :recipe_id");
				int resultantRating = review.getRating() - previousRating;
				updateQuery.setParameter("rating", resultantRating);
				updateQuery.setParameter("recipe_id", review.getRecipe().getRecipeId());
				updateQuery.executeUpdate();
				NativeQuery q = getSession().createNativeQuery("SELECT user_recipe_id FROM recipe WHERE recipe_id = :recipe_id");
				q.setParameter("recipe_id", review.getRecipe().getRecipeId());
				Integer userId = ((BigInteger) q.getSingleResult()).intValue();
				q = getSession().createNativeQuery("UPDATE users SET sum_of_personal_recipe_ratings = sum_of_personal_recipe_ratings + :rating WHERE user_id = :user_id");
				q.setParameter("rating", resultantRating);
				q.setParameter("user_id", userId);
				q.executeUpdate();
			}
			else if (numRowsAffected < 0) {
				throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
			}
		}
		//Updating review commentary
		else if (review.getReviewCommentary() != null) {
			NativeQuery updateQuery = getSession().createNativeQuery("UPDATE users_recipe_has_review SET review_commentary = :review_commentary WHERE users_user_id = :users_user_id AND recipe_recipe_id = :recipe_recipe_id");
			updateQuery.setParameter("review_commentary", review.getReviewCommentary());
			updateQuery.setParameter("users_user_id", user.getUserId());
			updateQuery.setParameter("recipe_recipe_id", review.getRecipe().getRecipeId());
			int numRowsAffected = updateQuery.executeUpdate();
			if (numRowsAffected < 0) {
				throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
			}
		}
		//Updating review rating
		else if (review.getRating() != 0) {
			NativeQuery lookupQuery = getSession().createNativeQuery("SELECT rating AS result FROM users_recipe_has_review WHERE users_user_id = :users_user_id AND recipe_recipe_id = :recipe_recipe_id");
			lookupQuery.setParameter("users_user_id", user.getUserId());
			lookupQuery.setParameter("recipe_recipe_id", review.getRecipe().getRecipeId());
			Integer tempNum = (Integer) lookupQuery.getSingleResult();
			int previousRating = tempNum.intValue();
			NativeQuery updateQuery = getSession().createSQLQuery("UPDATE users_recipe_has_review SET rating = :rating WHERE users_user_id = :users_user_id AND recipe_recipe_id = :recipe_recipe_id");
			updateQuery.setParameter("rating", review.getRating());
			updateQuery.setParameter("users_user_id", user.getUserId());
			updateQuery.setParameter("recipe_recipe_id", review.getRecipe().getRecipeId());
			int numRowsAffected = updateQuery.executeUpdate();
			if (previousRating > review.getRating() && numRowsAffected > 0) {
				updateQuery = getSession().createNativeQuery("UPDATE recipe SET total_rating = total_rating - :rating WHERE recipe_id = :recipe_id");
				int resultantRating = previousRating - review.getRating();
				updateQuery.setParameter("rating", resultantRating);
				updateQuery.setParameter("recipe_id", review.getRecipe().getRecipeId());
				updateQuery.executeUpdate();
				NativeQuery q = getSession().createNativeQuery("SELECT user_recipe_id FROM recipe WHERE recipe_id = :recipe_id");
				q.setParameter("recipe_id", review.getRecipe().getRecipeId());
				Integer userId = ((BigInteger) q.getSingleResult()).intValue();
				q = getSession().createNativeQuery("UPDATE users SET sum_of_personal_recipe_ratings = sum_of_personal_recipe_ratings - :rating WHERE user_id = :user_id");
				q.setParameter("rating", resultantRating);
				q.setParameter("user_id", userId);
				q.executeUpdate();
			}
			else if (previousRating < review.getRating() && numRowsAffected > 0) {
				updateQuery = getSession().createNativeQuery("UPDATE recipe SET total_rating = total_rating + :rating WHERE recipe_id = :recipe_id");
				int resultantRating = review.getRating() - previousRating;
				updateQuery.setParameter("rating", resultantRating);
				updateQuery.setParameter("recipe_id", review.getRecipe().getRecipeId());
				updateQuery.executeUpdate();
				NativeQuery q = getSession().createNativeQuery("SELECT user_recipe_id FROM recipe WHERE recipe_id = :recipe_id");
				q.setParameter("recipe_id", review.getRecipe().getRecipeId());
				Integer userId = ((BigInteger) q.getSingleResult()).intValue();
				q = getSession().createNativeQuery("UPDATE users SET sum_of_personal_recipe_ratings = sum_of_personal_recipe_ratings + :rating WHERE user_id = :user_id");
				q.setParameter("rating", resultantRating);
				q.setParameter("user_id", userId);
				q.executeUpdate();
			}
			else if (numRowsAffected < 0) {
				throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
			}
		}
		//All fields were null/invalid
		else {
			logger.error("Invalid request! Nothing was received to update!");
		}

	}

	@Override
	public void deleteReview(UserRecipeHasReview review) throws NoDataWasChangedException, Exception {
		User user = this.userService.findByEntityUsername(review.getUser().getUsername());
		NativeQuery lookupQuery = getSession().createNativeQuery("SELECT rating AS result FROM users_recipe_has_review WHERE users_user_id = :users_user_id AND recipe_recipe_id = :recipe_recipe_id");
		lookupQuery.setParameter("users_user_id", user.getUserId());
		lookupQuery.setParameter("recipe_recipe_id", review.getRecipe().getRecipeId());
		Integer tempNum = (Integer) lookupQuery.getSingleResult();
		int previousRating = tempNum.intValue();
		NativeQuery q = getSession().createNativeQuery("DELETE FROM users_recipe_has_review WHERE users_user_id = :users_user_id AND recipe_recipe_id = :recipe_recipe_id");
		q.setParameter("users_user_id", user.getUserId());
		q.setParameter("recipe_recipe_id", review.getRecipe().getRecipeId());
		int numRowsAffected = q.executeUpdate();
		if (numRowsAffected > 0) {
			NativeQuery updateQuery = getSession().createNativeQuery("UPDATE recipe SET number_of_ratings = number_of_ratings - 1, total_rating = total_rating - :rating WHERE recipe_id = :recipe_id");
			updateQuery.setParameter("rating", previousRating);
			updateQuery.setParameter("recipe_id", review.getRecipe().getRecipeId());
			updateQuery.executeUpdate();
			NativeQuery query = getSession().createNativeQuery("SELECT user_recipe_id FROM recipe WHERE recipe_id = :recipe_id");
			query.setParameter("recipe_id", review.getRecipe().getRecipeId());
			Integer userId = ((BigInteger) q.getSingleResult()).intValue();
			query = getSession().createNativeQuery("UPDATE users SET sum_of_personal_recipe_ratings = sum_of_personal_recipe_ratings - :rating, number_of_personal_recipe_ratings = number_of_personal_recipe_ratings - 1 WHERE user_id = :user_id");
			query.setParameter("rating", previousRating);
			query.setParameter("user_id", userId);
			query.executeUpdate();
		}
		else {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		}
	}
	
	@Override
	public void upVoteReview(UserRatingReview rating) throws RateOwnReviewException, Exception {
		NativeQuery q = getSession().createNativeQuery("SELECT * FROM users_recipe_has_review WHERE users_recipe_has_review_id = :users_recipe_has_review_id AND users_user_id <> :users_user_id", UserRecipeHasReview.class);
		q.setParameter("users_recipe_has_review_id", rating.getUserRecipeHasReview().getUsersRecipeHasReviewId());
		q.setParameter("users_user_id", rating.getUser().getUserId());
		if (q.getResultList().isEmpty()) {
			throw new RateOwnReviewException("Attempted to up vote own review!");
		}
		q = getSession().createNativeQuery("SELECT * FROM users_rating_review WHERE users_user_id = :users_user_id AND users_recipe_has_review_id = :users_recipe_has_review_id", UserRatingReview.class);
		q.setParameter("users_user_id", rating.getUser().getUserId());
		q.setParameter("users_recipe_has_review_id", rating.getUserRecipeHasReview().getUsersRecipeHasReviewId());
		List<UserRatingReview> userRatingReviews = (List<UserRatingReview>) q.getResultList();
		UserRatingReview userRatingReview = null;
		if (!userRatingReviews.isEmpty()) {
			userRatingReview = userRatingReviews.get(0);
		}
		if (userRatingReview == null) {
			getSession().persist(rating);
			q = getSession().createNativeQuery("UPDATE users_recipe_has_review SET number_of_up_votes = number_of_up_votes + 1 WHERE users_recipe_has_review_id = :users_recipe_has_review_id");
			q.setParameter("users_recipe_has_review_id", rating.getUserRecipeHasReview().getUsersRecipeHasReviewId());
			q.executeUpdate();
		} else {
			if (userRatingReview.getVote() == true) {
				getSession().delete(userRatingReview);
				q = getSession().createNativeQuery("UPDATE users_recipe_has_review SET number_of_up_votes = number_of_up_votes - 1 WHERE users_recipe_has_review_id = :users_recipe_has_review_id");
				q.setParameter("users_recipe_has_review_id", rating.getUserRecipeHasReview().getUsersRecipeHasReviewId());
				q.executeUpdate();
			} else {
				userRatingReview.setVote(true);
				getSession().update(userRatingReview);
				q = getSession().createNativeQuery("UPDATE users_recipe_has_review SET number_of_up_votes = number_of_up_votes + 1, number_of_down_votes = number_of_down_votes - 1 WHERE users_recipe_has_review_id = :users_recipe_has_review_id");
				q.setParameter("users_recipe_has_review_id", rating.getUserRecipeHasReview().getUsersRecipeHasReviewId());
				q.executeUpdate();
			}
		}
	}

	@Override
	public void downVoteReview(UserRatingReview rating) throws RateOwnReviewException, Exception {
		NativeQuery q = getSession().createNativeQuery("SELECT * FROM users_recipe_has_review WHERE users_recipe_has_review_id = :users_recipe_has_review_id AND users_user_id <> :users_user_id", UserRecipeHasReview.class);
		q.setParameter("users_recipe_has_review_id", rating.getUserRecipeHasReview().getUsersRecipeHasReviewId());
		q.setParameter("users_user_id", rating.getUser().getUserId());
		if (q.getResultList().isEmpty()) {
			throw new RateOwnReviewException("Attempted to down vote own review!");
		}
		q = getSession().createNativeQuery("SELECT * FROM users_rating_review WHERE users_user_id = :users_user_id AND users_recipe_has_review_id = :users_recipe_has_review_id", UserRatingReview.class);
		q.setParameter("users_user_id", rating.getUser().getUserId());
		q.setParameter("users_recipe_has_review_id", rating.getUserRecipeHasReview().getUsersRecipeHasReviewId());
		List<UserRatingReview> userRatingReviews = (List<UserRatingReview>) q.getResultList();
		UserRatingReview userRatingReview = null;
		if (!userRatingReviews.isEmpty()) {
			userRatingReview = userRatingReviews.get(0);
		}
		if (userRatingReview == null) {
			getSession().persist(rating);
			q = getSession().createNativeQuery("UPDATE users_recipe_has_review SET number_of_down_votes = number_of_down_votes + 1 WHERE users_recipe_has_review_id = :users_recipe_has_review_id");
			q.setParameter("users_recipe_has_review_id", rating.getUserRecipeHasReview().getUsersRecipeHasReviewId());
			q.executeUpdate();
		} else {
			if (userRatingReview.getVote() == true) {
				userRatingReview.setVote(false);
				getSession().update(userRatingReview);
				q = getSession().createNativeQuery("UPDATE users_recipe_has_review SET number_of_up_votes = number_of_up_votes - 1, number_of_down_votes = number_of_down_votes + 1 WHERE users_recipe_has_review_id = :users_recipe_has_review_id");
				q.setParameter("users_recipe_has_review_id", rating.getUserRecipeHasReview().getUsersRecipeHasReviewId());
				q.executeUpdate();
			} else {
				getSession().delete(userRatingReview);
				q = getSession().createNativeQuery("UPDATE users_recipe_has_review SET number_of_down_votes = number_of_down_votes - 1 WHERE users_recipe_has_review_id = :users_recipe_has_review_id");
				q.setParameter("users_recipe_has_review_id", rating.getUserRecipeHasReview().getUsersRecipeHasReviewId());
				q.executeUpdate();
			}
		}
	}

	@Override
	public List<UserRecipeHasReview> viewAllReviewsByUser(User user) throws Exception {
		Query q = getSession().createQuery("select r from UserRecipeHasReview r where r.user.userId = :userId");
		user = this.userService.findByEntityUsername(user.getUsername());
		q.setParameter("userId", user.getUserId());
		List<UserRecipeHasReview> result = (List<UserRecipeHasReview>) q.getResultList();
		return result;
	}

	@Override
	public List<UserRecipeHasReview> loadReviewsForRecipe(Recipe recipe) throws Exception {
		Query q = getSession().createQuery("select r from UserRecipeHasReview r inner join fetch r.user where r.recipe.recipeId = :recipeId");
		q.setParameter("recipeId", recipe.getRecipeId());
		List<UserRecipeHasReview> result = (List<UserRecipeHasReview>) q.getResultList();
		return result;
	}

}
