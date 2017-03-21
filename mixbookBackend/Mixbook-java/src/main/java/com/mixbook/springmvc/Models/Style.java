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

@Entity
@Table(name="style")
public class Style implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)	
	private Integer style_id;

	@NotNull
	@Size(max=255)   
	@Column(name = "style_name", nullable = false)
	private String style_name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "type_style_id", nullable = false)
	private Type type;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "style")
	private Set<Brand> brands = new HashSet<Brand>(0);

	public Style() {

	}

	public Style(Integer style_id, String style_name, Type type, Set<Brand> brands) {
		this.style_id = style_id;
		this.style_name = style_name;
		this.type = type;
		this.brands = brands;
	}

	public Integer getStyleId() {
		return style_id;
	}

	public void setStyleId(Integer style_id) {
		this.style_id = style_id;
	}

	public String getStyleName() {
		return style_name;
	}

	public void setStyleName(String style_name) {
		this.style_name = style_name;
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
		result = prime * result + ((style_id == null) ? 0 : style_id.hashCode());
		result = prime * result + ((style_name == null) ? 0 : style_name.hashCode());
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
		Style other = (Style) obj;
		if (style_id == null) {
			if (other.style_id != null)
				return false;
		} else if (!style_id.equals(other.style_id))
			return false;
		if (style_name == null) {
			if (other.style_name != null)
				return false;
		} else if (!style_name.equals(other.style_name))
			return false;
		return true;
	}

}
