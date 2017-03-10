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

import com.mixbook.springmvc.Exceptions.InvalidIngredientException;
import com.mixbook.springmvc.Exceptions.MaxRecipeIngredientsException;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.JsonResponse;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Security.JwtTokenUtil;
import com.mixbook.springmvc.Services.RecipeService;

@Controller
@RequestMapping("/recipe")
public class RecipeController {

	@Autowired
	RecipeService recipeService;

	private String tokenHeader = "Authorization";

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@RequestMapping(value = "/createRecipe",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> createRecipe(HttpServletRequest request, @RequestBody Recipe recipe) {
		try {
			if (recipeService.isRecipeInfoValid(recipe) == false) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Recipe info is invalid"), HttpStatus.BAD_REQUEST);
			}
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		try {
			recipeService.createRecipe(recipe, user);
		} catch (MaxRecipeIngredientsException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Too many ingredients added"), HttpStatus.BAD_REQUEST);
		} catch (InvalidIngredientException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid ingredient added"), HttpStatus.BAD_REQUEST);
		} catch (PersistenceException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Duplicate recipe creation"), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	@RequestMapping(value = "/editRecipe",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> editRecipe(HttpServletRequest request, @RequestBody Recipe recipe) {
		if (recipe.getDirections() == null && recipe.getDifficulty() == 0) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid recipe info format"), HttpStatus.BAD_REQUEST);
		}
		try {
			if (recipe.getDirections() != null) {
				if (recipeService.areRecipeDirectionsValid(recipe.getDirections()) == false) {
					return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid recipe directions format"), HttpStatus.BAD_REQUEST);
				}
			}
			if (recipe.getDifficulty() != 0) {
				if (recipeService.isRecipeDifficultyValid(recipe.getDifficulty()) == false) {
					return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid recipe difficulty format"), HttpStatus.BAD_REQUEST);
				}
			}
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		try {
			recipeService.editRecipe(recipe, user);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	@RequestMapping(value = "/deleteRecipe",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> deleteRecipe(HttpServletRequest request, @RequestBody Recipe recipe) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		try {
			recipeService.deleteRecipe(recipe, user);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	@RequestMapping(value = "/addIngredientToRecipe",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> addIngredientToRecipe(HttpServletRequest request, @RequestBody Recipe recipe) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		try {
			recipeService.addIngredientToRecipe(recipe, user);
		} catch (MaxRecipeIngredientsException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Too many ingredients added"), HttpStatus.BAD_REQUEST);
		} catch (InvalidIngredientException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid ingredient added"), HttpStatus.BAD_REQUEST);
		} catch (PersistenceException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Duplicate recipe creation"), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	@RequestMapping(value = "/removeIngredientFromRecipe",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> removeIngredientFromRecipe(HttpServletRequest request, @RequestBody Recipe recipe) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		try {
			recipeService.removeIngredientFromRecipe(recipe, user);
		} catch (InvalidIngredientException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid ingredient added"), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	@RequestMapping(value = "/searchForRecipeByName", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Recipe> searchForRecipeByName(@RequestBody Recipe recipe) {
		Recipe tempRecipe;
		try {
			tempRecipe = recipeService.searchForRecipeByName(recipe);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<Recipe>(new Recipe(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Recipe>(tempRecipe, HttpStatus.OK); 
	}

	@RequestMapping(value = "/getAllRecipesCreatedByUser", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Recipe>> getAllRecipesCreatedByUser(HttpServletRequest request) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		List<Recipe> tempList = new ArrayList<Recipe>();
		try {
			tempList = recipeService.getAllRecipesCreatedByUser(user);
		} catch (UnknownServerErrorException e) {
			List<Recipe> emptyList = new ArrayList<Recipe>();
			return new ResponseEntity<List<Recipe>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Recipe>>(tempList, HttpStatus.OK);
	}

	@RequestMapping(value = "/getAllRecipesUserCanMake", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Recipe>> getAllRecipesUserCanMake(HttpServletRequest request) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		List<Recipe> tempList = new ArrayList<Recipe>();
		try {
			tempList = recipeService.getAllRecipesUserCanMake(user);
		} catch (UnknownServerErrorException e) {
			List<Recipe> emptyList = new ArrayList<Recipe>();
			return new ResponseEntity<List<Recipe>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Recipe>>(tempList, HttpStatus.OK);
	}

	@RequestMapping(value = "/getAllRecipesAnonymousUserCanMake", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Recipe>> getAllRecipesAnonymousUserCanMake(@RequestBody List<Brand> brands) {
		List<Recipe> tempList = new ArrayList<Recipe>();
		List<Recipe> emptyList = new ArrayList<Recipe>();
		if (brands.size() < 1 || brands.size() > 20) {
			return new ResponseEntity<List<Recipe>>(emptyList, HttpStatus.BAD_REQUEST);
		}
		try {
			tempList = recipeService.getAllRecipesAnonymousUserCanMake(brands);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<List<Recipe>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Recipe>>(tempList, HttpStatus.OK);
	}

}
