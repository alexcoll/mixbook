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

@Entity
@Table(name = "users_rating_review")
@AssociationOverrides({ @AssociationOverride(name = "pk.user", joinColumns = @JoinColumn(name = "users_user_id")),
		@AssociationOverride(name = "pk.userRecipeHasReview", joinColumns = @JoinColumn(name = "users_recipe_has_review_id")) })
public class UserRatingReview implements Serializable {

	@EmbeddedId
	private UserRatingReviewId pk = new UserRatingReviewId();

	@Column(name = "vote")
	@NotNull
	private Boolean vote;

	public UserRatingReview() {

	}

	public UserRatingReview(UserRatingReviewId pk, Boolean vote) {
		this.pk = pk;
		this.vote = vote;
	}

	public UserRatingReviewId getPk() {
		return pk;
	}

	public void setPk(UserRatingReviewId pk) {
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
	public UserRecipeHasReview getUserRecipeHasReview() {
		return getPk().getUserRecipeHasReview();
	}

	public void setUserRecipeHasReview(UserRecipeHasReview userRecipeHasReview) {
		getPk().setUserRecipeHasReview(userRecipeHasReview);
	}

	public Boolean getVote() {
		return vote;
	}

	public void setVote(Boolean vote) {
		this.vote = vote;
	}

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

	public int hashCode() {
		return (getPk() != null ? getPk().hashCode() : 0);
	}

}
