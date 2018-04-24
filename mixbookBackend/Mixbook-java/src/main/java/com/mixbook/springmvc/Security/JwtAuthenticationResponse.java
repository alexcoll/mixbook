package com.mixbook.springmvc.Security;

import java.io.Serializable;

/**
 * Models an authentication response.
 * @author John Tyler Preston
 * @version 1.0
 */
public class JwtAuthenticationResponse implements Serializable {

	/**
	 * Standard random <code>serialVersionUID</code>.
	 */
	private static final long serialVersionUID = 1250166508152483573L;

	/**
	 * Represents the JWT token.
	 */
	private final String token;

	/**
	 * Constructs an instance of an authentication response.
	 * @param token the JWT token to set.
	 */
	public JwtAuthenticationResponse(String token) {
		this.token = token;
	}

	/**
	 * Standard getter that returns the JWT token.
	 * @return the JWT token.
	 */
	public String getToken() {
		return this.token;
	}

}
