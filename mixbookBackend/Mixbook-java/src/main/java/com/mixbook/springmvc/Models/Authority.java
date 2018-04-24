package com.mixbook.springmvc.Models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.util.List;

/**
 * Models a user permissions based role.
 * @author John Tyler Preston
 * @version 1.0
 */
@Entity
@Table(name = "AUTHORITY")
public class Authority {

	/**
	 * Primary key of Authority table.
	 */
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;

	/**
	 * Permissions role of a user, either a normal user or an administrator.
	 */
	@Column(name = "NAME", length = 50)
	@NotNull
	@Enumerated(EnumType.STRING)
	private AuthorityName name;

	/**
	 * List of users associated with a user permissions role.
	 */
	@ManyToMany(mappedBy = "authorities", fetch = FetchType.LAZY)
	private List<User> users;

	/**
	 * Standard getter method that returns the primary key of the user permissions based role.
	 * @return the primary key of the user permissions based role.
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * Standard setter method that sets the primary key for the user permissions based role.
	 * @param id the primary key to set for the user permissions based role.
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * Standard getter method that returns the user permissions based role.
	 * @return the user permissions based role.
	 */
	public AuthorityName getName() {
		return name;
	}

	/**
	 * Standard setter method that sets the role for the user permissions based role.
	 * @param name the role to set for the user permissions based role.
	 */
	public void setName(AuthorityName name) {
		this.name = name;
	}

	/**
	 * Standard getter method that returns the users associated with the user permissions based role.
	 * @return the users associated with that user permissions based role.
	 */
	public List<User> getUsers() {
		return users;
	}

	/**
	 * Standard setter method that sets the users to be associated with the user permissions based role.
	 * @param users the users to set to be associated with the user permissions based role.
	 */
	public void setUsers(List<User> users) {
		this.users = users;
	}

}
