package com.mixbook.springmvc.DAO;

import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Exceptions.ReviewOwnRecipeException;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Models.UserRecipeHasReview;

public interface ReviewDao {

	void createReview(UserRecipeHasReview review) throws ReviewOwnRecipeException, PersistenceException, NoDataWasChangedException, Exception;

	void editReview(UserRecipeHasReview review) throws NoDataWasChangedException, Exception;

	void deleteReview(UserRecipeHasReview review) throws NoDataWasChangedException, Exception;

	List<UserRecipeHasReview> viewAllReviewsByUser(User user) throws Exception;

	List<UserRecipeHasReview> loadReviewsForRecipe(Recipe recipe) throws Exception;

}
