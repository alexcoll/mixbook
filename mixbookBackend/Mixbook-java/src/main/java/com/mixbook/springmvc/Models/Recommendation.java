package com.mixbook.springmvc.Models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * Models a recommendation.
 * @author John Tyler Preston
 * @version 1.0
 */
@Entity
@Table(name="recommendation")
@JsonInclude(Include.NON_EMPTY)
public class Recommendation implements Serializable {

	/**
	 * Primary key of the Recommendation table.
	 */
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "recommendation_id", nullable = false)
	private Integer recommendationId;

	/**
	 * Status of the recommendation (read or unread).
	 */
	@Column(name = "status")
	@NotNull
	private Boolean status;

	/**
	 * Description of the recommendation (i.e. who recommended the recipe, etc.).
	 */
	@Transient
	@JsonSerialize
	@JsonDeserialize
	private String description;

	/**
	 * Recipient of the recommendation.
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "recipient_id", nullable = false)
	@JsonProperty(access = Access.WRITE_ONLY)
	private User recipient;

	/**
	 * Recommender of the recommendation.
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "recommender_id", nullable = false)
	private User recommender;

	/**
	 * Recipe that has been recommended.
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "recommended_recipe_id", nullable = false)
	private Recipe recommendedRecipe;

	/**
	 * Default empty constructor of a recommendation to suit Jackson's requirement.
	 */
	public Recommendation() {
		
	}

	/**
	 * Constructs an instance of a recommendation.
	 * @param recommendationId the primary key of the recommendation.
	 * @param status the status of the recommendation.
	 * @param description the description of the recommendation.
	 * @param recipient the recipient of the recommendation.
	 * @param recommender the recommender of the recommendation.
	 * @param recommendedRecipe the recipe that has been recommended.
	 */
	public Recommendation(Integer recommendationId, Boolean status, String description, User recipient,
			User recommender, Recipe recommendedRecipe) {
		this.recommendationId = recommendationId;
		this.status = status;
		this.description = description;
		this.recipient = recipient;
		this.recommender = recommender;
		this.recommendedRecipe = recommendedRecipe;
	}

	/**
	 * Standard getter method that returns the primary key of the recommendation.
	 * @return the primary key of the recommendation.
	 */
	public Integer getRecommendationId() {
		return recommendationId;
	}

	/**
	 * Standard setter method that sets the primary key for the recommendation.
	 * @param recommendationId the primary key to set for the recommendation.
	 */
	public void setRecommendationId(Integer recommendationId) {
		this.recommendationId = recommendationId;
	}

	/**
	 * Standard getter method that returns the status of the recommendation.
	 * @return the status of the recommendation.
	 */
	public Boolean getStatus() {
		return status;
	}

	/**
	 * Standard setter method that sets the status for the recommendation.
	 * @param status the status to set for the recommendation.
	 */
	public void setStatus(Boolean status) {
		this.status = status;
	}

	/**
	 * Standard getter method that returns the description of the recommendation.
	 * @return the description of the recommendation.
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * Standard setter method that sets the description for the recommendation.
	 * @param description the description to set for the recommendation.
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * Standard getter method that returns the recipient of the recommendation.
	 * @return the recipient of the recommendation.
	 */
	public User getRecipient() {
		return recipient;
	}

	/**
	 * Standard setter method that sets the recipient for the recommendation.
	 * @param recipient the recipient to set for the recommendation.
	 */
	public void setRecipient(User recipient) {
		this.recipient = recipient;
	}

	/**
	 * Standard getter method that returns the recommender of the recommendation.
	 * @return the recommender of the recommendation.
	 */
	public User getRecommender() {
		return recommender;
	}

	/**
	 * Standard setter method that sets the recommender for the recommendation.
	 * @param recommender the recommender to set for the recommendation.
	 */
	public void setRecommender(User recommender) {
		this.recommender = recommender;
	}

	/**
	 * Standard getter method that returns the recommended recipe of the recommendation.
	 * @return the recommended recipe of the recommendation.
	 */
	public Recipe getRecommendedRecipe() {
		return recommendedRecipe;
	}

	/**
	 * Standard setter method that sets the recommended recipe for the recommendation.
	 * @param recommendedRecipe the recommended recipe to set for the recommendation.
	 */
	public void setRecommendedRecipe(Recipe recommendedRecipe) {
		this.recommendedRecipe = recommendedRecipe;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((recommendationId == null) ? 0 : recommendationId.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Recommendation))
			return false;
		Recommendation other = (Recommendation) obj;
		if (recommendationId == null) {
			if (other.recommendationId != null)
				return false;
		} else if (!recommendationId.equals(other.recommendationId))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
			return false;
		return true;
	}
}
