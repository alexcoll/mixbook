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

@Entity
@Table(name="style")
@JsonInclude(Include.NON_EMPTY)
public class Style implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "style_id", nullable = false)
	private Integer styleId;

	@NotNull
	@Size(max=255)   
	@Column(name = "style_name", nullable = false)
	private String styleName;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "type_style_id", nullable = false)
	private Type type;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "style")
	private Set<Brand> brands = new HashSet<Brand>(0);

	public Style() {

	}

	public Style(Integer styleId, String styleName, Type type, Set<Brand> brands) {
		this.styleId = styleId;
		this.styleName = styleName;
		this.type = type;
		this.brands = brands;
	}

	public Integer getStyleId() {
		return styleId;
	}

	public void setStyleId(Integer styleId) {
		this.styleId = styleId;
	}

	public String getStyleName() {
		return styleName;
	}

	public void setStyleName(String styleName) {
		this.styleName = styleName;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public Set<Brand> getBrands() {
		return brands;
	}

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
