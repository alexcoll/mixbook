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

@Entity
@Table(name="recipe")
@JsonInclude(Include.NON_EMPTY)
public class Recipe implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "recipe_id", nullable = false)
	private Integer recipeId;

	@NotNull
	@Size(max=255)   
	@Column(name = "recipe_name", nullable = false)
	private String recipeName;

	@Column(name = "directions", nullable = false)
	private String directions;

	@Column(name = "number_of_ingredients", nullable = false)
	private int numberOfIngredients;

	@Column(name = "difficulty", nullable = false)
	private int difficulty;

	@Column(name = "number_of_ratings", nullable = false)
	private int numberOfRatings;

	@Column(name = "total_rating", nullable = false)
	private int totalRating;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_recipe_id", nullable = false)
	private User user;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "recipe_has_brand", joinColumns = {
			@JoinColumn(name = "recipe_recipe_id", nullable = false, updatable = false) },
	inverseJoinColumns = { @JoinColumn(name = "brand_brand_id",
	nullable = false, updatable = false) })
	private Set<Brand> brands = new HashSet<Brand>(0);
	
	@OneToMany(mappedBy = "recipe", fetch = FetchType.LAZY)
	private Set<UserRecipeHasReview> userRecipeHasReviews = new HashSet<UserRecipeHasReview>(0);
	
	@OneToMany(mappedBy = "recommendedRecipe", fetch = FetchType.LAZY)
	private Set<Recommendation> recommendations = new HashSet<Recommendation>(0);

	public Recipe() {

	}

	public Recipe(Integer recipeId) {
		this.recipeId = recipeId;
	}

	public Recipe(String recipeName) {
		this.recipeName = recipeName;
	}

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

	public Integer getRecipeId() {
		return recipeId;
	}

	public void setRecipeId(Integer recipeId) {
		this.recipeId = recipeId;
	}

	public String getRecipeName() {
		return recipeName;
	}

	public void setRecipeName(String recipeName) {
		this.recipeName = recipeName;
	}

	public String getDirections() {
		return directions;
	}

	public void setDirections(String directions) {
		this.directions = directions;
	}

	public int getNumberOfIngredients() {
		return numberOfIngredients;
	}

	public void setNumberOfIngredients(int numberOfIngredients) {
		this.numberOfIngredients = numberOfIngredients;
	}

	public int getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(int difficulty) {
		this.difficulty = difficulty;
	}

	public int getNumberOfRatings() {
		return numberOfRatings;
	}

	public void setNumberOfRatings(int numberOfRatings) {
		this.numberOfRatings = numberOfRatings;
	}

	public int getTotalRating() {
		return totalRating;
	}

	public void setTotalRating(int totalRating) {
		this.totalRating = totalRating;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Brand> getBrands() {
		return brands;
	}

	public void setBrands(Set<Brand> brands) {
		this.brands = brands;
	}

	public Set<UserRecipeHasReview> getUserRecipeHasReviews() {
		return userRecipeHasReviews;
	}

	public void setUserRecipeHasReviews(Set<UserRecipeHasReview> userRecipeHasReviews) {
		this.userRecipeHasReviews = userRecipeHasReviews;
	}

	public Set<Recommendation> getRecommendations() {
		return recommendations;
	}

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
