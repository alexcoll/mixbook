package com.mixbook.springmvc.Models;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

@Embeddable
public class UserRecipeHasReviewId implements Serializable {

	@ManyToOne
	private User user;

	@ManyToOne
	private Recipe recipe;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Recipe getRecipe() {
		return recipe;
	}

	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}

	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		UserRecipeHasReviewId that = (UserRecipeHasReviewId) o;

		if (user != null ? !user.equals(that.user) : that.user != null) return false;
		if (recipe != null ? !recipe.equals(that.recipe) : that.recipe != null)
			return false;

		return true;
	}

	public int hashCode() {
		int result;
		result = (user != null ? user.hashCode() : 0);
		result = 31 * result + (recipe != null ? recipe.hashCode() : 0);
		return result;
	}

}
