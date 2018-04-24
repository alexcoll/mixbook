package com.mixbook.springmvc.DAO;

import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.InvalidPermissionsException;
import com.mixbook.springmvc.Exceptions.MaxRecipeIngredientsException;
import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Exceptions.NotEnoughRecipeIngredientsException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;

/**
 * Interface to provide modular data layer functionality for recipe related tasks for the service layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface RecipeDao {

	/**
	 * Creates a recipe.
	 * @param recipe the recipe to be created.
	 * @param user the user who is creating the recipe.
	 * @throws NullPointerException the exception is thrown when the data provided yields null results.
	 * @throws PersistenceException the exception is thrown when a user tries to create a duplicate recipe.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void createRecipe(Recipe recipe, User user) throws NullPointerException, PersistenceException, Exception;

	/**
	 * Edits a recipe.
	 * @param recipe the recipe to edit.
	 * @param user the user who is editing the recipe.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to edit a nonexistent recipe.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void editRecipe(Recipe recipe, User user) throws NoDataWasChangedException, Exception;

	/**
	 * Deletes a recipe.
	 * @param recipe the recipe to delete.
	 * @param user the user deleting the recipe.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to delete a nonexistent recipe.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void deleteRecipe(Recipe recipe, User user) throws NoDataWasChangedException, Exception;

	/**
	 * Adds an ingredient to a recipe.
	 * @param recipe the recipe for which to add an ingredient.
	 * @param user the user adding the ingredient to the recipe.
	 * @throws InvalidPermissionsException the exception is thrown when a user tries to add an ingredient to a recipe that they do not own.
	 * @throws MaxRecipeIngredientsException the exception is thrown when a user tries to add an ingredient to a recipe that already has the maximum amount of ingredients allowed.
	 * @throws NullPointerException the exception is thrown when the data provided yields null results.
	 * @throws PersistenceException the exception is thrown when a user tries to add a duplicate ingredient to a recipe.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to add an ingredient to a recipe that no longer exists.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void addIngredientToRecipe(Recipe recipe, User user) throws InvalidPermissionsException, MaxRecipeIngredientsException, NullPointerException, PersistenceException, NoDataWasChangedException, Exception;

	/**
	 * Removes an ingredient from a recipe.
	 * @param recipe the recipe from which to remove an ingredient.
	 * @param user the user removing the ingredient from the recipe.
	 * @throws InvalidPermissionsException the exception is thrown when a user tries to remove an ingredient from a recipe that they do not own.
	 * @throws NotEnoughRecipeIngredientsException the exception is thrown when a user tries to remove an ingredient from a recipe with no ingredients.
	 * @throws NullPointerException the exception is thrown when the data provided yields null results.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to remove an ingredient from a recipe that no longer exists.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void removeIngredientFromRecipe(Recipe recipe, User user) throws InvalidPermissionsException, NotEnoughRecipeIngredientsException, NullPointerException, NoDataWasChangedException, Exception;

	/**
	 * Loads a complete list of recipes.
	 * @return a complete list of recipes.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	List<Recipe> getAllRecipes() throws Exception;

	/**
	 * Searches for a recipe by name.
	 * @param recipe the recipe for which to search.
	 * @return recipes that are similar to the name of the recipe that was searched.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	List<Recipe> searchForRecipeByName(Recipe recipe) throws Exception;

	/**
	 * Loads a complete list of recipes created by the user.
	 * @param user the user who create the recipes.
	 * @return a complete list of recipes created by the user.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	List<Recipe> getAllRecipesCreatedByUser(User user) throws Exception;

	/**
	 * Loads a list of recipes that a user can make with only the ingredients that they have in their inventory.
	 * @param user the user for whom to find recipes.
	 * @return a list of recipes that a user can make with only the ingredients that they have in their inventory.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	List<Recipe> getAllRecipesUserCanMake(User user) throws Exception;

	/**
	 * Loads a list of recipes that a guest user can make with only the ingredients that they have in their inventory.
	 * @param brands the ingredients that the guest user has in their inventory.
	 * @return a list of recipes that a guest user can make with only the ingredients that they have in their inventory.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	List<Recipe> getAllRecipesAnonymousUserCanMake(List<Integer> brands) throws Exception;

	/**
	 * Loads the ingredients for a recipe.
	 * @param recipe the recipe for which to load its ingredients.
	 * @return the ingredients for the recipe.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	List<Brand> getBrandsForRecipe(Recipe recipe) throws Exception;

}
