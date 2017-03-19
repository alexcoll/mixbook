package com.mixbook.springmvc.DAO;

import java.util.List;

import javax.persistence.PersistenceException;

import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Exceptions.ReviewOwnRecipeException;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Models.UserRecipeHasReview;

@Repository("reviewDao")
public class ReviewDaoImpl extends AbstractDao<Integer, UserRecipeHasReview> implements ReviewDao {

	public void createReview(UserRecipeHasReview review) throws ReviewOwnRecipeException, PersistenceException, Exception {

	}

	public void editReview(UserRecipeHasReview review) throws Exception {

	}

	public void deleteReview(UserRecipeHasReview review) throws Exception {

	}

	public List<UserRecipeHasReview> viewAllReviewsByUser(User user) throws Exception {
		return null;
	}

	public List<UserRecipeHasReview> loadReviewsForRecipe(Recipe recipe) throws Exception {
		return null;
	}

}
