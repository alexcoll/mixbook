package com.mixbook.springmvc.DAO;

import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Models.User;

/**
 * Interface to provide modular data layer functionality for user related tasks for the service layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface UserDao {

	/**
	 * Loads a user by username.
	 * @param username the username of the user to load.
	 * @return the user associated with the username.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	User findByEntityUsername(String username) throws Exception;

	/**
	 * Loads a user by their email.
	 * @param email the email of the user to load.
	 * @return the user matching the email specified.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	User findByEntityEmail(String email) throws Exception;

	/**
	 * Loads a user including their badges by their username.
	 * @param username the username of the user to load.
	 * @return the user including their badges matching the username specified.
	 * @throws PersistenceException the exception is thrown when a nonexistent user is searched.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	User loadUserProfile(String username) throws PersistenceException, Exception;

	/**
	 * Loads a complete list of users.
	 * @return a complete list of users.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	List<User> loadAllUsers() throws Exception;

	/**
	 * Creates a user.
	 * @param user the user to create.
	 * @throws PersistenceException the exception is thrown when a user tries to create a duplicate user.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void createUser(User user) throws PersistenceException, Exception;

	/**
	 * Deletes a user.
	 * @param user the user to delete.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void deleteUser(User user) throws Exception;

	/**
	 * Edits a user.
	 * @param user the user to edit.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void editUser(User user) throws Exception;

	/**
	 * Changes the email associated with a user.
	 * @param user the user for whom to change their email.
	 * @throws PersistenceException the exception is thrown when a user tries to use a duplicate email.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void changeEmail(User user) throws PersistenceException, Exception;

	/**
	 * Changes the password associated with a user.
	 * @param user the user for whom to change their password.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void changePassword(User user) throws Exception;

	/**
	 * Locks a user's account.
	 * @param user the user for whom to lock their account.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void lockAccount(User user) throws Exception;

	/**
	 * Unlocks a user's account.
	 * @param user the user for whom to unlock their account.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void unlockAccount(User user) throws Exception;
	
}
