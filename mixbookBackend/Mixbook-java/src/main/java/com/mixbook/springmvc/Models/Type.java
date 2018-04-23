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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * Models a type of liquor.
 * @author John Tyler Preston
 * @version 1.0
 */
@Entity
@Table(name="type")
@JsonInclude(Include.NON_EMPTY)
public class Type implements Serializable {

	/**
	 * Primary key of the Type table.
	 */
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "type_id", nullable = false)
	private Integer typeId;

	/**
	 * Name of the type.
	 */
	@NotNull
	@Size(max=255)   
	@Column(name = "type_name", nullable = false)
	private String typeName;

	/**
	 * Styles associated with the type.
	 */
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "type")
	private Set<Style> styles = new HashSet<Style>(0);

	/**
	 * Default empty constructor of a type to suit Jackson's requirement.
	 */
	public Type() {

	}

	/**
	 * Constructs an instance of a type.
	 * @param typeId the primary key of the type.
	 * @param typeName the name of the type.
	 * @param styles the styles associated with the type.
	 */
	public Type(Integer typeId, String typeName, Set<Style> styles) {
		this.typeId = typeId;
		this.typeName = typeName;
		this.styles = styles;
	}

	/**
	 * Standard getter method that returns the primary key of the type.
	 * @return the primary key of the type.
	 */
	public Integer getTypeId() {
		return typeId;
	}

	/**
	 * Standard setter method that sets the primary key for the type.
	 * @param typeId the primary key to set for the type.
	 */
	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}

	/**
	 * Standard getter method that returns the name of the type.
	 * @return the name of the type.
	 */
	public String getTypeName() {
		return typeName;
	}

	/**
	 * Standard setter method that sets the name for the type.
	 * @param typeName the name to set for the type.
	 */
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	/**
	 * Standard getter method that returns the users associated with the type.
	 * @return the users associated with the type.
	 */
	public Set<Style> getStyles() {
		return styles;
	}

	/**
	 * Standard setter method that sets the styles to be associated with the type.
	 * @param styles the styles to be associated with the type.
	 */
	public void setStyles(Set<Style> styles) {
		this.styles = styles;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((typeId == null) ? 0 : typeId.hashCode());
		result = prime * result + ((typeName == null) ? 0 : typeName.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Type))
			return false;
		Type other = (Type) obj;
		if (typeId == null) {
			if (other.typeId != null)
				return false;
		} else if (!typeId.equals(other.typeId))
			return false;
		if (typeName == null) {
			if (other.typeName != null)
				return false;
		} else if (!typeName.equals(other.typeName))
			return false;
		return true;
	}

}
