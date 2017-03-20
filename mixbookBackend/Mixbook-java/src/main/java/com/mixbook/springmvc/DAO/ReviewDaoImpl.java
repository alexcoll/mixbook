package com.mixbook.springmvc.DAO;

import java.util.List;

import javax.persistence.PersistenceException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.SQLQuery;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Exceptions.ReviewOwnRecipeException;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Models.UserRecipeHasReview;
import com.mixbook.springmvc.Services.UserService;

@Repository("reviewDao")
public class ReviewDaoImpl extends AbstractDao<Integer, UserRecipeHasReview> implements ReviewDao {

	@Autowired
	UserService userService;

	private static final Logger logger = LogManager.getLogger(ReviewDaoImpl.class);

	public void createReview(UserRecipeHasReview review) throws ReviewOwnRecipeException, PersistenceException, Exception {
		User user = this.userService.findByEntityUsername(review.getPk().getUser().getUsername());
		SQLQuery query = getSession().createSQLQuery("SELECT COUNT(*) FROM recipe WHERE recipe_id = ? AND user_recipe_id != ?");
		query.setParameter(0, review.getPk().getRecipe().getRecipeId());
		query.setParameter(1, user.getUserId());
		Object countobj = query.list().get(0);
		int count = ((Number) countobj).intValue();
		if (count < 1) {
			throw new ReviewOwnRecipeException("Attempted to review own recipe or recipe does not exist!");
		}
		SQLQuery insertQuery = getSession().createSQLQuery("" + "INSERT INTO users_recipe_has_review(users_user_id,recipe_recipe_id,review_commentary,rating)VALUES(?,?,?,?)");
		insertQuery.setParameter(0, review.getPk().getUser().getUserId());
		insertQuery.setParameter(1, review.getPk().getRecipe().getRecipeId());
		insertQuery.setParameter(2, review.getReviewCommentary());
		insertQuery.setParameter(3, review.getRating());
		insertQuery.executeUpdate();
		SQLQuery updateQuery = getSession().createSQLQuery("UPDATE recipe SET number_of_ratings = number_of_ratings + 1, total_rating = total_rating + ? WHERE recipe_id = ?");
		updateQuery.setParameter(0, review.getRating());
		updateQuery.setParameter(1, review.getPk().getRecipe().getRecipeId());
		updateQuery.executeUpdate();
	}

