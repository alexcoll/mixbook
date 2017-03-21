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

@Entity
@Table(name="brand")
public class Brand implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)	
	private Integer brand_id;

	@NotNull
	@Size(max=255)   
	@Column(name = "brand_name", nullable = false)
	private String brand_name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "style_brand_id", nullable = false)
	private Style style;

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "brands")
	private Set<User> users = new HashSet<User>(0);

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "brands")
	private Set<Recipe> recipes = new HashSet<Recipe>(0);

	public Brand() {

	}

	public Brand(Integer brand_id, String brand_name, Style style, 
			Set<User> users, Set<Recipe> recipes) {
		this.brand_id = brand_id;
		this.brand_name = brand_name;
		this.style = style;
		this.users = users;
		this.recipes = recipes;
	}

	public Integer getBrandId() {
		return brand_id;
	}

	public void setBrandId(Integer brand_id) {
		this.brand_id = brand_id;
	}

	public String getBrandName() {
		return brand_name;
	}

	public void setBrandName(String brand_name) {
		this.brand_name = brand_name;
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
		result = prime * result + ((brand_id == null) ? 0 : brand_id.hashCode());
		result = prime * result + ((brand_name == null) ? 0 : brand_name.hashCode());
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
		if (brand_id == null) {
			if (other.brand_id != null)
				return false;
		} else if (!brand_id.equals(other.brand_id))
			return false;
		if (brand_name == null) {
			if (other.brand_name != null)
				return false;
		} else if (!brand_name.equals(other.brand_name))
			return false;
		return true;
	}

}
