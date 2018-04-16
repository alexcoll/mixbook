package com.mixbook.springmvc.Services;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;

/**
 * Interface to provide modular service layer functionality for email related tasks for the controller layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface EmailService {

	/**
	 * Generates a reset password email.
	 * @param to the intended receiver of the email.
	 * @param url the generated URL to be used to reset password.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void generateResetPasswordEmail(String to, String url) throws UnknownServerErrorException;

	/**
	 * Generates an account unlock email.
	 * @param to the intended receiver of the email.
	 * @param url the generated URL to be used to unlock account.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void generateAccountUnlockEmail(String to, String url) throws UnknownServerErrorException;
	
}
