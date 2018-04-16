package com.mixbook.springmvc.Services;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.AccountUnlockToken;
import com.mixbook.springmvc.Models.User;

/**
 * Interface to provide modular service layer functionality for account unlock related tasks for the controller layer 
 * @author John Tyler Preston
 * @version 1.0
 */
public interface AccountUnlockTokenService {

	/**
	 * Validates an account unlock token.
	 * @param userId the primary key of the user to validate against.
	 * @param token the account unlock token to validate.
	 * @return the user if the validation succeeds, or null if validation fails.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	User validateAccountUnlockToken(Integer userId, String token) throws UnknownServerErrorException;

	/**
	 * Generates an account unlock token.
	 * @param user the user for whom to generate an account unlock token.
	 * @return the token string.
	 * @throws PersistenceException the exception is thrown when a user already has requested a token in the last day.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	String generateAccountUnlockToken(User user) throws PersistenceException, UnknownServerErrorException;

	/**
	 * Purges expired account unlock tokens once a day.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void purgeAllExpiredTokensSince() throws UnknownServerErrorException;

	/**
	 * Deletes an account unlock token.
	 * @param token the token to delete.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void deleteToken(AccountUnlockToken token) throws UnknownServerErrorException;
	
}
