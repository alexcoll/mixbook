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

import com.mixbook.springmvc.Exceptions.InvalidIngredientException;
import com.mixbook.springmvc.Exceptions.InvalidPermissionsException;
import com.mixbook.springmvc.Exceptions.MaxRecipeIngredientsException;
import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Exceptions.NotEnoughRecipeIngredientsException;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.JsonResponse;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Security.JwtTokenUtil;
import com.mixbook.springmvc.Services.BadgeService;
import com.mixbook.springmvc.Services.RecipeService;

/**
 * Provides API endpoints for recipe functions.
 * @author John Tyler Preston
 * @version 1.0
 */
@Controller
@RequestMapping("/recipe")
public class RecipeController {

	/**
	 * Provides ability to access recipe service layer functions.
	 */
	@Autowired
	RecipeService recipeService;

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
	 * Creates a recipe.
	 * <p>
	 * Request must include the name of a <code>Recipe</code>, the directions of a <code>Recipe</code>, the difficulty of a <code>Recipe</code>, as well as the names of brands (ingredients) of a <code>Recipe</code> to create a recipe.
	 * @param request the request coming in to identify the user.
	 * @param recipe the recipe object that will be persisted.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request along
	 * with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/createRecipe",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> createRecipe(HttpServletRequest request, @RequestBody Recipe recipe) {
		try {
			if (!recipeService.isRecipeInfoValid(recipe)) {
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
			badgeService.checkForNewBadges(user);
		} catch (InvalidIngredientException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid ingredient added"), HttpStatus.BAD_REQUEST);
		} catch (PersistenceException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Duplicate recipe creation"), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Edits a recipe.
	 * <p>
	 * Request must include the primary key of a <code>Recipe</code> as well as the directions of a <code>Recipe</code> and/or the difficulty of a <code>Recipe</code> to edit a recipe.
	 * @param request the request coming in to identify the user.
	 * @param recipe the recipe object that will be edited.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request along
	 * with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/editRecipe",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> editRecipe(HttpServletRequest request, @RequestBody Recipe recipe) {
		try {
			if (recipe.getDirections() != null) {
				if (recipe.getDirections().isEmpty()) {
					recipe.setDirections(null);
				}
			}
			if (recipe.getDirections() == null && recipe.getDifficulty() == 0) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid recipe info format"), HttpStatus.BAD_REQUEST);
			}
			else if (recipe.getDirections() != null && recipe.getDifficulty() != 0) {
				if (!recipeService.areRecipeDirectionsValid(recipe.getDirections()) || !recipeService.isRecipeDifficultyValid(recipe.getDifficulty())) {
					return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid recipe info format"), HttpStatus.BAD_REQUEST);
				}
			}
			if (recipe.getDifficulty() == 0 && !recipeService.areRecipeDirectionsValid(recipe.getDirections())) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid recipe directions format"), HttpStatus.BAD_REQUEST);
			}
			if (recipe.getDirections() == null && !recipeService.isRecipeDifficultyValid(recipe.getDifficulty())) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid recipe difficulty format"), HttpStatus.BAD_REQUEST);
			}
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		if (recipe.getRecipeId() < 1) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid recipe ID"), HttpStatus.BAD_REQUEST);
		}
		try {
			recipeService.editRecipe(recipe, user);
		} catch (NoDataWasChangedException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","No data was changed. Info may have been invalid."), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Deletes a recipe.
	 * <p>
	 * Request must include the primary key of a <code>Recipe</code> to delete a recipe.
	 * @param request the request coming in to identify the user.
	 * @param recipe the recipe object that will be deleted.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request along
	 * with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/deleteRecipe",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> deleteRecipe(HttpServletRequest request, @RequestBody Recipe recipe) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		if (recipe.getRecipeId() < 1) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid recipe ID"), HttpStatus.BAD_REQUEST);
		}
		try {
			recipeService.deleteRecipe(recipe, user);
		} catch (NoDataWasChangedException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","No data was changed. Info may have been invalid."), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Adds an ingredient to a recipe.
	 * <p>
	 * Request must include the primary key of a <code>Recipe</code> as well as the name of the <code>Brand</code> to add an ingredient to a recipe.
	 * @param request the request coming in to identify the user.
	 * @param recipe the recipe object that will have an ingredient added to it.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request along
	 * with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/addIngredientToRecipe",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> addIngredientToRecipe(HttpServletRequest request, @RequestBody Recipe recipe) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		if (recipe.getBrands().size() != 1) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED", "Invalid number of ingredients"), HttpStatus.BAD_REQUEST);
		}
		if (recipe.getRecipeId() < 1) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid recipe ID"), HttpStatus.BAD_REQUEST);
		}
		try {
			recipeService.addIngredientToRecipe(recipe, user);
		} catch (InvalidPermissionsException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid permissions"), HttpStatus.BAD_REQUEST);
		} catch (MaxRecipeIngredientsException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Too many ingredients added"), HttpStatus.BAD_REQUEST);
		} catch (InvalidIngredientException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid ingredient added or invalid recipe name provided"), HttpStatus.BAD_REQUEST);
		} catch (PersistenceException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Duplicate recipe creation"), HttpStatus.BAD_REQUEST);
		} catch (NoDataWasChangedException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","No data was changed. Info may have been invalid."), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Removes an ingredient from a recipe.
	 * <p>
	 * Request must include the primary key of a <code>Recipe</code> as well as the name of the <code>Brand</code> to remove an ingredient from a recipe.
	 * @param request the request coming in to identify the user.
	 * @param recipe the recipe object that will have an ingredient removed from it.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request along
	 * with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/removeIngredientFromRecipe",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> removeIngredientFromRecipe(HttpServletRequest request, @RequestBody Recipe recipe) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		if (recipe.getBrands().size() != 1) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED", "Invalid number of ingredients"), HttpStatus.BAD_REQUEST);
		}
		if (recipe.getRecipeId() < 1) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid recipe ID"), HttpStatus.BAD_REQUEST);
		}
		try {
			recipeService.removeIngredientFromRecipe(recipe, user);
		} catch (InvalidPermissionsException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED", "Invalid permissions"), HttpStatus.BAD_REQUEST);
		} catch (NotEnoughRecipeIngredientsException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED", "Not enough ingredients in recipe!"), HttpStatus.BAD_REQUEST);
		} catch (InvalidIngredientException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid ingredient removed or invalid recipe name provided"), HttpStatus.BAD_REQUEST);
		} catch (NoDataWasChangedException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","No data was changed. Info may have been invalid."), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Loads a complete list of recipes.
	 * @return a <code>ResponseEntity</code> of type <code>List</code> of type <code>Recipe</code> of all recipes. It contains each recipe's
	 * information, information regarding the success or failure of request, along with an HTTP status code, 200 for success and 500 for an internal
	 * server error.
	 */
	@RequestMapping(value = "/getAllRecipes", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Recipe>> getAllRecipes() {
		List<Recipe> tempList = new ArrayList<Recipe>();
		List<Recipe> emptyList = new ArrayList<Recipe>();
		try {
			tempList = recipeService.getAllRecipes();
			for (Recipe recipe : tempList) {
				User user = new User();
				user.setUsername(recipe.getUser().getUsername());
				recipe.setUser(user);
			}
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<List<Recipe>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Recipe>>(tempList, HttpStatus.OK); 
	}

	/**
	 * Loads a list of recipes with a similar name.
	 * @param name the recipe name to search.
	 * @return a <code>ResponseEntity</code> of type <code>List</code> of type <code>Recipe</code> of recipes with a similar name. It contains each recipe's
	 * information, information regarding the success or failure of request, along with an HTTP status code, 200 for success and 500 for an internal
	 * server error.
	 */
	@RequestMapping(value = "/searchForRecipeByName", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Recipe>> searchForRecipeByName(@RequestParam("name") String name) {
		List<Recipe> tempList = new ArrayList<Recipe>();
		List<Recipe> emptyList = new ArrayList<Recipe>();
		if (name == null) {
			return new ResponseEntity<List<Recipe>>(emptyList, HttpStatus.BAD_REQUEST);
		}
		else if (name.isEmpty()) {
			return new ResponseEntity<List<Recipe>>(emptyList, HttpStatus.BAD_REQUEST);
		}
		name = "%" + name + "%";
		Recipe recipe = new Recipe(name);
		try {
			tempList = recipeService.searchForRecipeByName(recipe);
			for (Recipe r : tempList) {
				User user = new User();
				user.setUsername(r.getUser().getUsername());
				r.setUser(user);
			}
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<List<Recipe>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Recipe>>(tempList, HttpStatus.OK); 
	}

	/**
	 * Loads a list of recipes created by a user.
	 * @param request the request coming in to identify the user.
	 * @return a <code>ResponseEntity</code> of type <code>List</code> of type <code>Recipe</code> of recipes created by a user. It contains each recipe's
	 * information, information regarding the success or failure of request, along with an HTTP status code, 200 for success and 500 for an internal
	 * server error.
	 */
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
			for (Recipe recipe : tempList) {
				User u = new User();
				u.setUsername(recipe.getUser().getUsername());
				recipe.setUser(u);
			}
		} catch (UnknownServerErrorException e) {
			List<Recipe> emptyList = new ArrayList<Recipe>();
			return new ResponseEntity<List<Recipe>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Recipe>>(tempList, HttpStatus.OK);
	}

	/**
	 * Loads a list of recipes that a user can make based solely on the ingredients that the user has in their inventory.
	 * @param request the request coming in to identify the user.
	 * @return a <code>ResponseEntity</code> of type <code>List</code> of type <code>Recipe</code> of recipes that a user can make based solely on the ingredients that the user has in their inventory. It contains each recipe's
	 * information, information regarding the success or failure of request, along with an HTTP status code, 200 for success and 500 for an internal
	 * server error.
	 */
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
			for (Recipe recipe : tempList) {
				User u = new User();
				u.setUsername(recipe.getUser().getUsername());
				recipe.setUser(u);
			}
		} catch (UnknownServerErrorException e) {
			List<Recipe> emptyList = new ArrayList<Recipe>();
			return new ResponseEntity<List<Recipe>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Recipe>>(tempList, HttpStatus.OK);
	}

	/**
	 * Loads a list of recipes that a guest user can make based solely on the ingredients that the guest user has in their inventory.
	 * @param brands the brands (ingredients) in a guest user's inventory.
	 * @return a <code>ResponseEntity</code> of type <code>List</code> of type <code>Recipe</code> of recipes that a guest user can make based solely on the ingredients that the guest user has in their inventory. It contains each recipe's
	 * information, information regarding the success or failure of request, along with an HTTP status code, 200 for success and 500 for an internal
	 * server error.
	 */
	@RequestMapping(value = "/getAllRecipesAnonymousUserCanMake", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Recipe>> getAllRecipesAnonymousUserCanMake(@RequestParam("brands") List<Integer> brands) {
		List<Recipe> tempList = new ArrayList<Recipe>();
		List<Recipe> emptyList = new ArrayList<Recipe>();
		if (brands.size() < 1 || brands.size() > 20) {
			return new ResponseEntity<List<Recipe>>(emptyList, HttpStatus.BAD_REQUEST);
		}
		try {
			tempList = recipeService.getAllRecipesAnonymousUserCanMake(brands);
			for (Recipe recipe : tempList) {
				User user = new User();
				user.setUsername(recipe.getUser().getUsername());
				recipe.setUser(user);
			}
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<List<Recipe>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Recipe>>(tempList, HttpStatus.OK);
	}

	/**
	 * Loads a list of brands (ingredients) for a recipe.
	 * @param id the primary key of a recipe.
	 * @return a <code>ResponseEntity</code> of type <code>List</code> of type <code>Brand</code> of brands (ingredients) for a recipe. It contains each brand's
	 * information, information regarding the success or failure of request, along with an HTTP status code, 200 for success and 500 for an internal
	 * server error.
	 */
	@RequestMapping(value = "/getBrandsForRecipe", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Brand>> getBrandsForRecipe(@RequestParam("id") Integer id) {
		List<Brand> tempList = new ArrayList<Brand>();
		List<Brand> emptyList = new ArrayList<Brand>();
		if (id < 1) {
			return new ResponseEntity<List<Brand>>(emptyList, HttpStatus.BAD_REQUEST);
		}
		Recipe recipe = new Recipe(id);
		try {
			tempList = recipeService.getBrandsForRecipe(recipe);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<List<Brand>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Brand>>(tempList, HttpStatus.OK);
	}

}
