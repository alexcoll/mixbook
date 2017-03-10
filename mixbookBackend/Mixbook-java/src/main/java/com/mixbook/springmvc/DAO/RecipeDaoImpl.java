package com.mixbook.springmvc.DAO;

import java.util.List;

import javax.persistence.PersistenceException;

import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Exceptions.MaxRecipeIngredientsException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;

@Repository("recipeDao")
public class RecipeDaoImpl extends AbstractDao<Integer, Recipe> implements RecipeDao {

	public void createRecipe(Recipe recipe, User user) throws MaxRecipeIngredientsException, NullPointerException, PersistenceException, Exception {
		
	}

	public void editRecipe(Recipe recipe, User user) throws Exception {

	}

	public void deleteRecipe(Recipe recipe, User user) throws Exception {

	}

	public void addIngredientToRecipe(Recipe recipe, User user) throws MaxRecipeIngredientsException, NullPointerException, PersistenceException, Exception {

	}

	public void removeIngredientFromRecipe(Recipe recipe, User user) throws NullPointerException, Exception {

	}

	public Recipe searchForRecipeByName(Recipe recipe) throws Exception {
		return null;
	}

	public List<Recipe> getAllRecipesCreatedByUser(User user) throws Exception {
		return null;
	}

	public List<Recipe> getAllRecipesUserCanMake(User user) throws Exception {
		return null;
	}

	public List<Recipe> getAllRecipesAnonymousUserCanMake(List<Brand> brands) throws Exception {
		return null;
	}

}
