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

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * Models a badge.
 * @author John Tyler Preston
 * @version 1.0
 */
@Entity
@Table(name = "badges")
@JsonInclude(Include.NON_EMPTY)
public class Badge implements Serializable {

	/**
	 * Primary key of the Badge table.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "badge_id", nullable = false)
	private Integer badgeId;

	/**
	 * Name of the badge.
	 */
	@Size(max = 255)
	@Column(name = "badge_name", nullable = false)
	private String badgeName;

	/**
	 * Description of the badge.
	 */
	@Size(max = 255)
	@Column(name = "badge_description", nullable = false)
	private String badgeDescription;

	/**
	 * Users associated with the badge.
	 */
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "badges")
	private Set<User> users = new HashSet<User>(0);

	/**
	 * Default empty constructor of a badge to suit Jackson's requirement.
	 */
	public Badge() {

	}

	/**
	 * Constructs an instance of a badge.
	 * @param badgeId the primary key of the badge.
	 * @param badgeName the name of the badge.
	 */
	public Badge(Integer badgeId, String badgeName) {
		this.badgeId = badgeId;
		this.badgeName = badgeName;
	}

	/**
	 * Constructs an instance of a badge.
	 * @param badgeId the primary key of the badge.
	 * @param badgeName the name of the badge.
	 * @param badgeDescription the description of the badge.
	 */
	public Badge(Integer badgeId, String badgeName, String badgeDescription) {
		this.badgeId = badgeId;
		this.badgeName = badgeName;
		this.badgeDescription = badgeDescription;
	}

	/**
	 * Constructs an instance of a badge.
	 * @param badgeId the primary key of the badge.
	 * @param badgeName the name of the badge.
	 * @param badgeDescription the description of the badge.
	 * @param users the users associated with the badge.
	 */
	public Badge(Integer badgeId, String badgeName, String badgeDescription, Set<User> users) {
		this.badgeId = badgeId;
		this.badgeName = badgeName;
		this.badgeDescription = badgeDescription;
		this.users = users;
	}

	/**
	 * Standard getter method that returns the primary key of the badge.
	 * @return the primary key of the badge.
	 */
	public Integer getBadgeId() {
		return badgeId;
	}

	/**
	 * Standard setter method that sets the primary key for the badge.
	 * @param badgeId the primary key to set for the badge.
	 */
	public void setBadgeId(Integer badgeId) {
		this.badgeId = badgeId;
	}

	/**
	 * Standard getter method that returns the name of the badge.
	 * @return the name of the badge.
	 */
	public String getBadgeName() {
		return badgeName;
	}

	/**
	 * Standard setter method that sets the name for the badge.
	 * @param badgeName the name to set for the badge.
	 */
	public void setBadgeName(String badgeName) {
		this.badgeName = badgeName;
	}

	/**
	 * Standard getter method that returns the description of the badge.
	 * @return the description of the badge.
	 */
	public String getBadgeDescription() {
		return badgeDescription;
	}

	/**
	 * Standard setter method that sets the description for the badge.
	 * @param badgeDescription the description to set for the badge.
	 */
	public void setBadgeDescription(String badgeDescription) {
		this.badgeDescription = badgeDescription;
	}

	/**
	 * Standard getter method that returns the users associated with the badge.
	 * @return the users associated with the badge.
	 */
	public Set<User> getUsers() {
		return users;
	}

	/**
	 * Standard setter method that sets the users to be associated with the badge.
	 * @param users the users to be associated with the badge.
	 */
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
