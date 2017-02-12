package com.mixbook.springmvc.Services;

import java.util.List;

import com.mixbook.springmvc.Models.User;

public interface UserService {

	User findById(int id);

	User findByEmail(String email);

	User findByEntityUsername(String username);

	List<User> findAllUsers();

	void createUser(User user);

	void deleteUser(User user);

	void editUser(User user);
	
	void changeEmail(User user);
	
	void changePassword(User user);

	boolean isUserEmailUnique(String email);

	boolean isUsernameUnique(String username);
	
}
