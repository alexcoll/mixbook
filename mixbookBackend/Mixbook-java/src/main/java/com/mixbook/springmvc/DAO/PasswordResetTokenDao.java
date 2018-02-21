package com.mixbook.springmvc.DAO;

import java.util.Date;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Models.PasswordResetToken;

public interface PasswordResetTokenDao {

	PasswordResetToken validatePasswordResetToken(String token) throws Exception;
	
	void generatePasswordResetToken(PasswordResetToken passwordResetToken) throws PersistenceException, Exception;
	
	void purgeAllExpiredTokensSince(Date now) throws Exception;
	
	void deleteToken(PasswordResetToken token) throws Exception;
	
}
