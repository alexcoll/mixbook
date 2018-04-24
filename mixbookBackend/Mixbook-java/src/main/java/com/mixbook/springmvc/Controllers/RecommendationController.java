package com.mixbook.springmvc.Controllers;

import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.JsonResponse;
import com.mixbook.springmvc.Models.Recommendation;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Security.JwtTokenUtil;
import com.mixbook.springmvc.Services.RecommendationService;
import com.mixbook.springmvc.Services.UserService;

/**
 * Provides API endpoints for recommendation functions.
 * @author John Tyler Preston
 * @version 1.0
 */
@Controller
@RequestMapping("/recommendation")
public class RecommendationController {

	/**
	 * Provides ability to access recommendation service layer functions.
	 */
	@Autowired
	private RecommendationService recommendationService;

	/**
	 * Provides ability to access user service layer functions.
	 */
	@Autowired
	private UserService userService;

	/**
	 * Allows access to JWT token utilities.
	 */
	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	/**
	 * Used to extract authentication information from the token.
	 */
	private String tokenHeader = "Authorization";

	/**
	 * Recommends a recipe to a user.
	 * <p>
	 * Request must include the primary key of a <code>User</code> (i.e. the intended recipient) as well as the primary key of a <code>Recipe</code> (i.e. the recipe to recommend) to recommend a recipe to a user.
	 * @param request the request coming in to identify the user.
	 * @param recommendation the recommendation object that will be persisted.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request along
	 * with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/recommendRecipe", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> recommendRecipe(HttpServletRequest request, @RequestBody Recommendation recommendation) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		try {
			User user = userService.findByEntityUsername(username);
			if (recommendation.getRecipient().getUserId() == null || recommendation.getRecommendedRecipe().getRecipeId() == null || recommendation.getRecipient().getUserId() < 0 || recommendation.getRecommendedRecipe().getRecipeId() < 0) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid recipe or user info"), HttpStatus.BAD_REQUEST);
			}
			if (recommendation.getRecipient().getUserId() == user.getUserId()) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Cannot recommend a recipe to oneself"), HttpStatus.BAD_REQUEST);
			}
			recommendation.setRecommender(user);
			recommendationService.recommendRecipe(recommendation);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Deletes a recommendation that a user has received.
	 * <p>
	 * Request must include the primary key of a <code>Recommendation</code> to delete a recommendation that a user has received.
	 * @param request the request coming in to identify the user.
	 * @param recommendation the recommendation object that will be deleted.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request along
	 * with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/deleteRecommendation", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> deleteRecommendation(HttpServletRequest request, @RequestBody Recommendation recommendation) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		try {
			User user = userService.findByEntityUsername(username);
			if (recommendation.getRecommendationId() == null || recommendation.getRecommendationId() < 0) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid recommendation info"), HttpStatus.BAD_REQUEST);
			}
			recommendation.setRecipient(user);
			recommendationService.deleteRecommendation(recommendation);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Loads a list of recommendations that a user has received.
	 * @param request the request coming in to identify the user.
	 * @return a <code>ResponseEntity</code> of type <code>Set</code> of type <code>Recommendation</code> of all the recommendations that a user has received. It contains each recommendation's
	 * information, information regarding the success or failure of request, along with an HTTP status code, 200 for success and 500 for an internal
	 * server error.
	 */
	@RequestMapping(value = "/loadRecommendations", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Set<Recommendation>> loadRecommendations(HttpServletRequest request) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		try {
			Set<Recommendation> recommendations = recommendationService.loadRecommendations(user);
			for (Recommendation recommendation : recommendations) {
				recommendation.setDescription(recommendation.getRecommender().getUsername() + " has recommended a recipe to you!");
				recommendation.setRecommender(null);
				User onlyUsername = new User();
				onlyUsername.setUsername(recommendation.getRecommendedRecipe().getUser().getUsername());
				recommendation.getRecommendedRecipe().setUser(onlyUsername);
			}
			return new ResponseEntity<Set<Recommendation>>(recommendations, HttpStatus.OK);
		} catch (UnknownServerErrorException e) {
			Set<Recommendation> emptyRecommendations = new HashSet<>();
			return new ResponseEntity<Set<Recommendation>>(emptyRecommendations, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
