package com.mixbook.springmvc.Services;

import java.util.List;

import javax.persistence.PersistenceException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.ReviewDao;
import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Exceptions.RateOwnReviewException;
import com.mixbook.springmvc.Exceptions.ReviewOwnRecipeException;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Models.UserRatingReview;
import com.mixbook.springmvc.Models.UserRecipeHasReview;

@Service("reviewService")
@Transactional
public class ReviewServiceImpl implements ReviewService {

	@Autowired
	private ReviewDao dao;
	
	@Autowired
	private UserService userService;

	@Override
	public void createReview(UserRecipeHasReview review) throws ReviewOwnRecipeException, PersistenceException, NoDataWasChangedException, UnknownServerErrorException {
		try {
			review.setNumberOfUpVotes(0);
			review.setNumberOfDownVotes(0);
			dao.createReview(review);
		} catch (ReviewOwnRecipeException e) {
			throw new ReviewOwnRecipeException("Attempted to review own recipe or recipe does not exist!");
		} catch (PersistenceException e) {
			throw new PersistenceException();
		} catch (NoDataWasChangedException e) {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	@Override
	public void editReview(UserRecipeHasReview review) throws NoDataWasChangedException, UnknownServerErrorException {
		try {
			dao.editReview(review);
		} catch (NoDataWasChangedException e) {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	@Override
	public void deleteReview(UserRecipeHasReview review) throws NoDataWasChangedException, UnknownServerErrorException {
		try {
			dao.deleteReview(review);
		} catch (NoDataWasChangedException e) {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}
	
	@Override
	public void upVoteReview(UserRatingReview rating) throws RateOwnReviewException, UnknownServerErrorException {
		try {
			rating.setUser(userService.findByEntityUsername(rating.getUser().getUsername()));
			dao.upVoteReview(rating);
		} catch (RateOwnReviewException e) {
			throw new RateOwnReviewException("Attempted to up vote own review!");
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	@Override
	public void downVoteReview(UserRatingReview rating) throws RateOwnReviewException, UnknownServerErrorException {
		try {
			rating.setUser(userService.findByEntityUsername(rating.getUser().getUsername()));
			dao.downVoteReview(rating);
		} catch (RateOwnReviewException e) {
			throw new RateOwnReviewException("Attempted to down vote own review!");
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	@Override
	public List<UserRecipeHasReview> viewAllReviewsByUser(User user) throws UnknownServerErrorException {
		try {
			return dao.viewAllReviewsByUser(user);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	@Override
	public List<UserRecipeHasReview> loadReviewsForRecipe(Recipe recipe) throws UnknownServerErrorException {
		try {
			return dao.loadReviewsForRecipe(recipe);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public boolean isReviewInfoValid(UserRecipeHasReview review) throws UnknownServerErrorException {
		try {
			if (!isReviewCommentaryValid(review.getReviewCommentary())) {
				return false;
			}
			if (!isReviewRatingValid(review.getRating())) {
				return false;
			}
		} catch (UnknownServerErrorException e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
		return true;
	}

	public boolean isReviewCommentaryValid(String reviewCommentary) throws UnknownServerErrorException {
		if (reviewCommentary == null) {
			return false;
		}
		if (reviewCommentary.isEmpty()) {
			return false;
		}
		if (reviewCommentary.length() > 16383 || reviewCommentary.length() < 2) {
			return false;
		}
		return true;
	}

	public boolean isReviewRatingValid(int rating) throws UnknownServerErrorException {
		if (rating < 1 || rating > 5) {
			return false;
		}
		return true;
	}

}
