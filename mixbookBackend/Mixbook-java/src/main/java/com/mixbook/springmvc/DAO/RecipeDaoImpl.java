package com.mixbook.springmvc.DAO;

import java.math.BigInteger;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.PersistenceException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.hibernate.query.NativeQuery;
import org.hibernate.query.Query;
import com.mixbook.springmvc.Exceptions.InvalidPermissionsException;
import com.mixbook.springmvc.Exceptions.MaxRecipeIngredientsException;
import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Exceptions.NotEnoughRecipeIngredientsException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Services.UserService;

@Repository("recipeDao")
public class RecipeDaoImpl extends AbstractDao<Integer, Recipe> implements RecipeDao {

	@Autowired
	UserService userService;

	private static final Logger logger = LogManager.getLogger(RecipeDaoImpl.class);

	public void createRecipe(Recipe recipe, User user) throws NullPointerException, PersistenceException, Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		Set<String> brandName = new HashSet<String>(recipe.getBrands().size());
		Set<Brand> temp = recipe.getBrands();
		for (Brand brand : temp) {
			brandName.add(brand.getBrandName());
		}
		Query searchQuery = getSession().createQuery("FROM Brand brand WHERE brand.brandName IN (:brandNames)");
		searchQuery.setParameterList("brandNames", brandName);
		List<Brand> brandList = searchQuery.getResultList();
		if (brandList.size() != recipe.getBrands().size()) {
			throw new NullPointerException("Invalid ingredient added!");
		}
		recipe.setUser(user);
		Set<Brand> brandIds = new HashSet<Brand>(brandList);
		recipe.setBrands(brandIds);
		persist(recipe);
		NativeQuery q = getSession().createNativeQuery("UPDATE users SET number_of_recipes = number_of_recipes + 1 WHERE user_id = :user_id");
		q.setParameter("user_id", user.getUserId());
		q.executeUpdate();
	}

	public void editRecipe(Recipe recipe, User user) throws NoDataWasChangedException, Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		//Updating both recipe directions and recipe difficulty
		if (recipe.getDirections() != null && recipe.getDifficulty() != 0) {
			Query q = getSession().createQuery("update Recipe r set r.directions = :directions, r.difficulty = :difficulty where r.recipeId = :recipeId AND r.user.userId = :userRecipeId");
			q.setParameter("directions", recipe.getDirections());
			q.setParameter("difficulty", recipe.getDifficulty());
			q.setParameter("recipeId", recipe.getRecipeId());
			q.setParameter("userRecipeId", user.getUserId());
			int numRowsAffected = q.executeUpdate();
			if (numRowsAffected < 1) {
				throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
			}
		}
		//Updating recipe directions
		else if (recipe.getDirections() != null) {
			Query q = getSession().createQuery("update Recipe r set r.directions = :directions where r.recipeId = :recipeId AND r.user.userId = :userRecipeId");
			q.setParameter("directions", recipe.getDirections());
			q.setParameter("recipeId", recipe.getRecipeId());
			q.setParameter("userRecipeId", user.getUserId());
			int numRowsAffected = q.executeUpdate();
			if (numRowsAffected < 1) {
				throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
			}
		}
		//Updating recipe difficulty
		else if (recipe.getDifficulty() != 0) {
			Query q = getSession().createQuery("update Recipe r set r.difficulty = :difficulty where r.recipeId = :recipeId AND r.user.userId = :userRecipeId");
			q.setParameter("difficulty", recipe.getDifficulty());
			q.setParameter("recipeId", recipe.getRecipeId());
			q.setParameter("userRecipeId", user.getUserId());
			int numRowsAffected = q.executeUpdate();
			if (numRowsAffected < 1) {
				throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
			}
		}
		//All fields were null/invalid
		else {
			logger.error("Invalid request! Nothing was received to update!");
		}
	}

	public void deleteRecipe(Recipe recipe, User user) throws NoDataWasChangedException, Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		Query query = getSession().createQuery("delete Recipe r where r.recipeId = :recipeId AND r.user.userId = :userRecipeId");
		query.setParameter("recipeId", recipe.getRecipeId());
		query.setParameter("userRecipeId", user.getUserId());
		int numRowsAffected = query.executeUpdate();
		if (numRowsAffected < 1) {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		}
	}

	public void addIngredientToRecipe(Recipe recipe, User user) throws InvalidPermissionsException, MaxRecipeIngredientsException, NullPointerException, PersistenceException, NoDataWasChangedException, Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		NativeQuery countQuery = getSession().createNativeQuery("SELECT number_of_ingredients as result FROM recipe WHERE recipe_id = :recipe_id AND user_recipe_id = :user_recipe_id");
		countQuery.setParameter("recipe_id", recipe.getRecipeId());
		countQuery.setParameter("user_recipe_id", user.getUserId());
		Integer tempNum = (Integer) countQuery.getSingleResult();
		int numberOfIngredients = tempNum.intValue();
		if (numberOfIngredients == 0) {
			throw new InvalidPermissionsException("Invalid permissions!");
		}
		if (numberOfIngredients == 10) {
			throw new MaxRecipeIngredientsException("Maximum number of ingredients in recipe exceeded!");
		}
		Set<Brand> brands = recipe.getBrands();
		Brand tempBrand = null;
		for (Brand brand : brands) {
			tempBrand = brand;
			break;
		}
		NativeQuery searchQuery = getSession().createNativeQuery("SELECT brand_id FROM brand WHERE brand_name = :brand_name");
		searchQuery.setParameter("brand_name", tempBrand.getBrandName());
		Integer brandId = ((BigInteger) searchQuery.getSingleResult()).intValue();
		tempBrand.setBrandId(brandId);
		NativeQuery insertQuery = getSession().createNativeQuery("INSERT INTO recipe_has_brand (recipe_recipe_id, brand_brand_id) VALUES (:recipe_recipe_id, :brand_brand_id)");
		insertQuery.setParameter("recipe_recipe_id", recipe.getRecipeId());
		insertQuery.setParameter("brand_brand_id", tempBrand.getBrandId());
		int numRowsAffected = insertQuery.executeUpdate();
		if (numRowsAffected > 0) {
			NativeQuery updateQuery = getSession().createNativeQuery("UPDATE recipe SET number_of_ingredients = number_of_ingredients + 1 WHERE recipe_id = :recipe_id");
			updateQuery.setParameter("recipe_id", recipe.getRecipeId());
			updateQuery.executeUpdate();
		}
		else {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		}
	}

	public void removeIngredientFromRecipe(Recipe recipe, User user) throws InvalidPermissionsException, NotEnoughRecipeIngredientsException, NullPointerException, NoDataWasChangedException, Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		NativeQuery countQuery = getSession().createNativeQuery("SELECT number_of_ingredients as result FROM recipe WHERE recipe_id = :recipe_id AND user_recipe_id = :user_recipe_id");
		countQuery.setParameter("recipe_id", recipe.getRecipeId());
		countQuery.setParameter("user_recipe_id", user.getUserId());
		Integer tempNum = (Integer) countQuery.getSingleResult();
		int numberOfIngredients = tempNum.intValue();
		if (numberOfIngredients == 0) {
			throw new InvalidPermissionsException("Invalid permissions!");
		}
		if (numberOfIngredients == 1) {
			throw new NotEnoughRecipeIngredientsException("Not enough ingredients in recipe!");
		}
		Set<Brand> brands = recipe.getBrands();
		Brand tempBrand = null;
		for (Brand brand : brands) {
			tempBrand = brand;
			break;
		}
		NativeQuery searchQuery = getSession().createNativeQuery("SELECT brand_id FROM brand WHERE brand_name = :brand_name");
		searchQuery.setParameter("brand_name", tempBrand.getBrandName());
		Integer brandId = ((BigInteger) searchQuery.getSingleResult()).intValue();
		tempBrand.setBrandId(brandId);
		NativeQuery deleteQuery = getSession().createNativeQuery("DELETE FROM recipe_has_brand WHERE recipe_recipe_id = :recipe_recipe_id AND brand_brand_id = :brand_brand_id");
		deleteQuery.setParameter("recipe_recipe_id", recipe.getRecipeId());
		deleteQuery.setParameter("brand_brand_id", tempBrand.getBrandId());
		int numRowsAffected = deleteQuery.executeUpdate();
		if (numRowsAffected > 0) {
			NativeQuery updateQuery = getSession().createNativeQuery("UPDATE recipe SET number_of_ingredients = number_of_ingredients - 1 WHERE recipe_id = :recipe_id");
			updateQuery.setParameter("recipe_id", recipe.getRecipeId());
			updateQuery.executeUpdate();
		}
		else {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		}
	}

	public List<Recipe> getAllRecipes() throws Exception {
		Query q = getSession().createQuery("select r from Recipe r inner join fetch r.user");
		List<Recipe> result = (List<Recipe>) q.getResultList();
		return result;
	}

	public List<Recipe> searchForRecipeByName(Recipe recipe) throws Exception {
		Query q = getSession().createQuery("select r from Recipe r inner join fetch r.user where r.recipeName like :recipeName");
		q.setParameter("recipeName", recipe.getRecipeName());
		List<Recipe> result = (List<Recipe>) q.getResultList();
		return result;
	}

	public List<Recipe> getAllRecipesCreatedByUser(User user) throws Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		Query q = getSession().createQuery("select r from Recipe r where r.user.userId = :userId");
		q.setParameter("userId", user.getUserId());
		List<Recipe> result = (List<Recipe>) q.getResultList();
		return result;
	}

	public List<Recipe> getAllRecipesUserCanMake(User user) throws Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		Query q = getSession().createQuery("select r from Recipe r inner join fetch r.user where r.recipeId not in (select rb.recipeId from Recipe rb join rb.brands b where b.brandId not in (select br.brandId from Brand br join br.users us where us.userId = :userId))");
		q.setParameter("userId", user.getUserId());
		List<Recipe> result = (List<Recipe>) q.getResultList();
		return result;
	}

	public List<Recipe> getAllRecipesAnonymousUserCanMake(List<Integer> brands) throws Exception {
		Query q = getSession().createQuery("select r from Recipe r inner join fetch r.user where r.recipeId not in (select rb.recipeId from Recipe rb join rb.brands b where b.brandId not in (:brands))");
		q.setParameter("brands", brands);
		List<Recipe> result = (List<Recipe>) q.getResultList();
		return result;
	}

	public List<Brand> getBrandsForRecipe(Recipe recipe) throws Exception {
		Query q = getSession().createQuery("select b from Brand b inner join b.recipes r where r.recipeId = :recipeId");
		q.setParameter("recipeId", recipe.getRecipeId());
		List<Brand> result = (List<Brand>) q.getResultList();
		return result;
	}

}
