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

public interface ReviewService {

	void createReview(UserRecipeHasReview review) throws ReviewOwnRecipeException, PersistenceException, NoDataWasChangedException, UnknownServerErrorException;

	void editReview(UserRecipeHasReview review) throws NoDataWasChangedException, UnknownServerErrorException;

	void deleteReview(UserRecipeHasReview review) throws NoDataWasChangedException, UnknownServerErrorException;
	
	void upVoteReview(UserRatingReview rating) throws RateOwnReviewException, UnknownServerErrorException;
	
	void downVoteReview(UserRatingReview rating) throws RateOwnReviewException, UnknownServerErrorException;

	List<UserRecipeHasReview> viewAllReviewsByUser(User user) throws UnknownServerErrorException;

	List<UserRecipeHasReview> loadReviewsForRecipe(Recipe recipe) throws UnknownServerErrorException;

	boolean isReviewInfoValid(UserRecipeHasReview review) throws UnknownServerErrorException;

	boolean isReviewCommentaryValid(String reviewCommentary) throws UnknownServerErrorException;

	boolean isReviewRatingValid(int rating) throws UnknownServerErrorException;

}
