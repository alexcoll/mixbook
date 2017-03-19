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
import org.springframework.web.bind.annotation.ResponseBody;

import com.mixbook.springmvc.Exceptions.ReviewOwnRecipeException;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.JsonResponse;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Models.UserRecipeHasReview;
import com.mixbook.springmvc.Security.JwtTokenUtil;
import com.mixbook.springmvc.Services.ReviewService;

@Controller
@RequestMapping("/review")
public class ReviewController {

	@Autowired
	ReviewService reviewService;

	private String tokenHeader = "Authorization";

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@RequestMapping(value = "/createReview",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> createReview(HttpServletRequest request, @RequestBody UserRecipeHasReview review) {
		try {
			if (reviewService.isReviewInfoValid(review) == false) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Review info is invalid"), HttpStatus.BAD_REQUEST);
			}
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		try {
			reviewService.createReview(review);
		} catch (ReviewOwnRecipeException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Attempted to review own recipe"), HttpStatus.BAD_REQUEST);
		} catch (PersistenceException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Duplicate review creation"), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	@RequestMapping(value = "/editReview",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> editReview(HttpServletRequest request, @RequestBody UserRecipeHasReview review) {
		try {
			if (!reviewService.isReviewCommentaryValid(review.getReviewCommentary()) && !reviewService.isReviewRatingValid(review.getRating())) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","No valid info present to edit"), HttpStatus.BAD_REQUEST);
			}
			else {
				if (review.getReviewCommentary() != null) {
					if (!reviewService.isReviewCommentaryValid(review.getReviewCommentary())) {
						return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid review commentary"), HttpStatus.BAD_REQUEST);
					}
				}
				if (review.getRating() != 0) {
					if (!reviewService.isReviewRatingValid(review.getRating())) {
						return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid review rating"), HttpStatus.BAD_REQUEST);
					}
				}
			}
		} catch (UnknownServerErrorException e1) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		try {
			reviewService.editReview(review);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	@RequestMapping(value = "/deleteReview",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> deleteReview(HttpServletRequest request, @RequestBody UserRecipeHasReview review) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		try {
			reviewService.deleteReview(review);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

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
		} catch (UnknownServerErrorException e) {
			List<UserRecipeHasReview> emptyList = new ArrayList<UserRecipeHasReview>();
			return new ResponseEntity<List<UserRecipeHasReview>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<UserRecipeHasReview>>(tempList, HttpStatus.OK);
	}

	@RequestMapping(value = "/loadReviewsForRecipe", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<UserRecipeHasReview>> loadReviewsForRecipe(HttpServletRequest request, @RequestBody Recipe recipe) {
		List<UserRecipeHasReview> tempList = new ArrayList<UserRecipeHasReview>();
		try {
			tempList = reviewService.loadReviewsForRecipe(recipe);
		} catch (UnknownServerErrorException e) {
			List<UserRecipeHasReview> emptyList = new ArrayList<UserRecipeHasReview>();
			return new ResponseEntity<List<UserRecipeHasReview>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<UserRecipeHasReview>>(tempList, HttpStatus.OK);
	}

}
