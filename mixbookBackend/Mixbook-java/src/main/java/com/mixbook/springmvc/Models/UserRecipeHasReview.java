package com.mixbook.springmvc.Models;

import java.io.Serializable;

import javax.persistence.AssociationOverride;
import javax.persistence.AssociationOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="users_recipe_has_review")
@AssociationOverrides({
	@AssociationOverride(name = "pk.user",
			joinColumns = @JoinColumn(name = "user_id")),
	@AssociationOverride(name = "pk.recipe",
	joinColumns = @JoinColumn(name = "recipe_id")) })
public class UserRecipeHasReview implements Serializable {

	@EmbeddedId
	private UserRecipeHasReviewId pk = new UserRecipeHasReviewId();

	@Column(name = "review_commentary", nullable = false)
	private String review_commentary;

	@Column(name = "rating", nullable = false)
	private int rating;

	public UserRecipeHasReview() {

	}

	public UserRecipeHasReview(UserRecipeHasReviewId pk, String review_commentary, int rating) {
		this.pk = pk;
		this.review_commentary = review_commentary;
		this.rating = rating;
	}

	public UserRecipeHasReviewId getPk() {
		return pk;
	}

	public void setPk(UserRecipeHasReviewId pk) {
		this.pk = pk;
	}

	@Transient
	public User getUser() {
		return getPk().getUser();
	}

	public void setUser(User user) {
		getPk().setUser(user);
	}

	@Transient
	public Recipe getRecipe() {
		return getPk().getRecipe();
	}

	public void setRecipe(Recipe recipe) {
		getPk().setRecipe(recipe);
	}

	public String getReviewCommentary() {
		return review_commentary;
	}

	public void setReviewCommentary(String review_commentary) {
		this.review_commentary = review_commentary;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		UserRecipeHasReview that = (UserRecipeHasReview) o;

		if (getPk() != null ? !getPk().equals(that.getPk())
				: that.getPk() != null)
			return false;

		return true;
	}

	public int hashCode() {
		return (getPk() != null ? getPk().hashCode() : 0);
	}

}
