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

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * Models a review of a recipe.
 * @author John Tyler Preston
 * @version 1.0
 */
@Entity
@Table(name="users_recipe_has_review")
@JsonInclude(Include.NON_EMPTY)
public class UserRecipeHasReview implements Serializable {

	/**
	 * Primary key of the Review table.
	 */
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "users_recipe_has_review_id", nullable = false)
	private Integer usersRecipeHasReviewId;

	/**
	 * User who created the review.
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "users_user_id")
	private User user;

	/**
	 * Recipe that was reviewed.
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "recipe_recipe_id")
	private Recipe recipe;

	/**
	 * Review text/commentary.
	 */
	@Column(name = "review_commentary", nullable = false)
	private String reviewCommentary;

	/**
	 * Rating on a scale of 1 to 5 of the recipe, with 1 being the worst and 5 being the best.
	 */
	@Column(name = "rating", nullable = false)
	private int rating;

	/**
	 * Number of up votes on the review.
	 */
	@Column(name = "number_of_up_votes", nullable = false)
	private int numberOfUpVotes;

	/**
	 * Number of down votes on the review.
	 */
	@Column(name = "number_of_down_votes", nullable = false)
	private int numberOfDownVotes;

	/**
	 * Ratings of the review.
	 */
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "pk.userRecipeHasReview")
	private Set<UserRatingReview> userRatingReviews = new HashSet<UserRatingReview>(0);

	/**
	 * Default empty constructor of a review to suit Jackson's requirement.
	 */
	public UserRecipeHasReview() {

	}

	/**
	 * Constructs an instance of a review.
	 * @param usersRecipeHasReviewId the primary key of the review.
	 * @param user the user who created the review.
	 * @param recipe the recipe that was reviewed.
	 * @param reviewCommentary the review text/commentary.
	 * @param rating the rating on a scale of 1 to 5 of the recipe.
	 * @param numberOfUpVotes the number of up votes on the review.
	 * @param numberOfDownVotes the number of down votes on the review.
	 * @param userRatingReviews the ratings of the review.
	 */
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

	/**
	 * Standard getter method that returns the primary key of the review.
	 * @return the primary key of the review.
	 */
	public Integer getUsersRecipeHasReviewId() {
		return usersRecipeHasReviewId;
	}

	/**
	 * Standard setter method that sets the primary key for the review.
	 * @param usersRecipeHasReviewId the primary key to set for the review.
	 */
	public void setUsersRecipeHasReviewId(Integer usersRecipeHasReviewId) {
		this.usersRecipeHasReviewId = usersRecipeHasReviewId;
	}

	/**
	 * Standard getter method that returns the user of the review.
	 * @return the user of the review.
	 */
	public User getUser() {
		return user;
	}

	/**
	 * Standard setter method that sets the user for the review.
	 * @param user the user to set for the review.
	 */
	public void setUser(User user) {
		this.user = user;
	}

	/**
	 * Standard getter method that returns the recipe of the review.
	 * @return the recipe of the review.
	 */
	public Recipe getRecipe() {
		return recipe;
	}

	/**
	 * Standard setter method that sets the recipe for the review.
	 * @param recipe the recipe to set for the review.
	 */
	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}

	/**
	 * Standard getter method that returns the text/commentary of the review.
	 * @return the text/commentary of the review.
	 */
	public String getReviewCommentary() {
		return reviewCommentary;
	}

	/**
	 * Standard setter method that sets the text/commentary for the review.
	 * @param reviewCommentary the text/commentary to set for the review.
	 */
	public void setReviewCommentary(String reviewCommentary) {
		this.reviewCommentary = reviewCommentary;
	}

	/**
	 * Standard getter method that returns the rating of the review.
	 * @return the rating of the review.
	 */
	public int getRating() {
		return rating;
	}

	/**
	 * Standard setter method that sets the rating for the review.
	 * @param rating the rating to set for the review.
	 */
	public void setRating(int rating) {
		this.rating = rating;
	}

	/**
	 * Standard getter method that returns the number of up votes of the review.
	 * @return the number of up votes of the review.
	 */
	public int getNumberOfUpVotes() {
		return numberOfUpVotes;
	}

	/**
	 * Standard setter method that sets the number of up votes for the review.
	 * @param numberOfUpVotes the number of up votes to set for the review.
	 */
	public void setNumberOfUpVotes(int numberOfUpVotes) {
		this.numberOfUpVotes = numberOfUpVotes;
	}

	/**
	 * Standard getter method that returns the number of down votes of the review.
	 * @return the number of down votes of the review.
	 */
	public int getNumberOfDownVotes() {
		return numberOfDownVotes;
	}

	/**
	 * Standard setter method that sets the number of down votes for the review.
	 * @param numberOfDownVotes the number of down votes to set for the review.
	 */
	public void setNumberOfDownVotes(int numberOfDownVotes) {
		this.numberOfDownVotes = numberOfDownVotes;
	}

	/**
	 * Standard getter method that returns the ratings of the review.
	 * @return the ratings of the review.
	 */
	public Set<UserRatingReview> getUserRatingReviews() {
		return userRatingReviews;
	}

	/**
	 * Standard setter method that sets the ratings for the review.
	 * @param userRatingReviews the ratings to set for the review.
	 */
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
