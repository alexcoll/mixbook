package com.mixbook.springmvc.Models;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="users_recipe_has_review")
public class UserRecipeHasReview implements Serializable {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "users_recipe_has_review_id", nullable = false)
	private Integer usersRecipeHasReviewId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "recipe_id")
	private Recipe recipe;

	@Column(name = "review_commentary", nullable = false)
	private String review_commentary;

	@Column(name = "rating", nullable = false)
	private int rating;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "userRecipeHasReview")
	private Set<UserRatingReview> userRatingReviews = new HashSet<UserRatingReview>(0);

	public UserRecipeHasReview() {

	}

	public UserRecipeHasReview(Integer usersRecipeHasReviewId, User user, Recipe recipe, String review_commentary, int rating, Set<UserRatingReview> userRatingReviews) {
		this.usersRecipeHasReviewId = usersRecipeHasReviewId;
		this.user = user;
		this.recipe = recipe;
		this.review_commentary = review_commentary;
		this.rating = rating;
		this.userRatingReviews = userRatingReviews;
	}

	public Integer getUsersRecipeHasReviewId() {
		return usersRecipeHasReviewId;
	}

	public void setUsersRecipeHasReviewId(Integer usersRecipeHasReviewId) {
		this.usersRecipeHasReviewId = usersRecipeHasReviewId;
	}

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
	
	public Set<UserRatingReview> getUserRatingReviews() {
		return userRatingReviews;
	}

	public void setUserRatingReviews(Set<UserRatingReview> userRatingReviews) {
		this.userRatingReviews = userRatingReviews;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((user == null) ? 0 : user.hashCode());
		result = prime * result + ((recipe == null) ? 0 : recipe.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof UserRecipeHasReview))
			return false;
		UserRecipeHasReview other = (UserRecipeHasReview) obj;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		if (recipe == null) {
			if (other.recipe != null)
				return false;
		} else if (!recipe.equals(other.recipe))
			return false;
		return true;
	}

}
