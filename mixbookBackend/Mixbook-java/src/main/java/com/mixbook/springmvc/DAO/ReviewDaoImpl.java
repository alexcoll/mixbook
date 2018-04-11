package com.mixbook.springmvc.DAO;

import java.math.BigInteger;
import java.util.List;

import javax.persistence.PersistenceException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.hibernate.SQLQuery;
import org.hibernate.query.NativeQuery;
import org.hibernate.query.Query;
import org.hibernate.type.IntegerType;

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

@Repository("reviewDao")
public class ReviewDaoImpl extends AbstractDao<Integer, UserRecipeHasReview> implements ReviewDao {

	@Autowired
	UserService userService;

	private static final Logger logger = LogManager.getLogger(ReviewDaoImpl.class);

	public void createReview(UserRecipeHasReview review) throws ReviewOwnRecipeException, PersistenceException, NoDataWasChangedException, Exception {
		User user = this.userService.findByEntityUsername(review.getUser().getUsername());
		SQLQuery query = getSession().createSQLQuery("SELECT COUNT(*) FROM recipe WHERE recipe_id = ? AND user_recipe_id != ?");
		query.setParameter(0, review.getRecipe().getRecipeId());
		query.setParameter(1, user.getUserId());
		Object countobj = query.list().get(0);
		int count = ((Number) countobj).intValue();
		if (count < 1) {
			throw new ReviewOwnRecipeException("Attempted to review own recipe or recipe does not exist!");
		}
		SQLQuery insertQuery = getSession().createSQLQuery("" + "INSERT INTO users_recipe_has_review(users_user_id,recipe_recipe_id,review_commentary,rating,number_of_up_votes,number_of_down_votes)VALUES(?,?,?,?,0,0)");
		insertQuery.setParameter(0, user.getUserId());
		insertQuery.setParameter(1, review.getRecipe().getRecipeId());
		insertQuery.setParameter(2, review.getReviewCommentary());
		insertQuery.setParameter(3, review.getRating());
		int numRowsAffected = insertQuery.executeUpdate();
		if (numRowsAffected > 0) {
			SQLQuery updateQuery = getSession().createSQLQuery("UPDATE recipe SET number_of_ratings = number_of_ratings + 1, total_rating = total_rating + ? WHERE recipe_id = ?");
			updateQuery.setParameter(0, review.getRating());
			updateQuery.setParameter(1, review.getRecipe().getRecipeId());
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

	public void editReview(UserRecipeHasReview review) throws NoDataWasChangedException, Exception {
		User user = this.userService.findByEntityUsername(review.getUser().getUsername());
		//Updating both review commentary and review rating
		if (review.getReviewCommentary() != null && review.getRating() != 0) {
			SQLQuery lookupQuery = getSession().createSQLQuery("SELECT rating as result FROM users_recipe_has_review WHERE users_user_id = ? AND recipe_recipe_id = ?");
			lookupQuery.setParameter(0, user.getUserId());
			lookupQuery.setParameter(1, review.getRecipe().getRecipeId());
			lookupQuery.addScalar("result", new IntegerType());
			Integer tempNum = (Integer) lookupQuery.uniqueResult();
			int previous_rating = tempNum.intValue();
			SQLQuery updateQuery = getSession().createSQLQuery("UPDATE users_recipe_has_review SET review_commentary = ?, rating = ? WHERE users_user_id = ? AND recipe_recipe_id = ?");
			updateQuery.setParameter(0, review.getReviewCommentary());
			updateQuery.setParameter(1, review.getRating());
			updateQuery.setParameter(2, user.getUserId());
			updateQuery.setParameter(3, review.getRecipe().getRecipeId());
			int numRowsAffected = updateQuery.executeUpdate();
			if (previous_rating > review.getRating() && numRowsAffected > 0) {
				updateQuery = getSession().createSQLQuery("UPDATE recipe SET total_rating = total_rating - ? WHERE recipe_id = ?");
				int resultantRating = previous_rating - review.getRating();
				updateQuery.setParameter(0, resultantRating);
				updateQuery.setParameter(1, review.getRecipe().getRecipeId());
				updateQuery.executeUpdate();
				NativeQuery q = getSession().createNativeQuery("SELECT user_recipe_id FROM recipe WHERE recipe_id = :recipe_id");
				q.setParameter("recipe_id", review.getRecipe().getRecipeId());
				Integer userId = ((BigInteger) q.getSingleResult()).intValue();
				q = getSession().createNativeQuery("UPDATE users SET sum_of_personal_recipe_ratings = sum_of_personal_recipe_ratings - :rating WHERE user_id = :user_id");
				q.setParameter("rating", resultantRating);
				q.setParameter("user_id", userId);
				q.executeUpdate();
			}
			else if (previous_rating < review.getRating() && numRowsAffected > 0) {
				updateQuery = getSession().createSQLQuery("UPDATE recipe SET total_rating = total_rating + ? WHERE recipe_id = ?");
				int resultantRating = review.getRating() - previous_rating;
				updateQuery.setParameter(0, resultantRating);
				updateQuery.setParameter(1, review.getRecipe().getRecipeId());
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
			SQLQuery updateQuery = getSession().createSQLQuery("UPDATE users_recipe_has_review SET review_commentary = ? WHERE users_user_id = ? AND recipe_recipe_id = ?");
			updateQuery.setParameter(0, review.getReviewCommentary());
			updateQuery.setParameter(1, user.getUserId());
			updateQuery.setParameter(2, review.getRecipe().getRecipeId());
			int numRowsAffected = updateQuery.executeUpdate();
			if (numRowsAffected < 0) {
				throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
			}
		}
		//Updating review rating
		else if (review.getRating() != 0) {
			SQLQuery lookupQuery = getSession().createSQLQuery("SELECT rating as result FROM users_recipe_has_review WHERE users_user_id = ? AND recipe_recipe_id = ?");
			lookupQuery.setParameter(0, user.getUserId());
			lookupQuery.setParameter(1, review.getRecipe().getRecipeId());
			lookupQuery.addScalar("result", new IntegerType());
			Integer tempNum = (Integer) lookupQuery.uniqueResult();
			int previous_rating = tempNum.intValue();
			SQLQuery updateQuery = getSession().createSQLQuery("UPDATE users_recipe_has_review SET rating = ? WHERE users_user_id = ? AND recipe_recipe_id = ?");
			updateQuery.setParameter(0, review.getRating());
			updateQuery.setParameter(1, user.getUserId());
			updateQuery.setParameter(2, review.getRecipe().getRecipeId());
			int numRowsAffected = updateQuery.executeUpdate();
			if (previous_rating > review.getRating() && numRowsAffected > 0) {
				updateQuery = getSession().createSQLQuery("UPDATE recipe SET total_rating = total_rating - ? WHERE recipe_id = ?");
				int resultantRating = previous_rating - review.getRating();
				updateQuery.setParameter(0, resultantRating);
				updateQuery.setParameter(1, review.getRecipe().getRecipeId());
				updateQuery.executeUpdate();
				NativeQuery q = getSession().createNativeQuery("SELECT user_recipe_id FROM recipe WHERE recipe_id = :recipe_id");
				q.setParameter("recipe_id", review.getRecipe().getRecipeId());
				Integer userId = ((BigInteger) q.getSingleResult()).intValue();
				q = getSession().createNativeQuery("UPDATE users SET sum_of_personal_recipe_ratings = sum_of_personal_recipe_ratings - :rating WHERE user_id = :user_id");
				q.setParameter("rating", resultantRating);
				q.setParameter("user_id", userId);
				q.executeUpdate();
			}
			else if (previous_rating < review.getRating() && numRowsAffected > 0) {
				updateQuery = getSession().createSQLQuery("UPDATE recipe SET total_rating = total_rating + ? WHERE recipe_id = ?");
				int resultantRating = review.getRating() - previous_rating;
				updateQuery.setParameter(0, resultantRating);
				updateQuery.setParameter(1, review.getRecipe().getRecipeId());
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

	public void deleteReview(UserRecipeHasReview review) throws NoDataWasChangedException, Exception {
		User user = this.userService.findByEntityUsername(review.getUser().getUsername());
		SQLQuery lookupQuery = getSession().createSQLQuery("SELECT rating as result FROM users_recipe_has_review WHERE users_user_id = ? AND recipe_recipe_id = ?");
		lookupQuery.setParameter(0, user.getUserId());
		lookupQuery.setParameter(1, review.getRecipe().getRecipeId());
		lookupQuery.addScalar("result", new IntegerType());
		Integer tempNum = (Integer) lookupQuery.uniqueResult();
		int previous_rating = tempNum.intValue();
		Query q = getSession().createSQLQuery("DELETE FROM users_recipe_has_review WHERE users_user_id = ? AND recipe_recipe_id = ?");
		q.setParameter(0, user.getUserId());
		q.setParameter(1, review.getRecipe().getRecipeId());
		int numRowsAffected = q.executeUpdate();
		if (numRowsAffected > 0) {
			SQLQuery updateQuery = getSession().createSQLQuery("UPDATE recipe SET number_of_ratings = number_of_ratings - 1, total_rating = total_rating - ? WHERE recipe_id = ?");
			updateQuery.setParameter(0, previous_rating);
			updateQuery.setParameter(1, review.getRecipe().getRecipeId());
			updateQuery.executeUpdate();
			NativeQuery query = getSession().createNativeQuery("SELECT user_recipe_id FROM recipe WHERE recipe_id = :recipe_id");
			query.setParameter("recipe_id", review.getRecipe().getRecipeId());
			Integer userId = ((BigInteger) q.getSingleResult()).intValue();
			query = getSession().createNativeQuery("UPDATE users SET sum_of_personal_recipe_ratings = sum_of_personal_recipe_ratings - :rating, number_of_personal_recipe_ratings = number_of_personal_recipe_ratings - 1 WHERE user_id = :user_id");
			query.setParameter("rating", previous_rating);
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

	public List<UserRecipeHasReview> viewAllReviewsByUser(User user) throws Exception {
		Query q = getSession().createSQLQuery("SELECT users_recipe_has_review_id, recipe_recipe_id, review_commentary, rating, number_of_up_votes, number_of_down_votes FROM users_recipe_has_review WHERE users_user_id = ?");
		user = this.userService.findByEntityUsername(user.getUsername());
		q.setParameter(0, user.getUserId());
		List result = q.list();
		return result;
	}

	public List<UserRecipeHasReview> loadReviewsForRecipe(Recipe recipe) throws Exception {
		Query q = getSession().createSQLQuery("SELECT r.users_recipe_has_review_id, r.review_commentary, r.rating, u.username, r.number_of_up_votes, r.number_of_down_votes FROM users_recipe_has_review AS r INNER JOIN users AS u ON r.users_user_id = u.user_id WHERE r.recipe_recipe_id = ?");
		q.setParameter(0, recipe.getRecipeId());
		List result = q.list();
		return result;
	}

}
