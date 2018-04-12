package com.mixbook.springmvc.Services;

import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.User;

public interface UserService {

	User findByEntityUsername(String username) throws UnknownServerErrorException;
	
	User findByEntityEmail(String email) throws UnknownServerErrorException;
	
	User loadUserProfile(String username) throws PersistenceException, UnknownServerErrorException;
	
	List<User> loadAllUsers() throws UnknownServerErrorException;

	void createUser(User user) throws PersistenceException, UnknownServerErrorException;

	void deleteUser(User user) throws UnknownServerErrorException;

	void editUser(User user) throws UnknownServerErrorException;
	
	void changeEmail(User user) throws PersistenceException, UnknownServerErrorException;
	
	void changePassword(User user) throws UnknownServerErrorException;
	
	void lockAccount(User user) throws UnknownServerErrorException;
	
	void unlockAccount(User user) throws UnknownServerErrorException;
	
	boolean isUserInfoValid(User user) throws UnknownServerErrorException;
	
	boolean isUserEmailValid(String email) throws UnknownServerErrorException;
	
	boolean isUserPasswordValid(String password) throws UnknownServerErrorException;
	
	boolean isUserUsernameValid(String username) throws UnknownServerErrorException;
	
	boolean isUserFirstNameValid(String firstName) throws UnknownServerErrorException;
	
	boolean isUserLastNameValid(String lastName) throws UnknownServerErrorException;
	
}
