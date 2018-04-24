package com.mixbook.springmvc.Models;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

/**
 * Models an account unlock token.
 * @author John Tyler Preston
 * @version 1.0
 */
@Entity
@Table(name = "account_unlock_token")
public class AccountUnlockToken {

	/**
	 * Expiration time of an account unlock token.
	 */
	private static final int EXPIRATION = 60 * 24;

	/**
	 * Primary key of the Account Unlock Token table.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	/**
	 * Token's UUID.
	 */
	@NotNull
	@Column(name = "token", nullable = false)
	private String token;

	/**
	 * User associated with the token.
	 */
	@OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
	private User user;

	/**
	 * Expiration date of the token.
	 */
	@Column(name = "expiry_date")
	@Temporal(TemporalType.TIMESTAMP)
	@NotNull
	private Date expiryDate;

	/**
	 * Default empty constructor of an account unlock token to suit Jackson's requirement.
	 */
	public AccountUnlockToken() {
		super();
	}

	/**
	 * Constructs an instance of an account unlock token.
	 * @param token the UUID to use with the token.
	 */
	public AccountUnlockToken(final String token) {
		super();

		this.token = token;
		this.expiryDate = calculateExpiryDate(EXPIRATION);
	}

	/**
	 * Constructs an instance of an account unlock token.
	 * @param token the UUID to use with the token.
	 * @param user the user associated with the token.
	 */
	public AccountUnlockToken(final String token, final User user) {
		super();

		this.token = token;
		this.user = user;
		this.expiryDate = calculateExpiryDate(EXPIRATION);
	}

	/**
	 * Standard getter method that returns the primary key of the account unlock token.
	 * @return the primary key of the account unlock token.
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * Standard setter method that sets the primary key for the account unlock token.
	 * @param id the primary key to set for the account unlock token.
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * Standard getter method that returns the UUID of the account unlock token.
	 * @return the UUID of the account unlock token.
	 */
	public String getToken() {
		return token;
	}

	/**
	 * Standard setter method that sets the UUID for the account unlock token.
	 * @param token the UUID to set for the account unlock token.
	 */
	public void setToken(final String token) {
		this.token = token;
	}

	/**
	 * Standard getter method that returns the user of the account unlock token.
	 * @return the user of the account unlock token.
	 */
	public User getUser() {
		return user;
	}

	/**
	 * Standard setter method that sets the user for the account unlock token.
	 * @param user the user to set for the account unlock token.
	 */
	public void setUser(final User user) {
		this.user = user;
	}

	/**
	 * Standard getter method that returns the expiration date of the account unlock token.
	 * @return the expiration date of the account unlock token.
	 */
	public Date getExpiryDate() {
		return expiryDate;
	}

	/**
	 * Standard setter method that sets the expiration date for the account unlock token.
	 * @param expiryDate the expiration date to set for the account unlock token.
	 */
	public void setExpiryDate(final Date expiryDate) {
		this.expiryDate = expiryDate;
	}

	/**
	 * Calculates the expiration date of a token.
	 * @param expiryTimeInMinutes the amount of time to allow before expiration in minutes.
	 * @return the calculated expiration date for the token.
	 */
	private Date calculateExpiryDate(final int expiryTimeInMinutes) {
		final Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(new Date().getTime());
		calendar.add(Calendar.MINUTE, expiryTimeInMinutes);
		return new Date(calendar.getTime().getTime());
	}

	/**
	 * Updates the token's UUID and expiration date.
	 * @param token the UUID of the token.
	 */
	public void updateToken(final String token) {
		this.token = token;
		this.expiryDate = calculateExpiryDate(EXPIRATION);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((expiryDate == null) ? 0 : expiryDate.hashCode());
		result = prime * result + ((token == null) ? 0 : token.hashCode());
		result = prime * result + ((user == null) ? 0 : user.hashCode());
		return result;
	}

	@Override
	public boolean equals(final Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		final AccountUnlockToken other = (AccountUnlockToken) obj;
		if (expiryDate == null) {
			if (other.expiryDate != null) {
				return false;
			}
		} else if (!expiryDate.equals(other.expiryDate)) {
			return false;
		}
		if (token == null) {
			if (other.token != null) {
				return false;
			}
		} else if (!token.equals(other.token)) {
			return false;
		}
		if (user == null) {
			if (other.user != null) {
				return false;
			}
		} else if (!user.equals(other.user)) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		final StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append("Token [String=").append(token).append("]").append("[Expires").append(expiryDate)
				.append("]");
		return stringBuilder.toString();
	}
}
