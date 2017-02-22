package com.mixbook.springmvc.DAO;

import java.sql.SQLException;
import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Models.User;

public interface UserDao {
	
	User findById(int id);

	User findByEmail(String email);

	User findByEntityUsername(String username);

	List<User> findAllUsers();

	void createUser(User user) throws PersistenceException;

	void deleteUser(User user);

	void editUser(User user);
	
	void changeEmail(User user) throws PersistenceException;
	
	void changePassword(User user);
	
}
