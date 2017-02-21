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
	@Column(name = "user_recipe_id", nullable = false)
	private Integer user_recipe_id;

	@NotNull
	@Size(max=255)   
	@Column(name = "recipe_name", nullable = false)
	private String brand_name;

	@Column(name = "directions", nullable = false)
	private String directions;

	@Column(name = "number_of_ingredients", nullable = false)
	private int number_of_ingredients;

	@Column(name = "difficulty", nullable = false)
	private int difficulty;

	@Column(name = "number_of_five_star_ratings", nullable = false)
	private int number_of_five_star_ratings;

	@Column(name = "number_of_four_star_ratings", nullable = false)
	private int number_of_four_star_ratings;

	@Column(name = "number_of_three_star_ratings", nullable = false)
	private int number_of_three_star_ratings;

	@Column(name = "number_of_two_star_ratings", nullable = false)
	private int number_of_two_star_ratings;

	@Column(name = "number_of_one_star_ratings", nullable = false)
	private int number_of_one_star_ratings;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "recipe_has_brand", joinColumns = {
			@JoinColumn(name = "recipe_recipe_id", nullable = false, updatable = false) },
	inverseJoinColumns = { @JoinColumn(name = "brand_brand_id",
	nullable = false, updatable = false) })
	private Set<Brand> brands = new HashSet<Brand>(0);

	public Recipe() {

	}

	public Recipe(Integer recipe_id, Integer user_recipe_id, String brand_name, String directions,
			int number_of_ingredients, int difficulty, int number_of_five_star_ratings,
			int number_of_four_star_ratings, int number_of_three_star_ratings,
			int number_of_two_star_ratings, int number_of_one_star_ratings, User user, Set<Brand> brands) {
		this.recipe_id = recipe_id;
		this.user_recipe_id = user_recipe_id;
		this.brand_name = brand_name;
		this.directions = directions;
		this.number_of_ingredients = number_of_ingredients;
		this.difficulty = difficulty;
		this.number_of_five_star_ratings = number_of_five_star_ratings;
		this.number_of_four_star_ratings = number_of_four_star_ratings;
		this.number_of_three_star_ratings = number_of_three_star_ratings;
		this.number_of_two_star_ratings = number_of_two_star_ratings;
		this.number_of_one_star_ratings = number_of_one_star_ratings;
		this.user = user;
		this.brands = brands;
	}

	public Integer getRecipeId() {
		return recipe_id;
	}

	public void setRecipeId(Integer recipe_id) {
		this.recipe_id = recipe_id;
	}

	public Integer getUserRecipeId() {
		return user_recipe_id;
	}

	public void setUserRecipeId(Integer user_recipe_id) {
		this.user_recipe_id = user_recipe_id;
	}

	public String getBrandName() {
		return brand_name;
	}

	public void setBrandName(String brand_name) {
		this.brand_name = brand_name;
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

	public int getNumberOfFiveStarRatings() {
		return number_of_five_star_ratings;
	}

	public void setNumberOfFiveStarRatings(int number_of_five_star_ratings) {
		this.number_of_five_star_ratings = number_of_five_star_ratings;
	}

	public int getNumberOfFourStarRatings() {
		return number_of_four_star_ratings;
	}

	public void setNumberOfFourStarRatings(int number_of_four_star_ratings) {
		this.number_of_four_star_ratings = number_of_four_star_ratings;
	}

	public int getNumberOfThreeStarRatings() {
		return number_of_three_star_ratings;
	}

	public void setNumberOfThreeStarRatings(int number_of_three_star_ratings) {
		this.number_of_three_star_ratings = number_of_three_star_ratings;
	}

	public int getNumberOfTwoStarRatings() {
		return number_of_two_star_ratings;
	}

	public void setNumberOfTwoStarRatings(int number_of_two_star_ratings) {
		this.number_of_two_star_ratings = number_of_two_star_ratings;
	}

	public int getNumberOfOneStarRatings() {
		return number_of_one_star_ratings;
	}

	public void setNumberOfOneStarRatings(int number_of_one_star_ratings) {
		this.number_of_one_star_ratings = number_of_one_star_ratings;
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
		result = prime * result + ((user_recipe_id == null) ? 0 : user_recipe_id.hashCode());
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
		if (user_recipe_id == null) {
			if (other.user_recipe_id != null)
				return false;
		} else if (!user_recipe_id.equals(other.user_recipe_id))
			return false;
		return true;
	}

}
