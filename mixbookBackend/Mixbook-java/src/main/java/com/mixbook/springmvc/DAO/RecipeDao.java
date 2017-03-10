package com.mixbook.springmvc.DAO;

import java.util.List;

import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;

public interface RecipeDao {

	void createRecipe(Recipe recipe);

	void editRecipe(Recipe recipe);

	void deleteRecipe(Recipe recipe);

	void addIngredientToRecipe(Recipe recipe);

	void removeIngredientFromRecipe(Recipe recipe);

	Recipe searchForRecipeByName(Recipe recipe);

	List<Recipe> getAllRecipesCreatedByUser(User user);

	List<Recipe> getAllRecipesUserCanMake(User user);

	List<Recipe> getAllRecipesAnonymousUserCanMake(List<Brand> brands);

}
