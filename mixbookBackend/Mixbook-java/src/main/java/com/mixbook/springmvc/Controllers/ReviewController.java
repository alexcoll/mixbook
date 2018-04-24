package com.mixbook.springmvc.Controllers;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.PersistenceException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Exceptions.RateOwnReviewException;
import com.mixbook.springmvc.Exceptions.ReviewOwnRecipeException;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.JsonResponse;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Models.UserRatingReview;
import com.mixbook.springmvc.Models.UserRecipeHasReview;
import com.mixbook.springmvc.Security.JwtTokenUtil;
import com.mixbook.springmvc.Services.BadgeService;
import com.mixbook.springmvc.Services.ReviewService;

/**
 * Provides API endpoints for review functions.
 * @author John Tyler Preston
 * @version 1.0
 */
@Controller
@RequestMapping("/review")
public class ReviewController {

	/**
	 * Provides ability to access review service layer functions.
	 */
	@Autowired
	ReviewService reviewService;

	/**
	 * Provides ability to access badge service layer functions.
	 */
	@Autowired
	private BadgeService badgeService;

	/**
	 * Used to extract authentication information from the token.
	 */
	private String tokenHeader = "Authorization";

	/**
	 * Allows access to JWT token utilities.
	 */
	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	/**
	 * Creates a review.
	 * <p>
	 * Request must include the primary key of a <code>Recipe</code> (i.e. the recipe to review), the text/commentary of a <code>UserRecipeHasReview</code>, as well as the rating of a <code>UserRecipeHasReview</code> to create a review.
	 * @param request the request coming in to identify the user.
	 * @param review the review object that will be persisted.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request along
	 * with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/createReview",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> createReview(HttpServletRequest request, @RequestBody UserRecipeHasReview review) {
		try {
			if (!reviewService.isReviewInfoValid(review)) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Review info is invalid"), HttpStatus.BAD_REQUEST);
			}
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		review.setUser(user);
		if (review.getRecipe().getRecipeId() < 1) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED", "Invalid request, missing recipe"), HttpStatus.BAD_REQUEST);
		}
		try {
			reviewService.createReview(review);
			badgeService.checkForNewBadges(review.getUser());
		} catch (ReviewOwnRecipeException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Attempted to review own recipe or recipe does not exist"), HttpStatus.BAD_REQUEST);
		} catch (PersistenceException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Duplicate review creation"), HttpStatus.BAD_REQUEST);
		} catch (NoDataWasChangedException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","No data was changed. Info may have been invalid."), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Edits a review.
	 * <p>
	 * Request must include the primary key of a <code>Recipe</code> (i.e. the recipe that was reviewed) as well as the text/commentary of a <code>UserRecipeHasReview</code> and/or the rating of a <code>UserRecipeHasReview</code> to edit a review.
	 * @param request the request coming in to identify the user.
	 * @param review the review object that will be edited.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request along
	 * with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/editReview",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> editReview(HttpServletRequest request, @RequestBody UserRecipeHasReview review) {
		try {
			if (review.getReviewCommentary() != null) {
				if (review.getReviewCommentary().isEmpty()) {
					review.setReviewCommentary(null);
				}
			}
			if (review.getReviewCommentary() == null && review.getRating() == 0) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","No valid info present to edit"), HttpStatus.BAD_REQUEST);
			}
			else if (review.getReviewCommentary() != null && review.getRating() != 0) {
				if (!reviewService.isReviewCommentaryValid(review.getReviewCommentary()) || !reviewService.isReviewRatingValid(review.getRating())) {
					return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","No valid info present to edit"), HttpStatus.BAD_REQUEST);
				}
			}
			if (review.getRating() == 0 && !reviewService.isReviewCommentaryValid(review.getReviewCommentary())) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid review commentary"), HttpStatus.BAD_REQUEST);
			}
			if (review.getReviewCommentary() == null && !reviewService.isReviewRatingValid(review.getRating())) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid review rating"), HttpStatus.BAD_REQUEST);
			}
		} catch (UnknownServerErrorException e1) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		review.setUser(user);
		if (review.getRecipe().getRecipeId() < 1) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED", "Invalid request, missing recipe"), HttpStatus.BAD_REQUEST);
		}
		try {
			reviewService.editReview(review);
		} catch (NoDataWasChangedException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","No data was changed. Info may have been invalid."), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Deletes a review.
	 * <p>
	 * Request must include the primary key of a <code>Recipe</code> (i.e. the recipe that was reviewed) to delete a review.
	 * @param request the request coming in to identify the user.
	 * @param review the review object that will be deleted.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request along
	 * with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/deleteReview",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> deleteReview(HttpServletRequest request, @RequestBody UserRecipeHasReview review) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		review.setUser(user);
		if (review.getRecipe().getRecipeId() < 1) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED", "Invalid request, missing recipe"), HttpStatus.BAD_REQUEST);
		}
		try {
			reviewService.deleteReview(review);
		} catch (NoDataWasChangedException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","No data was changed. Info may have been invalid."), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Up votes a review.
	 * <p>
	 * Request must include the primary key of a <code>UserRecipeHasReview</code> (i.e. the review to up vote) as well as the vote flag of a <code>UserRatingReview</code> set to true to up vote a review.
	 * @param request the request coming in to identify the user.
	 * @param rating the rating object that will be persisted.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request along
	 * with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/upVoteReview",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> upVoteReview(HttpServletRequest request, @RequestBody UserRatingReview rating) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		rating.setUser(user);
		if (rating.getVote() != true) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED", "Invalid request, wrong vote flag"), HttpStatus.BAD_REQUEST);
		}
		if (rating.getUserRecipeHasReview().getUsersRecipeHasReviewId() < 1) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED", "Invalid request, missing review"), HttpStatus.BAD_REQUEST);
		}
		if (rating.getVote() == null) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED", "Invalid request, missing rating"), HttpStatus.BAD_REQUEST);
		}
		try {
			reviewService.upVoteReview(rating);
		} catch (RateOwnReviewException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Attempted to up vote own review!"), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Down votes a review.
	 * <p>
	 * Request must include the primary key of a <code>UserRecipeHasReview</code> (i.e. the review to down vote) as well as the vote flag of a <code>UserRatingReview</code> set to false to down vote a review.
	 * @param request the request coming in to identify the user.
	 * @param rating the rating object that will be persisted.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request along
	 * with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/downVoteReview",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> downVoteReview(HttpServletRequest request, @RequestBody UserRatingReview rating) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		rating.setUser(user);
		if (rating.getVote() != false) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED", "Invalid request, wrong vote flag"), HttpStatus.BAD_REQUEST);
		}
		if (rating.getUserRecipeHasReview().getUsersRecipeHasReviewId() < 1) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED", "Invalid request, missing review"), HttpStatus.BAD_REQUEST);
		}
		if (rating.getVote() == null) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED", "Invalid request, missing rating"), HttpStatus.BAD_REQUEST);
		}
		try {
			reviewService.downVoteReview(rating);
		} catch (RateOwnReviewException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Attempted to down vote own review!"), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Loads a list of reviews that a user has created.
	 * @param request the request coming in to identify the user.
	 * @return a <code>ResponseEntity</code> of type <code>List</code> of type <code>UserRecipeHasReview</code> of all the reviews that a user has created. It contains each review's
	 * information, information regarding the success or failure of request, along with an HTTP status code, 200 for success and 500 for an internal
	 * server error.
	 */
	@RequestMapping(value = "/viewAllReviewsByUser", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<UserRecipeHasReview>> viewAllReviewsByUser(HttpServletRequest request) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		List<UserRecipeHasReview> tempList = new ArrayList<UserRecipeHasReview>();
		try {
			tempList = reviewService.viewAllReviewsByUser(user);
			for (UserRecipeHasReview review : tempList) {
				review.setUser(null);
			}
		} catch (UnknownServerErrorException e) {
			List<UserRecipeHasReview> emptyList = new ArrayList<UserRecipeHasReview>();
			return new ResponseEntity<List<UserRecipeHasReview>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<UserRecipeHasReview>>(tempList, HttpStatus.OK);
	}

	/**
	 * Loads a list of reviews for a recipe.
	 * @param request the request coming in to identify the user.
	 * @return a <code>ResponseEntity</code> of type <code>List</code> of type <code>UserRecipeHasReview</code> of all the reviews for a recipe. It contains each review's
	 * information, information regarding the success or failure of request, along with an HTTP status code, 200 for success and 500 for an internal
	 * server error.
	 */
	@RequestMapping(value = "/loadReviewsForRecipe", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<UserRecipeHasReview>> loadReviewsForRecipe(HttpServletRequest request, @RequestParam("id") Integer id) {
		List<UserRecipeHasReview> tempList = new ArrayList<UserRecipeHasReview>();
		List<UserRecipeHasReview> emptyList = new ArrayList<UserRecipeHasReview>();
		if (id < 1) {
			return new ResponseEntity<List<UserRecipeHasReview>>(emptyList, HttpStatus.BAD_REQUEST);
		}
		Recipe recipe = new Recipe(id);
		try {
			tempList = reviewService.loadReviewsForRecipe(recipe);
			for (UserRecipeHasReview review : tempList) {
				User user = new User();
				user.setUsername(review.getUser().getUsername());
				review.setUser(user);
			}
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<List<UserRecipeHasReview>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<UserRecipeHasReview>>(tempList, HttpStatus.OK);
	}

}
