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
	
	boolean isUserInfoValid(User user);
	
	boolean isUserEmailValid(String email);
	
	boolean isUserPasswordValid(String password);
	
	boolean isUserUsernameValid(String username);
	
	boolean isUserFirstNameValid(String first_name);
	
	boolean isUserLastNameValid(String last_name);
	
}
