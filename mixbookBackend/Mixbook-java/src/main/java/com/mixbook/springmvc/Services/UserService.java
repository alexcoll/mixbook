package com.mixbook.springmvc.Services;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.PasswordResetToken;
import com.mixbook.springmvc.Models.User;

public interface UserService {

	User findByEntityUsername(String username) throws UnknownServerErrorException;
	
	User findByEntityEmail(String email) throws UnknownServerErrorException;

	void createUser(User user) throws PersistenceException, UnknownServerErrorException;

	void deleteUser(User user) throws UnknownServerErrorException;

	void editUser(User user) throws UnknownServerErrorException;
	
	void changeEmail(User user) throws PersistenceException, UnknownServerErrorException;
	
	void changePassword(User user) throws UnknownServerErrorException;
	
	boolean isUserInfoValid(User user) throws UnknownServerErrorException;
	
	boolean isUserEmailValid(String email) throws UnknownServerErrorException;
	
	boolean isUserPasswordValid(String password) throws UnknownServerErrorException;
	
	boolean isUserUsernameValid(String username) throws UnknownServerErrorException;
	
	boolean isUserFirstNameValid(String first_name) throws UnknownServerErrorException;
	
	boolean isUserLastNameValid(String last_name) throws UnknownServerErrorException;
	
}
