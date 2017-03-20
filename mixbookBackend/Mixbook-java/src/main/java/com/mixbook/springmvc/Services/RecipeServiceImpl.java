package com.mixbook.springmvc.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

import javax.persistence.PersistenceException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.RecipeDao;
import com.mixbook.springmvc.Exceptions.NotEnoughRecipeIngredientsException;
import com.mixbook.springmvc.Exceptions.InvalidIngredientException;
import com.mixbook.springmvc.Exceptions.InvalidPermissionsException;
import com.mixbook.springmvc.Exceptions.MaxRecipeIngredientsException;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;

@Service("recipeService")
@Transactional
public class RecipeServiceImpl implements RecipeService {

	@Autowired
	private RecipeDao dao;

	private static final String RECIPE_PATTERN = "^\\w+(\\w+)*$";

	public void createRecipe(Recipe recipe, User user) throws InvalidIngredientException, PersistenceException, UnknownServerErrorException {
		try {
			recipe.setNumberOfIngredients(recipe.getBrands().size());
			recipe.setNumberOfRatings(0);
			recipe.setTotalRating(0);
			dao.createRecipe(recipe, user);
		} catch (NullPointerException e) {
			throw new InvalidIngredientException("Invalid ingredient added!");
		} catch (PersistenceException e) {
			throw new PersistenceException();
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public void editRecipe(Recipe recipe, User user) throws UnknownServerErrorException {
		try {
			dao.editRecipe(recipe, user);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public void deleteRecipe(Recipe recipe, User user) throws UnknownServerErrorException {
		try {	
			dao.deleteRecipe(recipe, user);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public void addIngredientToRecipe(Recipe recipe, User user) throws InvalidPermissionsException, MaxRecipeIngredientsException, InvalidIngredientException, PersistenceException, UnknownServerErrorException {
		try {
			dao.addIngredientToRecipe(recipe, user);
		} catch (InvalidPermissionsException e) {
			throw new InvalidPermissionsException("Invalid permissions!");
		} catch (MaxRecipeIngredientsException e) {
			throw new MaxRecipeIngredientsException("Maximum number of ingredients in recipe exceeded!");
		} catch (NullPointerException e) {
			throw new InvalidIngredientException("Invalid ingredient added!");
		} catch (PersistenceException e) {
			throw new PersistenceException();
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public void removeIngredientFromRecipe(Recipe recipe, User user) throws InvalidPermissionsException, NotEnoughRecipeIngredientsException, InvalidIngredientException, UnknownServerErrorException {
		try {
			dao.removeIngredientFromRecipe(recipe, user);
		} catch (InvalidPermissionsException e) {
			throw new InvalidPermissionsException("Invalid permissions!");
		} catch (NotEnoughRecipeIngredientsException e) {
			throw new NotEnoughRecipeIngredientsException("Not enough ingredients in recipe!");
		} catch (NullPointerException e) {
			throw new InvalidIngredientException("Invalid ingredient deleted!");
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public List<Recipe> searchForRecipeByName(Recipe recipe) throws UnknownServerErrorException {
		try {
			List<Recipe> tempList = dao.searchForRecipeByName(recipe);
			return tempList;
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public List<Recipe> getAllRecipesCreatedByUser(User user) throws UnknownServerErrorException {
		List<Recipe> tempList = new ArrayList<Recipe>();
		try {
			tempList = dao.getAllRecipesCreatedByUser(user);
			return tempList;
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}	
	}

	public List<Recipe> getAllRecipesUserCanMake(User user) throws UnknownServerErrorException {
		List<Recipe> tempList = new ArrayList<Recipe>();
		try {
			tempList = dao.getAllRecipesUserCanMake(user);
			return tempList;
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}	
	}

	public List<Recipe> getAllRecipesAnonymousUserCanMake(List<Brand> brands) throws UnknownServerErrorException {
		List<Recipe> tempList = new ArrayList<Recipe>();
		try {
			tempList = dao.getAllRecipesAnonymousUserCanMake(brands);
			return tempList;
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public List<Brand> getBrandsForRecipe(Recipe recipe) throws UnknownServerErrorException {
		List<Brand> tempList = new ArrayList<Brand>();
		try {
			tempList = dao.getBrandsForRecipe(recipe);
			return tempList;
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public boolean isRecipeInfoValid(Recipe recipe) throws UnknownServerErrorException {
		try {
			if (!isRecipeNameValid(recipe.getRecipeName())) {
				return false;
			}
			if (!areRecipeDirectionsValid(recipe.getDirections())) {
				return false;
			}
			if (!isRecipeNumberOfIngredientsValid(recipe.getBrands())) {
				return false;
			}
			if (!isRecipeDifficultyValid(recipe.getDifficulty())) {
				return false;
			}
		} catch (UnknownServerErrorException e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
		return true;
	}

	public boolean isRecipeNameValid(String recipe_name) throws UnknownServerErrorException {
		if (recipe_name == null) {
			return false;
		}
		if (recipe_name.isEmpty()) {
			return false;
		}
		try {
			Pattern pattern = Pattern.compile(RECIPE_PATTERN, Pattern.UNICODE_CHARACTER_CLASS);
			Matcher matcher = pattern.matcher(recipe_name);
			if (recipe_name.length() > 63 || recipe_name.length() < 2 || !matcher.matches()) {
				return false;
			}
		} catch (PatternSyntaxException e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
		return true;
	}

	public boolean areRecipeDirectionsValid(String directions) throws UnknownServerErrorException {
		if (directions == null) {
			return false;
		}
		if (directions.isEmpty()) {
			return false;
		}
		if (directions.length() > 16383 || directions.length() < 2) {
			return false;
		}
		return true;
	}

	public boolean isRecipeNumberOfIngredientsValid(Set<Brand> brands) {
		if (brands.size() > 0 && brands.size() < 11) {
			return true;
		}
		else {
			return false;
		}
	}

	public boolean isRecipeDifficultyValid(int difficulty) {
		if (difficulty > 0 && difficulty < 6) {
			return true;
		}
		else {
			return false;
		}
	}

}
