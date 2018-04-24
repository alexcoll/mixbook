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

/**
 * Interface to provide modular service layer functionality for recipe related tasks for the controller layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface RecipeService {

	/**
	 * Creates a recipe.
	 * @param recipe the recipe to be created.
	 * @param user the user who is creating the recipe.
	 * @throws InvalidIngredientException the exception is thrown when a user tries to create a recipe with an invalid ingredient.
	 * @throws PersistenceException the exception is thrown when a user tries to create a duplicate recipe.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void createRecipe(Recipe recipe, User user) throws InvalidIngredientException, PersistenceException, UnknownServerErrorException;

	/**
	 * Edits a recipe.
	 * @param recipe the recipe to edit.
	 * @param user the user who is editing the recipe.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to edit a nonexistent recipe.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void editRecipe(Recipe recipe, User user) throws NoDataWasChangedException, UnknownServerErrorException;

	/**
	 * Deletes a recipe.
	 * @param recipe the recipe to delete.
	 * @param user the user deleting the recipe.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to delete a nonexistent recipe.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void deleteRecipe(Recipe recipe, User user) throws NoDataWasChangedException, UnknownServerErrorException;

	/**
	 * Adds an ingredient to a recipe.
	 * @param recipe the recipe for which to add an ingredient.
	 * @param user the user adding the ingredient to the recipe.
	 * @throws InvalidPermissionsException the exception is thrown when a user tries to add an ingredient to a recipe that they do not own.
	 * @throws MaxRecipeIngredientsException the exception is thrown when a user tries to add an ingredient to a recipe that already has the maximum amount of ingredients allowed.
	 * @throws InvalidIngredientException the exception is thrown when a user tries to add an invalid ingredient to a recipe.
	 * @throws PersistenceException the exception is thrown when a user tries to add a duplicate ingredient to a recipe.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to add an ingredient to a recipe that no longer exists.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void addIngredientToRecipe(Recipe recipe, User user) throws InvalidPermissionsException, MaxRecipeIngredientsException, InvalidIngredientException, PersistenceException, NoDataWasChangedException, UnknownServerErrorException;

	/**
	 * Removes an ingredient from a recipe.
	 * @param recipe the recipe from which to remove an ingredient.
	 * @param user the user removing the ingredient from the recipe.
	 * @throws InvalidPermissionsException the exception is thrown when a user tries to remove an ingredient from a recipe that they do not own.
	 * @throws NotEnoughRecipeIngredientsException the exception is thrown when a user tries to remove an ingredient from a recipe with no ingredients.
	 * @throws InvalidIngredientException the exception is thrown when a user tries to remove an invalid ingredient from a recipe.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to remove an ingredient from a recipe that no longer exists.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void removeIngredientFromRecipe(Recipe recipe, User user) throws InvalidPermissionsException, NotEnoughRecipeIngredientsException, InvalidIngredientException, NoDataWasChangedException, UnknownServerErrorException;

	/**
	 * Loads a complete list of recipes.
	 * @return a complete list of recipes.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	List<Recipe> getAllRecipes() throws UnknownServerErrorException;

	/**
	 * Searches for a recipe by name.
	 * @param recipe the recipe for which to search.
	 * @return recipes that are similar to the name of the recipe that was searched.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	List<Recipe> searchForRecipeByName(Recipe recipe) throws UnknownServerErrorException;

	/**
	 * Loads a complete list of recipes created by the user.
	 * @param user the user who create the recipes.
	 * @return a complete list of recipes created by the user.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	List<Recipe> getAllRecipesCreatedByUser(User user) throws UnknownServerErrorException;

	/**
	 * Loads a list of recipes that a user can make with only the ingredients that they have in their inventory.
	 * @param user the user for whom to find recipes.
	 * @return a list of recipes that a user can make with only the ingredients that they have in their inventory.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	List<Recipe> getAllRecipesUserCanMake(User user) throws UnknownServerErrorException;

	/**
	 * Loads a list of recipes that a guest user can make with only the ingredients that they have in their inventory.
	 * @param brands the ingredients that the guest user has in their inventory.
	 * @return a list of recipes that a guest user can make with only the ingredients that they have in their inventory.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	List<Recipe> getAllRecipesAnonymousUserCanMake(List<Integer> brands) throws UnknownServerErrorException;

	/**
	 * Loads the ingredients for a recipe.
	 * @param recipe the recipe for which to load its ingredients.
	 * @return the ingredients for the recipe.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	List<Brand> getBrandsForRecipe(Recipe recipe) throws UnknownServerErrorException;

	/**
	 * Determines if a recipe's information is valid.
	 * @param recipe the recipe to validate.
	 * @return true if a recipe's information is all valid, or false if any one piece of information is invalid.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	boolean isRecipeInfoValid(Recipe recipe) throws UnknownServerErrorException;

	/**
	 * Determines if a recipe's name is valid.
	 * @param recipeName the recipe name to validate.
	 * @return true if a recipe's name is valid, or false if it is not valid.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	boolean isRecipeNameValid(String recipeName) throws UnknownServerErrorException;

	/**
	 * Determines if a recipe's directions are valid.
	 * @param directions the directions of a recipe to validate.
	 * @return true if a recipe's directions are valid, or false if they are not valid.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	boolean areRecipeDirectionsValid(String directions) throws UnknownServerErrorException;

	/**
	 * Determines if a recipe's number of ingredients is valid.
	 * @param brands the ingredients to be part of a recipe that need to be counted to ensure that there is a valid number of ingredients.
	 * @return true if a recipe's number of ingredients is valid, or false if it is not valid.
	 */
	boolean isRecipeNumberOfIngredientsValid(Set<Brand> brands);

	/**
	 * Determines if a recipe's difficulty is valid.
	 * @param difficulty the recipe's difficulty to validate.
	 * @return true if a recipe's difficulty is valid, or false if it is not valid.
	 */
	boolean isRecipeDifficultyValid(int difficulty);

}
