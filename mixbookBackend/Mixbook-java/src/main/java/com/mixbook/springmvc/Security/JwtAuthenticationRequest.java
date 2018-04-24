package com.mixbook.springmvc.Security;

import java.io.Serializable;

/**
 * Models a JSON Web Token authentication request.
 * @author John Tyler Preston
 * @version 1.0
 */
public class JwtAuthenticationRequest implements Serializable {

	/**
	 * Standard random <code>serialVersionUID</code>.
	 */
	private static final long serialVersionUID = -8445943548965154778L;

	/**
	 * User's username in the request.
	 */
	private String username;

	/**
	 * User's password in the request.
	 */
	private String password;

	/**
	 * Generic empty constructor that uses the super classes's implementation.
	 */
	public JwtAuthenticationRequest() {
		super();
	}

	/**
	 * Constructs an instance of the JWT authentication request.
	 * @param username the user's username in the request.
	 * @param password the user's password in the request.
	 */
	public JwtAuthenticationRequest(String username, String password) {
		this.setUsername(username);
		this.setPassword(password);
	}

	/**
	 * Standard getter that returns the user's username.
	 * @return the user's username.
	 */
	public String getUsername() {
		return this.username;
	}

	/**
	 * Standard setter that sets the username for the user.
	 * @param username the username to set for the user.
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * Standard getter that returns the user's password.
	 * @return the user's password.
	 */
	public String getPassword() {
		return this.password;
	}

	/**
	 * Standard setter that sets the password for the user.
	 * @param password the password to set for the user.
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	
}
