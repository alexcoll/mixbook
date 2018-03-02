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

@Entity
@Table(name="type")
public class Type implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)	
	private Integer type_id;

	@NotNull
	@Size(max=255)   
	@Column(name = "type_name", nullable = false)
	private String type_name;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "type")
	private Set<Style> styles = new HashSet<Style>(0);

	public Type() {

	}

	public Type(Integer type_id, String type_name, Set<Style> styles) {
		this.type_id = type_id;
		this.type_name = type_name;
		this.styles = styles;
	}

	public Integer getTypeId() {
		return type_id;
	}

	public void setTypeId(Integer type_id) {
		this.type_id = type_id;
	}

	public String getTypeName() {
		return type_name;
	}

	public void setTypeName(String type_name) {
		this.type_name = type_name;
	}

	public Set<Style> getStyles() {
		return styles;
	}

	public void setStyles(Set<Style> styles) {
		this.styles = styles;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((type_id == null) ? 0 : type_id.hashCode());
		result = prime * result + ((type_name == null) ? 0 : type_name.hashCode());
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
		if (type_id == null) {
			if (other.type_id != null)
				return false;
		} else if (!type_id.equals(other.type_id))
			return false;
		if (type_name == null) {
			if (other.type_name != null)
				return false;
		} else if (!type_name.equals(other.type_name))
			return false;
		return true;
	}

}
