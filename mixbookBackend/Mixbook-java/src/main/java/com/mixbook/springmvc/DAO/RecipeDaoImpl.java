package com.mixbook.springmvc.DAO;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;

@Repository("recipeDao")
public class RecipeDaoImpl extends AbstractDao<Integer, Recipe> implements RecipeDao {

	public void createRecipe(Recipe recipe) {

	}

	public void editRecipe(Recipe recipe) {

	}

	public void deleteRecipe(Recipe recipe) {

	}

	public void addIngredientToRecipe(Recipe recipe) {

	}

	public void removeIngredientFromRecipe(Recipe recipe) {

	}

	public Recipe searchForRecipeByName(Recipe recipe) {
		return null;
	}

	public List<Recipe> getAllRecipesCreatedByUser(User user) {
		return null;
	}

	public List<Recipe> getAllRecipesUserCanMake(User user) {
		return null;
	}

	public List<Recipe> getAllRecipesAnonymousUserCanMake(List<Brand> brands) {
		return null;
	}

}
