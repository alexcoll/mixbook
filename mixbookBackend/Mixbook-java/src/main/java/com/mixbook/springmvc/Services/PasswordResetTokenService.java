package com.mixbook.springmvc.Services;

import java.util.Date;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.PasswordResetToken;
import com.mixbook.springmvc.Models.User;

public interface PasswordResetTokenService {

	User validatePasswordResetToken(Integer userId, String token) throws UnknownServerErrorException;
	
	String generatePasswordResetToken(User user) throws PersistenceException, UnknownServerErrorException;
	
	void purgeAllExpiredTokensSince() throws UnknownServerErrorException;
	
	void deleteToken(PasswordResetToken token) throws UnknownServerErrorException;
	
}
