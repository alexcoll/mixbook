package com.mixbook.springmvc.Security;

import java.util.Collection;
import java.util.Date;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Models a user in terms of a JWT.
 * @author John Tyler Preston
 * @version 1.0
 */
public class JwtUser implements UserDetails {

	/**
	 * Primary key of the user.
	 */
	private final Integer id;

	/**
	 * Username of the user.
	 */
	private final String username;

	/**
	 * First name of the user.
	 */
	private final String firstname;

	/**
	 * Last name of the user.
	 */
	private final String lastname;

	/**
	 * Password of the user.
	 */
	private final String password;

	/**
	 * Email of the user.
	 */
	private final String email;

	/**
	 * User permissions roles associated with the user.
	 */
	private final Collection<? extends GrantedAuthority> authorities;

	/**
	 * Enabled flag that determines if a user account can be used or not.
	 */
	private final boolean enabled;

	/**
	 * Date when password was last reset of the user.
	 */
	private final Date lastPasswordResetDate;

	/**
	 * Constructs an instance of a JWT user.
	 * @param id the primary key of the user.
	 * @param username the username of the user.
	 * @param password the password of the user.
	 * @param firstname the first name of the user.
	 * @param lastname the last name of the user.
	 * @param email the email of the user.
	 * @param enabled the enabled flag that determines if a user account can be used or not.
	 * @param lastPasswordResetDate the date when password was last reset of the user.
	 * @param authorities the user permissions roles associated with the user.
	 */
	public JwtUser(
			Integer id,
			String username,
			String firstname,
			String lastname,
			String email,
			String password, Collection<? extends GrantedAuthority> authorities,
			boolean enabled,
			Date lastPasswordResetDate
			) {
		this.id = id;
		this.username = username;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.password = password;
		this.authorities = authorities;
		this.enabled = enabled;
		this.lastPasswordResetDate = lastPasswordResetDate;
	}

	/**
	 * Standard getter method that returns the primary key of the user.
	 * @return the primary key of the user.
	 */
	@JsonIgnore
	public Integer getId() {
		return id;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	/**
	 * Standard getter method that returns the first name of the user.
	 * @return the first name of the user.
	 */
	public String getFirstname() {
		return firstname;
	}

	/**
	 * Standard getter method that returns the last name of the user.
	 * @return the last name of the user.
	 */
	public String getLastname() {
		return lastname;
	}

	/**
	 * Standard getter method that returns the email of the user.
	 * @return the email of the user.
	 */
	public String getEmail() {
		return email;
	}

	@JsonIgnore
	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public boolean isEnabled() {
		return enabled;
	}

	/**
	 * Standard getter method that returns the date when password was last reset of the user.
	 * @return the date when password was last reset of the user.
	 */
	@JsonIgnore
	public Date getLastPasswordResetDate() {
		return lastPasswordResetDate;
	}

}
