package com.mixbook.springmvc.DAO;

import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.MaxRecipeIngredientsException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;

public interface RecipeDao {

	void createRecipe(Recipe recipe, User user) throws MaxRecipeIngredientsException, NullPointerException, PersistenceException, Exception;

	void editRecipe(Recipe recipe, User user) throws Exception;

	void deleteRecipe(Recipe recipe, User user) throws Exception;

	void addIngredientToRecipe(Recipe recipe, User user) throws MaxRecipeIngredientsException, NullPointerException, PersistenceException, Exception;

	void removeIngredientFromRecipe(Recipe recipe, User user) throws NullPointerException, Exception;

	Recipe searchForRecipeByName(Recipe recipe) throws Exception;

	List<Recipe> getAllRecipesCreatedByUser(User user) throws Exception;

	List<Recipe> getAllRecipesUserCanMake(User user) throws Exception;

	List<Recipe> getAllRecipesAnonymousUserCanMake(List<Brand> brands) throws Exception;

}
