package com.mixbook.springmvc.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.RecipeDao;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;

@Service("recipeService")
@Transactional
public class RecipeServiceImpl implements RecipeService {

	@Autowired
	private RecipeDao dao;

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
