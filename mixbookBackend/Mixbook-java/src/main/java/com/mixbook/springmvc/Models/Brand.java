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
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * Models a brand.
 * @author John Tyler Preston
 * @version 1.0
 */
@Entity
@Table(name="brand")
@JsonInclude(Include.NON_EMPTY)
public class Brand implements Serializable {

	/**
	 * Primary key of the Brand table.
	 */
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "brand_id", nullable = false)
	private Integer brandId;

	/**
	 * Name of the brand.
	 */
	@NotNull
	@Size(max=255)   
	@Column(name = "brand_name", nullable = false)
	private String brandName;

	/**
	 * Style associated with the brand.
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "style_brand_id", nullable = false)
	private Style style;

	/**
	 * Users associated with the brand.
	 */
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "brands")
	private Set<User> users = new HashSet<User>(0);

	/**
	 * Recipes associated with the brand.
	 */
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "brands")
	private Set<Recipe> recipes = new HashSet<Recipe>(0);

	/**
	 * Default empty constructor of a brand to suit Jackson's requirement.
	 */
	public Brand() {

	}

	/**
	 * Constructs an instance of a brand.
	 * @param brandId the primary key of the brand.
	 * @param brandName the name of the brand.
	 * @param style the style associated with the brand.
	 * @param users the users associated with the brand.
	 * @param recipes the recipes associated with the brand.
	 */
	public Brand(Integer brandId, String brandName, Style style, 
			Set<User> users, Set<Recipe> recipes) {
		this.brandId = brandId;
		this.brandName = brandName;
		this.style = style;
		this.users = users;
		this.recipes = recipes;
	}

	/**
	 * Standard getter method that returns the primary key of the brand.
	 * @return the primary key of the brand.
	 */
	public Integer getBrandId() {
		return brandId;
	}

	/**
	 * Standard setter method that sets the primary key for the brand.
	 * @param brandId the primary key to set for the brand.
	 */
	public void setBrandId(Integer brandId) {
		this.brandId = brandId;
	}

	/**
	 * Standard getter method that returns the name of the brand.
	 * @return the name of the brand.
	 */
	public String getBrandName() {
		return brandName;
	}

	/**
	 * Standard setter method that sets the name for the brand.
	 * @param brandName the name to set for the brand.
	 */
	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	/**
	 * Standard getter method that returns the style associated with the brand.
	 * @return the style associated with the brand.
	 */
	public Style getStyle() {
		return style;
	}

	/**
	 * Standard setter method that sets the style to be associated with the brand.
	 * @param style the style to be associated with the brand.
	 */
	public void setStyle(Style style) {
		this.style = style;
	}

	/**
	 * Standard getter method that returns the users associated with the brand.
	 * @return the users associated with the brand.
	 */
	public Set<User> getUsers() {
		return users;
	}

	/**
	 * Standard setter method that sets the users to be associated with the brand.
	 * @param users the users to be associated with the brand.
	 */
	public void setUsers(Set<User> users) {
		this.users = users;
	}

	/**
	 * Standard getter method that returns the recipes associated with the brand.
	 * @return the recipes associated with the brand.
	 */
	public Set<Recipe> getRecipes() {
		return recipes;
	}

	/**
	 * Standard setter method that sets the recipes to be associated with the brand.
	 * @param recipes the recipes to be associated with the brand.
	 */
	public void setRecipes(Set<Recipe> recipes) {
		this.recipes = recipes;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((brandId == null) ? 0 : brandId.hashCode());
		result = prime * result + ((brandName == null) ? 0 : brandName.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Brand))
			return false;
		Brand other = (Brand) obj;
		if (brandId == null) {
			if (other.brandId != null)
				return false;
		} else if (!brandId.equals(other.brandId))
			return false;
		if (brandName == null) {
			if (other.brandName != null)
				return false;
		} else if (!brandName.equals(other.brandName))
			return false;
		return true;
	}

}
