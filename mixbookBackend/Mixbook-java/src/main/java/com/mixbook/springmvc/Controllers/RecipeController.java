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

	@RequestMapping(value = "/getAllRecipes", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Recipe>> getAllRecipes() {
		List<Recipe> tempList = new ArrayList<Recipe>();
		List<Recipe> emptyList = new ArrayList<Recipe>();
		try {
			tempList = recipeService.getAllRecipes();
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<List<Recipe>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Recipe>>(tempList, HttpStatus.OK); 
	}

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
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<List<Recipe>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Recipe>>(tempList, HttpStatus.OK); 
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
	public ResponseEntity<List<Recipe>> getAllRecipesAnonymousUserCanMake(@RequestParam("brands") List<String> brands) {
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
