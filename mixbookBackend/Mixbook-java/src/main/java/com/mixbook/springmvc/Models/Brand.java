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

@Entity
@Table(name="brand")
@JsonInclude(Include.NON_EMPTY)
public class Brand implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "brand_id", nullable = false)
	private Integer brandId;

	@NotNull
	@Size(max=255)   
	@Column(name = "brand_name", nullable = false)
	private String brandName;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "style_brand_id", nullable = false)
	private Style style;

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "brands")
	private Set<User> users = new HashSet<User>(0);

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "brands")
	private Set<Recipe> recipes = new HashSet<Recipe>(0);

	public Brand() {

	}

	public Brand(Integer brandId, String brandName, Style style, 
			Set<User> users, Set<Recipe> recipes) {
		this.brandId = brandId;
		this.brandName = brandName;
		this.style = style;
		this.users = users;
		this.recipes = recipes;
	}

	public Integer getBrandId() {
		return brandId;
	}

	public void setBrandId(Integer brandId) {
		this.brandId = brandId;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public Style getStyle() {
		return style;
	}

	public void setStyle(Style style) {
		this.style = style;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	public Set<Recipe> getRecipes() {
		return recipes;
	}

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
