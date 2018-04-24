package com.mixbook.springmvc.Models;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * Models a recipe.
 * @author John Tyler Preston
 * @version 1.0
 */
@Entity
@Table(name="recipe")
@JsonInclude(Include.NON_EMPTY)
public class Recipe implements Serializable {

	/**
	 * Primary key of the Recipe table.
	 */
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "recipe_id", nullable = false)
	private Integer recipeId;

	/**
	 * Name of the recipe.
	 */
	@NotNull
	@Size(max=255)   
	@Column(name = "recipe_name", nullable = false)
	private String recipeName;

	/**
	 * Directions of the recipe.
	 */
	@Column(name = "directions", nullable = false)
	private String directions;

	/**
	 * Number of ingredients of the recipe.
	 */
	@Column(name = "number_of_ingredients", nullable = false)
	private int numberOfIngredients;

	/**
	 * Difficulty of the recipe, ranging from 1 to 5, with 1 being the easiest and 5 being the hardest.
	 */
	@Column(name = "difficulty", nullable = false)
	private int difficulty;

	/**
	 * Number of ratings of the recipe.
	 */
	@Column(name = "number_of_ratings", nullable = false)
	private int numberOfRatings;

	/**
	 * Total (sum) of the ratings of the recipe.
	 */
	@Column(name = "total_rating", nullable = false)
	private int totalRating;

	/**
	 * User who created the recipe.
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_recipe_id", nullable = false)
	private User user;

	/**
	 * Brands (ingredients) of the recipe.
	 */
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "recipe_has_brand", joinColumns = {
			@JoinColumn(name = "recipe_recipe_id", nullable = false, updatable = false) },
	inverseJoinColumns = { @JoinColumn(name = "brand_brand_id",
	nullable = false, updatable = false) })
	private Set<Brand> brands = new HashSet<Brand>(0);

	/**
	 * Reviews of the recipe.
	 */
	@OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY)
	private Set<UserRecipeHasReview> userRecipeHasReviews = new HashSet<UserRecipeHasReview>(0);

	/**
	 * Recommendations of the recipe.
	 */
	@OneToMany(mappedBy = "recommendedRecipe", fetch = FetchType.LAZY)
	private Set<Recommendation> recommendations = new HashSet<Recommendation>(0);

	/**
	 * Default empty constructor of a recipe to suit Jackson's requirement.
	 */
	public Recipe() {

	}

	/**
	 * Constructs an instance of a recipe.
	 * @param recipeId the primary key of the recipe.
	 */
	public Recipe(Integer recipeId) {
		this.recipeId = recipeId;
	}

	/**
	 * Constructs an instance of a recipe.
	 * @param recipeName the name of the recipe.
	 */
	public Recipe(String recipeName) {
		this.recipeName = recipeName;
	}

	/**
	 * Constructs an instance of a recipe.
	 * @param recipeId the primary key of the recipe.
	 * @param recipeName the name of the recipe.
	 * @param directions the directions of the recipe.
	 * @param numberOfIngredients the number of ingredients of the recipe.
	 * @param difficulty the difficulty of the recipe.
	 * @param numberOfRatings the number of ratings of the recipe.
	 * @param totalRating the total (sum) of the ratings of the recipe.
	 * @param user the user who created the recipe.
	 * @param brands the brands (ingredients) of the recipe.
	 * @param userRecipeHasReviews the reviews of the recipe.
	 * @param recommendations the recommendations of the recipe.
	 */
	public Recipe(Integer recipeId, String recipeName, String directions,
			int numberOfIngredients, int difficulty, int numberOfRatings,
			int	totalRating, User user, Set<Brand> brands, Set<UserRecipeHasReview> userRecipeHasReviews,
			Set<Recommendation> recommendations) {
		this.recipeId = recipeId;
		this.recipeName = recipeName;
		this.directions = directions;
		this.numberOfIngredients = numberOfIngredients;
		this.difficulty = difficulty;
		this.numberOfRatings = numberOfRatings;
		this.totalRating = totalRating;
		this.user = user;
		this.brands = brands;
		this.userRecipeHasReviews = userRecipeHasReviews;
		this.recommendations = recommendations;
	}

	/**
	 * Standard getter method that returns the primary key of the recipe.
	 * @return the primary key of the recipe.
	 */
	public Integer getRecipeId() {
		return recipeId;
	}

	/**
	 * Standard setter method that sets the primary key for the recipe.
	 * @param recipeId the primary key to set for the recipe.
	 */
	public void setRecipeId(Integer recipeId) {
		this.recipeId = recipeId;
	}

	/**
	 * Standard getter method that returns the name of the recipe.
	 * @return the name of the recipe.
	 */
	public String getRecipeName() {
		return recipeName;
	}

	/**
	 * Standard setter method that sets the name for the recipe.
	 * @param recipeName the name to set for the recipe.
	 */
	public void setRecipeName(String recipeName) {
		this.recipeName = recipeName;
	}

	/**
	 * Standard getter method that returns the directions of the recipe.
	 * @return the directions of the recipe.
	 */
	public String getDirections() {
		return directions;
	}

	/**
	 * Standard setter method that sets the directions for the recipe.
	 * @param directions the directions to set for the recipe.
	 */
	public void setDirections(String directions) {
		this.directions = directions;
	}

	/**
	 * Standard getter method that returns the number of ingredients of the recipe.
	 * @return the number of ingredients of the recipe.
	 */
	public int getNumberOfIngredients() {
		return numberOfIngredients;
	}

	/**
	 * Standard setter method that sets the number of ingredients for the recipe.
	 * @param numberOfIngredients the number of ingredients to set for the recipe.
	 */
	public void setNumberOfIngredients(int numberOfIngredients) {
		this.numberOfIngredients = numberOfIngredients;
	}

	/**
	 * Standard getter method that returns the difficulty of the recipe.
	 * @return the difficulty of the recipe.
	 */
	public int getDifficulty() {
		return difficulty;
	}

	/**
	 * Standard setter method that sets the difficulty for the recipe.
	 * @param difficulty the difficulty to set for the recipe.
	 */
	public void setDifficulty(int difficulty) {
		this.difficulty = difficulty;
	}

	/**
	 * Standard getter method that returns the number of ratings of the recipe.
	 * @return the number of ratings of the recipe.
	 */
	public int getNumberOfRatings() {
		return numberOfRatings;
	}

	/**
	 * Standard setter method that sets the number of ratings for the recipe.
	 * @param numberOfRatings the number of ratings to set for the recipe.
	 */
	public void setNumberOfRatings(int numberOfRatings) {
		this.numberOfRatings = numberOfRatings;
	}

	/**
	 * Standard getter method that returns the total rating of the recipe.
	 * @return the total rating of the recipe.
	 */
	public int getTotalRating() {
		return totalRating;
	}

	/**
	 * Standard setter method that sets the total rating for the recipe.
	 * @param totalRating the total rating to set for the recipe.
	 */
	public void setTotalRating(int totalRating) {
		this.totalRating = totalRating;
	}

	/**
	 * Standard getter method that returns the creator of the recipe.
	 * @return the creator of the recipe.
	 */
	public User getUser() {
		return user;
	}

	/**
	 * Standard setter method that sets the creator for the recipe.
	 * @param user the creator to set for the recipe.
	 */
	public void setUser(User user) {
		this.user = user;
	}

	/**
	 * Standard getter method that returns the brands (ingredients) of the recipe.
	 * @return the brands (ingredients) of the recipe.
	 */
	public Set<Brand> getBrands() {
		return brands;
	}

	/**
	 * Standard setter method that sets the brands (ingredients) for the recipe.
	 * @param brands the brands (ingredients) to set for the recipe.
	 */
	public void setBrands(Set<Brand> brands) {
		this.brands = brands;
	}

	/**
	 * Standard getter method that returns the reviews of the recipe.
	 * @return the reviews of the recipe.
	 */
	public Set<UserRecipeHasReview> getUserRecipeHasReviews() {
		return userRecipeHasReviews;
	}

	/**
	 * Standard setter method that sets the reviews for the recipe.
	 * @param userRecipeHasReviews the reviews to set for the recipe.
	 */
	public void setUserRecipeHasReviews(Set<UserRecipeHasReview> userRecipeHasReviews) {
		this.userRecipeHasReviews = userRecipeHasReviews;
	}

	/**
	 * Standard getter method that returns the recommendations of the recipe.
	 * @return the recommendations of the recipe.
	 */
	public Set<Recommendation> getRecommendations() {
		return recommendations;
	}

	/**
	 * Standard setter method that sets the recommendations for the recipe.
	 * @param recommendations the recommendations to set for the recipe.
	 */
	public void setRecommendations(Set<Recommendation> recommendations) {
		this.recommendations = recommendations;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((recipeId == null) ? 0 : recipeId.hashCode());
		result = prime * result + ((recipeName == null) ? 0 : recipeName.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Recipe))
			return false;
		Recipe other = (Recipe) obj;
		if (recipeId == null) {
			if (other.recipeId != null)
				return false;
		} else if (!recipeId.equals(other.recipeId))
			return false;
		if (recipeName == null) {
			if (other.recipeName != null)
				return false;
		} else if (!recipeName.equals(other.recipeName))
			return false;
		return true;
	}

}
