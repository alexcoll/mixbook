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

import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.IntegerType;

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
			Query q = getSession().createQuery("update Recipe set directions = :directions, difficulty = :difficulty where recipe_id = :recipe_id AND user_recipe_id = :user_recipe_id");
			q.setParameter("directions", recipe.getDirections());
			q.setParameter("difficulty", recipe.getDifficulty());
			q.setParameter("recipe_id", recipe.getRecipeId());
			q.setParameter("user_recipe_id", user.getUserId());
			int numRowsAffected = q.executeUpdate();
			if (numRowsAffected < 1) {
				throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
			}
		}
		//Updating recipe directions
		else if (recipe.getDirections() != null) {
			Query q = getSession().createQuery("update Recipe set directions = :directions where recipe_id = :recipe_id AND user_recipe_id = :user_recipe_id");
			q.setParameter("directions", recipe.getDirections());
			q.setParameter("recipe_id", recipe.getRecipeId());
			q.setParameter("user_recipe_id", user.getUserId());
			int numRowsAffected = q.executeUpdate();
			if (numRowsAffected < 1) {
				throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
			}
		}
		//Updating recipe difficulty
		else if (recipe.getDifficulty() != 0) {
			Query q = getSession().createQuery("update Recipe set difficulty = :difficulty where recipe_id = :recipe_id AND user_recipe_id = :user_recipe_id");
			q.setParameter("difficulty", recipe.getDifficulty());
			q.setParameter("recipe_id", recipe.getRecipeId());
			q.setParameter("user_recipe_id", user.getUserId());
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
		Query query = getSession().createQuery("delete Recipe where recipe_id = :recipe_id AND user_recipe_id = :user_recipe_id");
		query.setParameter("recipe_id", recipe.getRecipeId());
		query.setParameter("user_recipe_id", user.getUserId());
		int numRowsAffected = query.executeUpdate();
		if (numRowsAffected < 1) {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		}
	}

	public void addIngredientToRecipe(Recipe recipe, User user) throws InvalidPermissionsException, MaxRecipeIngredientsException, NullPointerException, PersistenceException, NoDataWasChangedException, Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		SQLQuery countQuery = getSession().createSQLQuery("SELECT number_of_ingredients as result FROM recipe WHERE recipe_id = :recipe_id AND user_recipe_id = :user_recipe_id").setParameter("recipe_id", recipe.getRecipeId()).setParameter("user_recipe_id", user.getUserId());
		countQuery.addScalar("result", new IntegerType());
		Integer tempNum = (Integer) countQuery.uniqueResult();
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
		SQLQuery searchQuery = getSession().createSQLQuery("SELECT brand_id FROM brand WHERE brand_name = ?");
		searchQuery.setParameter(0, tempBrand.getBrandName());
		Integer brandId = ((BigInteger) searchQuery.uniqueResult()).intValue();
		tempBrand.setBrandId(brandId);
		SQLQuery insertQuery = getSession().createSQLQuery("" + "INSERT INTO recipe_has_brand(recipe_recipe_id,brand_brand_id)VALUES(?,?)");
		insertQuery.setParameter(0, recipe.getRecipeId());
		insertQuery.setParameter(1, tempBrand.getBrandId());
		int numRowsAffected = insertQuery.executeUpdate();
		if (numRowsAffected > 0) {
			SQLQuery updateQuery = getSession().createSQLQuery("UPDATE recipe SET number_of_ingredients = number_of_ingredients + 1 WHERE recipe_id = ?");
			updateQuery.setParameter(0, recipe.getRecipeId());
			updateQuery.executeUpdate();
		}
		else {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		}
	}

	public void removeIngredientFromRecipe(Recipe recipe, User user) throws InvalidPermissionsException, NotEnoughRecipeIngredientsException, NullPointerException, NoDataWasChangedException, Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		SQLQuery countQuery = getSession().createSQLQuery("SELECT number_of_ingredients as result FROM recipe WHERE recipe_id = :recipe_id AND user_recipe_id = :user_recipe_id").setParameter("recipe_id", recipe.getRecipeId()).setParameter("user_recipe_id", user.getUserId());
		countQuery.addScalar("result", new IntegerType());
		Integer tempNum = (Integer) countQuery.uniqueResult();
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
		SQLQuery searchQuery = getSession().createSQLQuery("SELECT brand_id FROM brand WHERE brand_name = ?");
		searchQuery.setParameter(0, tempBrand.getBrandName());
		Integer brandId = ((BigInteger) searchQuery.uniqueResult()).intValue();
		tempBrand.setBrandId(brandId);
		SQLQuery deleteQuery = getSession().createSQLQuery("DELETE FROM recipe_has_brand WHERE recipe_recipe_id=:recipe_recipe_id AND brand_brand_id=:brand_brand_id").setParameter("recipe_recipe_id", recipe.getRecipeId()).setParameter("brand_brand_id", tempBrand.getBrandId());
		int numRowsAffected = deleteQuery.executeUpdate();
		if (numRowsAffected > 0) {
			SQLQuery updateQuery = getSession().createSQLQuery("UPDATE recipe SET number_of_ingredients = number_of_ingredients - 1 WHERE recipe_id = ?");
			updateQuery.setParameter(0, recipe.getRecipeId());
			updateQuery.executeUpdate();
		}
		else {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		}
	}

	public List<Recipe> getAllRecipes() throws Exception {
		SQLQuery query = getSession().createSQLQuery("SELECT r.recipe_id, r.recipe_name, r.directions, r.number_of_ingredients, r.difficulty, r.number_of_ratings, r.total_rating, u.username FROM recipe AS r INNER JOIN users AS u ON r.user_recipe_id = u.user_id");
		List result = query.list();
		return result;
	}

	public List<Recipe> searchForRecipeByName(Recipe recipe) throws Exception {
		SQLQuery query = getSession().createSQLQuery("SELECT r.recipe_id, r.recipe_name, r.directions, r.number_of_ingredients, r.difficulty, r.number_of_ratings, r.total_rating, u.username FROM recipe AS r INNER JOIN users AS u ON r.user_recipe_id = u.user_id WHERE r.recipe_name LIKE ?").setParameter(0, recipe.getRecipeName());
		List result = query.list();
		return result;
	}

	public List<Recipe> getAllRecipesCreatedByUser(User user) throws Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		SQLQuery query = getSession().createSQLQuery("SELECT recipe_id, recipe_name, directions, number_of_ingredients, difficulty, number_of_ratings, total_rating FROM recipe WHERE user_recipe_id = ?").setParameter(0, user.getUserId());
		List result = query.list();
		return result;
	}

	public List<Recipe> getAllRecipesUserCanMake(User user) throws Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		SQLQuery query = getSession().createSQLQuery("SELECT r.recipe_id, r.recipe_name, r.directions, r.number_of_ingredients, r.difficulty, r.number_of_ratings, r.total_rating, u.username FROM recipe AS r INNER JOIN users AS u ON r.user_recipe_id = u.user_id WHERE recipe_id NOT IN (SELECT recipe_recipe_id FROM recipe_has_brand WHERE brand_brand_id NOT IN (SELECT brand_brand_id FROM user_has_brand WHERE user_user_id = ?))");
		query.setParameter(0, user.getUserId());
		List<Recipe> recipeList = query.getResultList();
		return recipeList;
	}

	public List<Recipe> getAllRecipesAnonymousUserCanMake(List<String> brands) throws Exception {
		SQLQuery query = getSession().createSQLQuery("SELECT r.recipe_id, r.recipe_name, r.directions, r.number_of_ingredients, r.difficulty, r.number_of_ratings, r.total_rating, u.username FROM recipe AS r INNER JOIN users AS u ON r.user_recipe_id = u.user_id WHERE recipe_id NOT IN (SELECT recipe_recipe_id FROM recipe_has_brand WHERE brand_brand_id NOT IN (SELECT brand_id FROM brand WHERE brand_name IN (:brands)))");
		query.setParameterList("brands", brands);
		List<Recipe> recipeList = query.getResultList();
		return recipeList;
	}

	public List<Brand> getBrandsForRecipe(Recipe recipe) throws Exception {
		SQLQuery query = getSession().createSQLQuery("SELECT brand_name FROM brand INNER JOIN recipe_has_brand ON brand.brand_id = recipe_has_brand.brand_brand_id WHERE recipe_has_brand.recipe_recipe_id = ?").setParameter(0, recipe.getRecipeId());
		List result = query.list();
		return result;
	}

}
