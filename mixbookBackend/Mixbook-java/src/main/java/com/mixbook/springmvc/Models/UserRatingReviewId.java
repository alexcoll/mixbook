package com.mixbook.springmvc.Models;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

@Embeddable
public class UserRatingReviewId implements Serializable {

	@ManyToOne
	private User user;

	@ManyToOne
	private UserRecipeHasReview userRecipeHasReview;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public UserRecipeHasReview getUserRecipeHasReview() {
		return userRecipeHasReview;
	}

	public void setUserRecipeHasReview(UserRecipeHasReview userRecipeHasReview) {
		this.userRecipeHasReview = userRecipeHasReview;
	}

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

	public int hashCode() {
		int result;
		result = (user != null ? user.hashCode() : 0);
		result = 31 * result + (userRecipeHasReview != null ? userRecipeHasReview.hashCode() : 0);
		return result;
	}

}
