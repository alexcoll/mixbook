package com.mixbook.springmvc.DAO;

import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.ReviewOwnRecipeException;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Models.UserRecipeHasReview;

public interface ReviewDao {

	void createReview(UserRecipeHasReview review) throws ReviewOwnRecipeException, PersistenceException, Exception;

	void editReview(UserRecipeHasReview review) throws Exception;

	void deleteReview(UserRecipeHasReview review) throws Exception;

	List<UserRecipeHasReview> viewAllReviewsByUser(User user) throws Exception;

	List<UserRecipeHasReview> loadReviewsForRecipe(Recipe recipe) throws Exception;

}
