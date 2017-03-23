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

public interface RecipeDao {

	void createRecipe(Recipe recipe, User user) throws NullPointerException, PersistenceException, Exception;

	void editRecipe(Recipe recipe, User user) throws NoDataWasChangedException, Exception;

	void deleteRecipe(Recipe recipe, User user) throws NoDataWasChangedException, Exception;

	void addIngredientToRecipe(Recipe recipe, User user) throws InvalidPermissionsException, MaxRecipeIngredientsException, NullPointerException, PersistenceException, NoDataWasChangedException, Exception;

	void removeIngredientFromRecipe(Recipe recipe, User user) throws InvalidPermissionsException, NotEnoughRecipeIngredientsException, NullPointerException, NoDataWasChangedException, Exception;

	List<Recipe> searchForRecipeByName(Recipe recipe) throws Exception;

	List<Recipe> getAllRecipesCreatedByUser(User user) throws Exception;

	List<Recipe> getAllRecipesUserCanMake(User user) throws Exception;

	List<Recipe> getAllRecipesAnonymousUserCanMake(List<String> brands) throws Exception;

	List<Brand> getBrandsForRecipe(Recipe recipe) throws Exception;

}
