package com.mixbook.springmvc.Services;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.AccountUnlockToken;
import com.mixbook.springmvc.Models.User;

public interface AccountUnlockTokenService {

	User validateAccountUnlockToken(Integer userId, String token) throws UnknownServerErrorException;

	String generateAccountUnlockToken(User user) throws PersistenceException, UnknownServerErrorException;

	void purgeAllExpiredTokensSince() throws UnknownServerErrorException;

	void deleteToken(AccountUnlockToken token) throws UnknownServerErrorException;
	
}
