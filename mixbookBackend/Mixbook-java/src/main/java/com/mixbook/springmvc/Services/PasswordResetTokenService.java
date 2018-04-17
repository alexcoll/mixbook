package com.mixbook.springmvc.Services;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.PasswordResetToken;
import com.mixbook.springmvc.Models.User;

/**
 * Interface to provide modular service layer functionality for password related tasks for the controller layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface PasswordResetTokenService {

	/**
	 * Validates a password reset token.
	 * @param userId the primary key of the user to validate against.
	 * @param token the password reset token to validate.
	 * @return the user if the validation succeeds, or null if validation fails.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	User validatePasswordResetToken(Integer userId, String token) throws UnknownServerErrorException;

	/**
	 * Generates a password reset token.
	 * @param user the user for whom to generate a password reset token.
	 * @return the token string.
	 * @throws PersistenceException the exception is thrown when a user already has requested a token in the last day.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	String generatePasswordResetToken(User user) throws PersistenceException, UnknownServerErrorException;

	/**
	 * Purges expired password reset tokens once a day.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void purgeAllExpiredTokensSince() throws UnknownServerErrorException;

	/**
	 * Deletes a password reset token.
	 * @param token the token to delete.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void deleteToken(PasswordResetToken token) throws UnknownServerErrorException;
	
}
