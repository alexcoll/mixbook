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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * Models a style of a type of liquor.
 * @author John Tyler Preston
 * @version 1.0
 */
@Entity
@Table(name="style")
@JsonInclude(Include.NON_EMPTY)
public class Style implements Serializable {

	/**
	 * Primary key of the Style table.
	 */
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "style_id", nullable = false)
	private Integer styleId;

	/**
	 * Name of the style.
	 */
	@NotNull
	@Size(max=255)   
	@Column(name = "style_name", nullable = false)
	private String styleName;

	/**
	 * Type associated with the style.
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "type_style_id", nullable = false)
	private Type type;

	/**
	 * Brands associated with the style.
	 */
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "style")
	private Set<Brand> brands = new HashSet<Brand>(0);

	/**
	 * Default empty constructor of a style to suit Jackson's requirement.
	 */
	public Style() {

	}

	/**
	 * Constructs an instance of a style.
	 * @param styleId the primary key of the style.
	 * @param styleName the name of the style.
	 * @param type the type associated with the style.
	 * @param brands the brands associated with the style.
	 */
	public Style(Integer styleId, String styleName, Type type, Set<Brand> brands) {
		this.styleId = styleId;
		this.styleName = styleName;
		this.type = type;
		this.brands = brands;
	}

	/**
	 * Standard getter method that returns the primary key of the style.
	 * @return the primary key of the style.
	 */
	public Integer getStyleId() {
		return styleId;
	}

	/**
	 * Standard setter method that sets the primary key for the style.
	 * @param styleId the primary key to set for the style.
	 */
	public void setStyleId(Integer styleId) {
		this.styleId = styleId;
	}

	/**
	 * Standard getter method that returns the name of the style.
	 * @return the name of the style.
	 */
	public String getStyleName() {
		return styleName;
	}

	/**
	 * Standard setter method that sets the name for the style.
	 * @param styleName the name to set for the style.
	 */
	public void setStyleName(String styleName) {
		this.styleName = styleName;
	}

	/**
	 * Standard getter method that returns the type associated with the style.
	 * @return the type associated with the style.
	 */
	public Type getType() {
		return type;
	}

	/**
	 * Standard setter method that sets the type to be associated with the style.
	 * @param type the type to be associated with the style.
	 */
	public void setType(Type type) {
		this.type = type;
	}

	/**
	 * Standard getter method that returns the brands associated with the style.
	 * @return the brands associated with the style.
	 */
	public Set<Brand> getBrands() {
		return brands;
	}

	/**
	 * Standard setter method that sets the brands to be associated with the style.
	 * @param brands the brands to be associated with the style.
	 */
	public void setBrands(Set<Brand> brands) {
		this.brands = brands;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((styleId == null) ? 0 : styleId.hashCode());
		result = prime * result + ((styleName == null) ? 0 : styleName.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Style))
			return false;
		Style other = (Style) obj;
		if (styleId == null) {
			if (other.styleId != null)
				return false;
		} else if (!styleId.equals(other.styleId))
			return false;
		if (styleName == null) {
			if (other.styleName != null)
				return false;
		} else if (!styleName.equals(other.styleName))
			return false;
		return true;
	}

}
