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
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="recipe")
public class Recipe implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)	
	private Integer recipe_id;

	@NotNull
	@Size(max=255)   
	@Column(name = "recipe_name", nullable = false)
	private String recipe_name;

	@Column(name = "directions", nullable = false)
	private String directions;

	@Column(name = "number_of_ingredients", nullable = false)
	private int number_of_ingredients;

	@Column(name = "difficulty", nullable = false)
	private int difficulty;

	@Column(name = "number_of_ratings", nullable = false)
	private int number_of_ratings;

	@Column(name = "total_rating", nullable = false)
	private int total_rating;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_recipe_id", nullable = false)
	private User user;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "recipe_has_brand", joinColumns = {
			@JoinColumn(name = "recipe_recipe_id", nullable = false, updatable = false) },
	inverseJoinColumns = { @JoinColumn(name = "brand_brand_id",
	nullable = false, updatable = false) })
	private Set<Brand> brands = new HashSet<Brand>(0);

	public Recipe() {

	}

	public Recipe(Integer recipe_id, String recipe_name, String directions,
			int number_of_ingredients, int difficulty, int number_of_ratings,
			int	total_rating, User user, Set<Brand> brands) {
		this.recipe_id = recipe_id;
		this.recipe_name = recipe_name;
		this.directions = directions;
		this.number_of_ingredients = number_of_ingredients;
		this.difficulty = difficulty;
		this.number_of_ratings = number_of_ratings;
		this.total_rating = total_rating;
		this.user = user;
		this.brands = brands;
	}

	public Integer getRecipeId() {
		return recipe_id;
	}

	public void setRecipeId(Integer recipe_id) {
		this.recipe_id = recipe_id;
	}

	public String getRecipeName() {
		return recipe_name;
	}

	public void setRecipeName(String recipe_name) {
		this.recipe_name = recipe_name;
	}

	public String getDirections() {
		return directions;
	}

	public void setDirections(String directions) {
		this.directions = directions;
	}

	public int getNumberOfIngredients() {
		return number_of_ingredients;
	}

	public void setNumberOfIngredients(int number_of_ingredients) {
		this.number_of_ingredients = number_of_ingredients;
	}

	public int getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(int difficulty) {
		this.difficulty = difficulty;
	}

	public int getNumberOfRatings() {
		return number_of_ratings;
	}

	public void setNumberOfRatings(int number_of_ratings) {
		this.number_of_ratings = number_of_ratings;
	}

	public int getTotalRating() {
		return total_rating;
	}

	public void setTotalRating(int total_rating) {
		this.total_rating = total_rating;
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((recipe_id == null) ? 0 : recipe_id.hashCode());
		result = prime * result + ((recipe_name == null) ? 0 : recipe_name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Brand))
			return false;
		Recipe other = (Recipe) obj;
		if (recipe_id == null) {
			if (other.recipe_id != null)
				return false;
		} else if (!recipe_id.equals(other.recipe_id))
			return false;
		if (recipe_name == null) {
			if (other.recipe_name != null)
				return false;
		} else if (!recipe_name.equals(other.recipe_name))
			return false;
		return true;
	}

}
