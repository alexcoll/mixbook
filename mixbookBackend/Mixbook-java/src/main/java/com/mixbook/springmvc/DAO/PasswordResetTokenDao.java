package com.mixbook.springmvc.DAO;

import java.util.Date;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Models.PasswordResetToken;

/**
 * Interface to provide modular data layer functionality for password reset related tasks for the service layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface PasswordResetTokenDao {

	/**
	 * Validates a password reset token.
	 * @param token the password reset token to validate.
	 * @return the password reset token if the validation succeeds.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	PasswordResetToken validatePasswordResetToken(String token) throws Exception;

	/**
	 * Generates a password reset token.
	 * @param passwordResetToken the password reset token to persist.
	 * @throws PersistenceException the exception is thrown when a user already has requested a token in the last day.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void generatePasswordResetToken(PasswordResetToken passwordResetToken) throws PersistenceException, Exception;

	/**
	 * Purges expired password reset tokens once a day.
	 * @param now the current date.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void purgeAllExpiredTokensSince(Date now) throws Exception;

	/**
	 * Deletes a password reset token.
	 * @param token the token to delete.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void deleteToken(PasswordResetToken token) throws Exception;
	
}
