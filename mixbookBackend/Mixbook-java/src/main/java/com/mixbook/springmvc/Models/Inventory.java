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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="inventories")
public class Inventory implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)	
	private Integer inventories_id;

	@NotNull
	@Column(name = "users_user_id", nullable = false)
	private Integer users_user_id;

	@NotNull
	@Size(max=255)   
	@Column(name = "brand", nullable = false)
	private String brand;

	@NotNull
	@Size(max=255)   
	@Column(name = "type", nullable = false)
	private String type;

	@NotNull
	@Size(max=255)   
	@Column(name = "style", nullable = false)
	private String style;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	public Inventory() {

	}

	public Inventory(Integer inventories_id, Integer users_user_id, String brand, String type,
			String style, User user) {
		this.inventories_id = inventories_id;
		this.users_user_id = users_user_id;
		this.brand = brand;
		this.type = type;
		this.style = style;
		this.user = user;
	}

	public Integer getInventoriesId() {
		return inventories_id;
	}

	public void setInventoriesId(Integer inventories_id) {
		this.inventories_id = inventories_id;
	}

	public Integer getUsersUserId() {
		return users_user_id;
	}

	public void setUsersUserId(Integer users_user_id) {
		this.users_user_id = users_user_id;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((inventories_id == null) ? 0 : inventories_id.hashCode());
		result = prime * result + ((users_user_id == null) ? 0 : users_user_id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Inventory))
			return false;
		Inventory other = (Inventory) obj;
		if (inventories_id == null) {
			if (other.inventories_id != null)
				return false;
		} else if (!inventories_id.equals(other.inventories_id))
			return false;
		if (users_user_id == null) {
			if (other.users_user_id != null)
				return false;
		} else if (!users_user_id.equals(other.users_user_id))
			return false;
		return true;
	}

}
