package com.mixbook.springmvc.Models;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

/**
 * Models a composite primary key of a review rating.
 * @author John Tyler Preston
 * @version 1.0
 */
@Embeddable
public class UserRatingReviewId implements Serializable {

	/**
	 * Entity form of the primary key of user.
	 */
	@ManyToOne
	private User user;

	/**
	 * Entity form of the primary key of review.
	 */
	@ManyToOne
	private UserRecipeHasReview userRecipeHasReview;

	/**
	 * Standard getter method that returns the entity form of the primary key of the user.
	 * @return the entity form of the primary key of the user.
	 */
	public User getUser() {
		return user;
	}

	/**
	 * Standard setter method that sets the entity form of the primary key for the user.
	 * @param user the entity form of the primary key to set for the user.
	 */
	public void setUser(User user) {
		this.user = user;
	}

	/**
	 * Standard getter method that returns the entity form of the primary key of the review.
	 * @return the entity form of the primary key of the review.
	 */
	public UserRecipeHasReview getUserRecipeHasReview() {
		return userRecipeHasReview;
	}

	/**
	 * Standard setter method that sets the entity form of the primary key for the recipe.
	 * @param userRecipeHasReview the entity form of the primary key to set for the review.
	 */
	public void setUserRecipeHasReview(UserRecipeHasReview userRecipeHasReview) {
		this.userRecipeHasReview = userRecipeHasReview;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		UserRatingReviewId that = (UserRatingReviewId) o;

		if (user != null ? !user.equals(that.user) : that.user != null)
			return false;
		if (userRecipeHasReview != null ? !userRecipeHasReview.equals(that.userRecipeHasReview)
				: that.userRecipeHasReview != null)
			return false;

		return true;
	}

	@Override
	public int hashCode() {
		int result;
		result = (user != null ? user.hashCode() : 0);
		result = 31 * result + (userRecipeHasReview != null ? userRecipeHasReview.hashCode() : 0);
		return result;
	}

}
