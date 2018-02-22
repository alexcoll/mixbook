package com.mixbook.springmvc.DAO;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Models.PasswordResetToken;
import com.mixbook.springmvc.Models.User;

public interface UserDao {

	User findByEntityUsername(String username) throws Exception;
	
	User findByEntityEmail(String email) throws Exception;
	
	User loadUserProfile(String username) throws PersistenceException, Exception;

	void createUser(User user) throws PersistenceException, Exception;

	void deleteUser(User user) throws Exception;

	void editUser(User user) throws Exception;
	
	void changeEmail(User user) throws PersistenceException, Exception;
	
	void changePassword(User user) throws Exception;
	
}