	public void editReview(UserRecipeHasReview review) throws Exception {
		User user = this.userService.findByEntityUsername(review.getPk().getUser().getUsername());
		//Updating both review commentary and review rating
		if (review.getReviewCommentary() != null && review.getRating() != 0) {
			SQLQuery lookupQuery = getSession().createSQLQuery("SELECT rating FROM users_recipe_has_review WHERE users_user_id = ? AND recipe_recipe_id = ?");
			lookupQuery.setParameter(0, user.getUserId());
			lookupQuery.setParameter(1, review.getPk().getRecipe().getRecipeId());
			int previous_rating = (int) lookupQuery.uniqueResult();
			SQLQuery updateQuery = getSession().createSQLQuery("UPDATE users_recipe_has_review SET review_commentary = ?, rating = ? WHERE users_user_id = ? AND recipe_recipe_id = ?");
			updateQuery.setParameter(0, review.getReviewCommentary());
			updateQuery.setParameter(1, review.getRating());
			updateQuery.setParameter(2, review.getPk().getUser().getUserId());
			updateQuery.setParameter(3, review.getPk().getRecipe().getRecipeId());
			updateQuery.executeUpdate();
			if (previous_rating > review.getRating()) {
				updateQuery = getSession().createSQLQuery("UPDATE recipe SET total_rating = total_rating - ? WHERE recipe_id = ?");
				int resultantRating = previous_rating - review.getRating();
				updateQuery.setParameter(0, resultantRating);
				updateQuery.setParameter(1, review.getPk().getRecipe().getRecipeId());
				updateQuery.executeUpdate();
			}
			else if (previous_rating < review.getRating()) {
				updateQuery = getSession().createSQLQuery("UPDATE recipe SET total_rating = total_rating + ? WHERE recipe_id = ?");
				int resultantRating = review.getRating() - previous_rating;
				updateQuery.setParameter(0, resultantRating);
				updateQuery.setParameter(1, review.getPk().getRecipe().getRecipeId());
				updateQuery.executeUpdate();
			}
		}
		//Updating review commentary
		else if (review.getReviewCommentary() != null) {
			SQLQuery updateQuery = getSession().createSQLQuery("UPDATE users_recipe_has_review SET review_commentary = ? WHERE users_user_id = ? AND recipe_recipe_id = ?");
			updateQuery.setParameter(0, review.getReviewCommentary());
			updateQuery.setParameter(1, review.getPk().getUser().getUserId());
			updateQuery.setParameter(2, review.getPk().getRecipe().getRecipeId());
			updateQuery.executeUpdate();
		}
		//Updating review rating
		else if (review.getRating() != 0) {
			SQLQuery lookupQuery = getSession().createSQLQuery("SELECT rating FROM users_recipe_has_review WHERE users_user_id = ? AND recipe_recipe_id = ?");
			lookupQuery.setParameter(0, user.getUserId());
			lookupQuery.setParameter(1, review.getPk().getRecipe().getRecipeId());
			int previous_rating = (int) lookupQuery.uniqueResult();
			SQLQuery updateQuery = getSession().createSQLQuery("UPDATE users_recipe_has_review SET rating = ? WHERE users_user_id = ? AND recipe_recipe_id = ?");
			updateQuery.setParameter(0, review.getRating());
			updateQuery.setParameter(1, review.getPk().getUser().getUserId());
			updateQuery.setParameter(2, review.getPk().getRecipe().getRecipeId());
			updateQuery.executeUpdate();
			if (previous_rating > review.getRating()) {
				updateQuery = getSession().createSQLQuery("UPDATE recipe SET total_rating = total_rating - ? WHERE recipe_id = ?");
				int resultantRating = previous_rating - review.getRating();
				updateQuery.setParameter(0, resultantRating);
				updateQuery.setParameter(1, review.getPk().getRecipe().getRecipeId());
				updateQuery.executeUpdate();
			}
			else if (previous_rating < review.getRating()) {
				updateQuery = getSession().createSQLQuery("UPDATE recipe SET total_rating = total_rating + ? WHERE recipe_id = ?");
				int resultantRating = review.getRating() - previous_rating;
				updateQuery.setParameter(0, resultantRating);
				updateQuery.setParameter(1, review.getPk().getRecipe().getRecipeId());
				updateQuery.executeUpdate();
			}
		}
		//All fields were null/invalid
		else {
			logger.error("Invalid request! Nothing was received to update!");
		}

	}

	public void deleteReview(UserRecipeHasReview review) throws Exception {
		User user = this.userService.findByEntityUsername(review.getPk().getUser().getUsername());
		SQLQuery lookupQuery = getSession().createSQLQuery("SELECT rating FROM users_recipe_has_review WHERE users_user_id = ? AND recipe_recipe_id = ?");
		lookupQuery.setParameter(0, user.getUserId());
		lookupQuery.setParameter(1, review.getPk().getRecipe().getRecipeId());
		int previous_rating = (int) lookupQuery.uniqueResult();
		Query q = getSession().createSQLQuery("DELETE FROM users_recipe_has_review WHERE users_user_id = ? AND recipe_recipe_id = ?");
		q.setParameter(0, review.getPk().getUser().getUserId());
		q.setParameter(1, review.getPk().getRecipe().getRecipeId());
		q.executeUpdate();
		SQLQuery updateQuery = getSession().createSQLQuery("UPDATE recipe SET number_of_ratings = number_of_ratings - 1, total_rating = total_rating - ? WHERE recipe_id = ?");
		updateQuery.setParameter(0, previous_rating);
		updateQuery.setParameter(1, review.getPk().getRecipe().getRecipeId());
		updateQuery.executeUpdate();
	}

	public List<UserRecipeHasReview> viewAllReviewsByUser(User user) throws Exception {
		Query q = getSession().createSQLQuery("SELECT * FROM users_recipe_has_review WHERE users_user_id = ?");
		user = this.userService.findByEntityUsername(user.getUsername());
		q.setParameter(0, user.getUserId());
		List result = q.list();
		return result;
	}

	public List<UserRecipeHasReview> loadReviewsForRecipe(Recipe recipe) throws Exception {
		Query q = getSession().createSQLQuery("SELECT * FROM users_recipe_has_review WHERE recipe_recipe_id = ?");
		q.setParameter(0, recipe.getRecipeId());
		List result = q.list();
		return result;
	}

}
