package com.mixbook.springmvc.Services;

import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.User;

/**
 * Interface to provide modular service layer functionality for user related tasks for the controller layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface UserService {

	/**
	 * Loads a user by their username.
	 * @param username the username of the user to load.
	 * @return the user matching the username specified.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	User findByEntityUsername(String username) throws UnknownServerErrorException;

	/**
	 * Loads a user by their email.
	 * @param email the email of the user to load.
	 * @return the user matching the email specified.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	User findByEntityEmail(String email) throws UnknownServerErrorException;

	/**
	 * Loads a user including their badges by their username.
	 * @param username the username of the user to load.
	 * @return the user including their badges matching the userame specified.
	 * @throws PersistenceException the exception is thrown when a nonexistent user is searched.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	User loadUserProfile(String username) throws PersistenceException, UnknownServerErrorException;

	/**
	 * Loads a complete list of users.
	 * @return a complete list of users.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	List<User> loadAllUsers() throws UnknownServerErrorException;

	/**
	 * Creates a user.
	 * @param user the user to create.
	 * @throws PersistenceException the exception is thrown when a user tries to create a duplicate user.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void createUser(User user) throws PersistenceException, UnknownServerErrorException;

	/**
	 * Deletes a user.
	 * @param user the user to delete.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void deleteUser(User user) throws UnknownServerErrorException;

	/**
	 * Edits a user.
	 * @param user the user to edit.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void editUser(User user) throws UnknownServerErrorException;

	/**
	 * Changes the email associated with a user.
	 * @param user the user for whom to change their email.
	 * @throws PersistenceException the exception is thrown when a user tries to use a duplicate email.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void changeEmail(User user) throws PersistenceException, UnknownServerErrorException;

	/**
	 * Changes the password associated with a user.
	 * @param user the user for whom to change their password.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void changePassword(User user) throws UnknownServerErrorException;

	/**
	 * Locks a user's account.
	 * @param user the user for whom to lock their account.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void lockAccount(User user) throws UnknownServerErrorException;

	/**
	 * Unlocks a user's account.
	 * @param user the user for whom to unlock their account.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void unlockAccount(User user) throws UnknownServerErrorException;

	/**
	 * Determines if a user's information is valid.
	 * @param user the user to validate.
	 * @return true if a user's information is all valid, or false if any one piece of information is invalid.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	boolean isUserInfoValid(User user) throws UnknownServerErrorException;

	/**
	 * Determines if a user's email is valid.
	 * @param email the user's email to validate.
	 * @return true if a user's email is valid, or false if it is not valid.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	boolean isUserEmailValid(String email) throws UnknownServerErrorException;

	/**
	 * Determines if a user's password is valid.
	 * @param password the user's password to validate.
	 * @return true if a user's password is valid, or false if it is not valid.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	boolean isUserPasswordValid(String password) throws UnknownServerErrorException;

	/**
	 * Determines if a user's username is valid.
	 * @param username the user's username to validate.
	 * @return true if a user's username is valid, or false if it is not valid.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	boolean isUserUsernameValid(String username) throws UnknownServerErrorException;

	/**
	 * Determines if a user's first name is valid.
	 * @param firstName the user's first name to validate.
	 * @return true if a user's first name is valid, or false if it is not valid.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	boolean isUserFirstNameValid(String firstName) throws UnknownServerErrorException;

	/**
	 * Determines if a user's last name is valid.
	 * @param lastName the user's last name to validate.
	 * @return true if a user's last name is valid, or false if it is not valid.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	boolean isUserLastNameValid(String lastName) throws UnknownServerErrorException;
	
}
