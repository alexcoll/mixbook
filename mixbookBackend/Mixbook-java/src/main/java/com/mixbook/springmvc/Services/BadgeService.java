package com.mixbook.springmvc.Services;

import java.util.List;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Badge;
import com.mixbook.springmvc.Models.User;

/**
 * Interface to provide modular service layer functionality for badge related tasks for the controller layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface BadgeService {

	/**
	 * Loads a complete list of badges.
	 * @return a complete list of badges.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	List<Badge> getAllBadges() throws UnknownServerErrorException;

	/**
	 * Checks for new badges and persists any newly earned badges.
	 * @param user the user for whom to check for newly earned badges.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void checkForNewBadges(User user) throws UnknownServerErrorException;

}
