package com.mixbook.springmvc.Services;

import java.util.List;
import java.util.Set;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Exceptions.NotEnoughRecipeIngredientsException;
import com.mixbook.springmvc.Exceptions.InvalidIngredientException;
import com.mixbook.springmvc.Exceptions.InvalidPermissionsException;
import com.mixbook.springmvc.Exceptions.MaxRecipeIngredientsException;
import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Brand;

public interface RecipeService {

	void createRecipe(Recipe recipe, User user) throws InvalidIngredientException, PersistenceException, UnknownServerErrorException;

	void editRecipe(Recipe recipe, User user) throws NoDataWasChangedException, UnknownServerErrorException;

	void deleteRecipe(Recipe recipe, User user) throws NoDataWasChangedException, UnknownServerErrorException;

	void addIngredientToRecipe(Recipe recipe, User user) throws InvalidPermissionsException, MaxRecipeIngredientsException, InvalidIngredientException, PersistenceException, NoDataWasChangedException, UnknownServerErrorException;

	void removeIngredientFromRecipe(Recipe recipe, User user) throws InvalidPermissionsException, NotEnoughRecipeIngredientsException, InvalidIngredientException, NoDataWasChangedException, UnknownServerErrorException;

	List<Recipe> searchForRecipeByName(Recipe recipe) throws UnknownServerErrorException;

	List<Recipe> getAllRecipesCreatedByUser(User user) throws UnknownServerErrorException;

	List<Recipe> getAllRecipesUserCanMake(User user) throws UnknownServerErrorException;

	List<Recipe> getAllRecipesAnonymousUserCanMake(List<String> brands) throws UnknownServerErrorException;

	List<Brand> getBrandsForRecipe(Recipe recipe) throws UnknownServerErrorException;

	boolean isRecipeInfoValid(Recipe recipe) throws UnknownServerErrorException;

	boolean isRecipeNameValid(String recipe_name) throws UnknownServerErrorException;

	boolean areRecipeDirectionsValid(String directions) throws UnknownServerErrorException;

	boolean isRecipeNumberOfIngredientsValid(Set<Brand> brands);

	boolean isRecipeDifficultyValid(int difficulty);

}
