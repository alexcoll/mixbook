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
import javax.validation.constraints.NotNull;

/**
 * Models a rating of a review.
 * @author John Tyler Preston
 * @version 1.0
 */
@Entity
@Table(name = "users_rating_review")
@AssociationOverrides({ @AssociationOverride(name = "pk.user", joinColumns = @JoinColumn(name = "users_user_id")),
		@AssociationOverride(name = "pk.userRecipeHasReview", joinColumns = @JoinColumn(name = "users_recipe_has_review_id")) })
public class UserRatingReview implements Serializable {

	/**
	 * Composite primary key of the Review Rating table.
	 */
	@EmbeddedId
	private UserRatingReviewId pk = new UserRatingReviewId();

	/**
	 * Flag to indicate if the rating is an up vote or a down vote (true means up vote, false means down vote).
	 */
	@Column(name = "vote")
	@NotNull
	private Boolean vote;

	/**
	 * Default empty constructor of a rating of a review to suit Jackson's requirement.
	 */
	public UserRatingReview() {

	}

	/**
	 * Constructs an instance of a rating of a review.
	 * @param pk the composite primary key of the rating of a review.
	 * @param vote the flag to indicate if the rating is an up vote or a down vote.
	 */
	public UserRatingReview(UserRatingReviewId pk, Boolean vote) {
		this.pk = pk;
		this.vote = vote;
	}

	/**
	 * Standard getter method that returns the composite primary key of the rating of a review.
	 * @return the composite primary key of the rating of a review.
	 */
	public UserRatingReviewId getPk() {
		return pk;
	}

	/**
	 * Standard setter method that sets the composite primary key for the rating of a review.
	 * @param pk the composite primary key to set for the rating of a review.
	 */
	public void setPk(UserRatingReviewId pk) {
		this.pk = pk;
	}

	/**
	 * Standard getter method that returns the user part of the composite primary key of the rating of a review.
	 * @return the user part of the composite primary key of the rating of a review.
	 */
	@Transient
	public User getUser() {
		return getPk().getUser();
	}

	/**
	 * Standard setter method that sets the user part of the composite primary key for the rating of a review.
	 * @param user the user part of the composite primary key to set for the rating of a review.
	 */
	public void setUser(User user) {
		getPk().setUser(user);
	}

	/**
	 * Standard getter method that returns the review part of the composite primary key of the rating of a review.
	 * @return the review part of the composite primary key of the rating of a review.
	 */
	@Transient
	public UserRecipeHasReview getUserRecipeHasReview() {
		return getPk().getUserRecipeHasReview();
	}

	/**
	 * Standard setter method that sets the review part of the composite primary key for the rating of a review.
	 * @param userRecipeHasReview the review part of the composite primary key to set for the rating of a review.
	 */
	public void setUserRecipeHasReview(UserRecipeHasReview userRecipeHasReview) {
		getPk().setUserRecipeHasReview(userRecipeHasReview);
	}

	/**
	 * Standard getter method that returns the flag to indicate if the rating is an up vote or a down vote.
	 * @return the flag to indicate if the rating is an up vote or a down vote.
	 */
	public Boolean getVote() {
		return vote;
	}

	/**
	 * Standard setter method that sets the flag to indicate if the rating is an up vote or a down vote for the rating of a review.
	 * @param vote the flag to indicate if the rating is an up vote or a down vote to set for the rating of a review.
	 */
	public void setVote(Boolean vote) {
		this.vote = vote;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;

		UserRatingReview that = (UserRatingReview) o;

		if (getPk() != null ? !getPk().equals(that.getPk()) : that.getPk() != null)
			return false;

		return true;
	}

	@Override
	public int hashCode() {
		return (getPk() != null ? getPk().hashCode() : 0);
	}

}
