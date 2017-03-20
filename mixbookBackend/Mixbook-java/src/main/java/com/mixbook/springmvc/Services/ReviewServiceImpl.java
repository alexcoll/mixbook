package com.mixbook.springmvc.Services;

import java.util.List;

import javax.persistence.PersistenceException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.ReviewDao;
import com.mixbook.springmvc.Exceptions.ReviewOwnRecipeException;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Models.UserRecipeHasReview;

@Service("reviewService")
@Transactional
public class ReviewServiceImpl implements ReviewService {

	@Autowired
	private ReviewDao dao;

	public void createReview(UserRecipeHasReview review) throws ReviewOwnRecipeException, PersistenceException, UnknownServerErrorException {
		try {
			dao.createReview(review);
		} catch (ReviewOwnRecipeException e) {
			throw new ReviewOwnRecipeException("Attempted to review own recipe or recipe does not exist!");
		} catch (PersistenceException e) {
			throw new PersistenceException();
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public void editReview(UserRecipeHasReview review) throws UnknownServerErrorException {
		try {
			dao.editReview(review);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public void deleteReview(UserRecipeHasReview review) throws UnknownServerErrorException {
		try {
			dao.deleteReview(review);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public List<UserRecipeHasReview> viewAllReviewsByUser(User user) throws UnknownServerErrorException {
		try {
			return dao.viewAllReviewsByUser(user);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

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

	public boolean isReviewCommentaryValid(String review_commentary) throws UnknownServerErrorException {
		if (review_commentary == null) {
			return false;
		}
		if (review_commentary.isEmpty()) {
			return false;
		}
		if (review_commentary.length() > 16383 || review_commentary.length() < 2) {
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
