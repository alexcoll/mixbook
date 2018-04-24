package com.mixbook.springmvc.DAO;

import java.util.Date;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.AccountUnlockToken;

/**
 * Interface to provide modular data layer functionality for account unlock related tasks for the service layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface AccountUnlockTokenDao {

	/**
	 * Validates an account unlock token.
	 * @param token the account unlock token to validate.
	 * @return the account unlock token if the validation succeeds.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	AccountUnlockToken validateAccountUnlockToken(String token) throws Exception;

	/**
	 * Generates an account unlock token.
	 * @param accountUnlockToken the account unlock token to persist.
	 * @throws PersistenceException the exception is thrown when a user already has requested a token in the last day.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void generateAccountUnlockToken(AccountUnlockToken accountUnlockToken) throws PersistenceException, Exception;

	/**
	 * Purges expired account unlock tokens once a day.
	 * @param now the current date.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void purgeAllExpiredTokensSince(Date now) throws Exception;

	/**
	 * Deletes an account unlock token.
	 * @param token the token to delete.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void deleteToken(AccountUnlockToken token) throws Exception;

}
