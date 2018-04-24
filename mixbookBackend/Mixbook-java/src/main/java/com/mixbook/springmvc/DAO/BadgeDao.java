package com.mixbook.springmvc.DAO;

import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Badge;
import com.mixbook.springmvc.Models.User;

/**
 * Interface to provide modular data layer functionality for badge related tasks for the service layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface BadgeDao {

	/**
	 * Loads a complete list of badges.
	 * @return a complete list of badges.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	List<Badge> getAllBadges() throws Exception;

	/**
	 * Loads a list of badges for a user.
	 * @param user the user for whom to load badges.
	 * @return a list of badges for a user.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	User checkForNewBadges(User user) throws Exception;

	/**
	 * Assigns newly earned badges to a user.
	 * @param user the user to receive the new badges.
	 * @throws PersistenceException the exception is thrown when a user already has earned a badge previously and a duplicate badge is attempting to be added.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void assignNewBadges(User user) throws PersistenceException, Exception;

}
