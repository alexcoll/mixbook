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
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@Entity
@Table(name = "badges")
@JsonInclude(Include.NON_EMPTY)
@JsonAutoDetect(fieldVisibility = Visibility.ANY, getterVisibility = Visibility.NONE, setterVisibility = Visibility.NONE, creatorVisibility = Visibility.NONE)
public class Badge implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "badge_id", nullable = false)
	private Integer badgeId;

	@Size(max = 255)
	@Column(name = "badge_name", nullable = false)
	private String badgeName;

	@Size(max = 255)
	@Column(name = "badge_description", nullable = false)
	private String badgeDescription;

	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "badges")
	private Set<User> users = new HashSet<User>(0);

	public Badge() {

	}
	
	public Badge(Integer badge_id, String badgeName) {
		this.badgeId = badge_id;
		this.badgeName = badgeName;
	}
	
	public Badge(Integer badge_id, String badgeName, String badgeDescription) {
		this.badgeId = badge_id;
		this.badgeName = badgeName;
		this.badgeDescription = badgeDescription;
	}

	public Badge(Integer badge_id, String badgeName, String badgeDescription, Set<User> users) {
		this.badgeId = badge_id;
		this.badgeName = badgeName;
		this.badgeDescription = badgeDescription;
		this.users = users;
	}

	public Integer getBadgeId() {
		return badgeId;
	}

	public void setBadgeId(Integer badgeId) {
		this.badgeId = badgeId;
	}

	public String getBadgeName() {
		return badgeName;
	}

	public void setBadgeName(String badgeName) {
		this.badgeName = badgeName;
	}

	public String getBadgeDescription() {
		return badgeDescription;
	}

	public void setBadgeDescription(String badgeDescription) {
		this.badgeDescription = badgeDescription;
	}

	public Set<User> getUsers() {
		return users;
	}

	public void setUsers(Set<User> users) {
		this.users = users;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((badgeId == null) ? 0 : badgeId.hashCode());
		result = prime * result + ((badgeName == null) ? 0 : badgeName.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof Badge))
			return false;
		Badge other = (Badge) obj;
		if (badgeId == null) {
			if (other.badgeId != null)
				return false;
		} else if (!badgeId.equals(other.badgeId))
			return false;
		if (badgeName == null) {
			if (other.badgeName != null)
				return false;
		} else if (!badgeName.equals(other.badgeName))
			return false;
		return true;
	}

}
