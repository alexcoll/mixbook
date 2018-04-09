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

@Entity
@Table(name="recommendation")
public class Recommendation implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)	
	private Integer recommendationId;
	
	@Column(name = "status")
	@NotNull
	private Boolean status;
	
	@Transient
	private String description;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "recipient_id", nullable = false)
	private User recipient;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "recommender_id", nullable = false)
	private User recommender;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "recommended_recipe_id", nullable = false)
	private Recipe recommendedRecipe;
	
	public Recommendation() {
		
	}

	public Recommendation(Integer recommendationId, Boolean status, User recipient, User recommender,
			Recipe recommendedRecipe, String description) {
		this.recommendationId = recommendationId;
		this.status = status;
		this.description = description;
		this.recipient = recipient;
		this.recommender = recommender;
		this.recommendedRecipe = recommendedRecipe;
	}

	public Integer getRecommendationId() {
		return recommendationId;
	}

	public void setRecommendationId(Integer recommendationId) {
		this.recommendationId = recommendationId;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public User getRecipient() {
		return recipient;
	}

	public void setRecipient(User recipient) {
		this.recipient = recipient;
	}

	public User getRecommender() {
		return recommender;
	}

	public void setRecommender(User recommender) {
		this.recommender = recommender;
	}

	public Recipe getRecommendedRecipe() {
		return recommendedRecipe;
	}

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
