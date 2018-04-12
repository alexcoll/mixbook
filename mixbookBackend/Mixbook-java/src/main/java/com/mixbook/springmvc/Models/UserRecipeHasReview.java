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
	@JoinColumn(name = "users_user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "recipe_recipe_id")
	private Recipe recipe;

	@Column(name = "review_commentary", nullable = false)
	private String reviewCommentary;

	@Column(name = "rating", nullable = false)
	private int rating;
	
	@Column(name = "number_of_up_votes", nullable = false)
	private int numberOfUpVotes;
	
	@Column(name = "number_of_down_votes", nullable = false)
	private int numberOfDownVotes;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "pk.userRecipeHasReview")
	private Set<UserRatingReview> userRatingReviews = new HashSet<UserRatingReview>(0);

	public UserRecipeHasReview() {

	}

	public UserRecipeHasReview(Integer usersRecipeHasReviewId, User user, Recipe recipe, String reviewCommentary, int rating, int numberOfUpVotes, int numberOfDownVotes, Set<UserRatingReview> userRatingReviews) {
		this.usersRecipeHasReviewId = usersRecipeHasReviewId;
		this.user = user;
		this.recipe = recipe;
		this.reviewCommentary = reviewCommentary;
		this.rating = rating;
		this.numberOfUpVotes = numberOfUpVotes;
		this.numberOfDownVotes = numberOfDownVotes;
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
		return reviewCommentary;
	}

	public void setReviewCommentary(String reviewCommentary) {
		this.reviewCommentary = reviewCommentary;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}
	
	public int getNumberOfUpVotes() {
		return numberOfUpVotes;
	}

	public void setNumberOfUpVotes(int numberOfUpVotes) {
		this.numberOfUpVotes = numberOfUpVotes;
	}

	public int getNumberOfDownVotes() {
		return numberOfDownVotes;
	}

	public void setNumberOfDownVotes(int numberOfDownVotes) {
		this.numberOfDownVotes = numberOfDownVotes;
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
