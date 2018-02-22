package com.mixbook.springmvc.DAO;

import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Models.Badge;
import com.mixbook.springmvc.Models.User;

public interface BadgeDao {
	
	List<Badge> getAllBadges() throws Exception;
	
	User checkForNewBadges(User user) throws Exception;
	
	void assignNewBadges(User user) throws PersistenceException, Exception;

}
