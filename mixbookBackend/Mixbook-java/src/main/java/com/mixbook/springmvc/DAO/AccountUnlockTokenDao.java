package com.mixbook.springmvc.DAO;

import java.util.Date;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Models.AccountUnlockToken;

public interface AccountUnlockTokenDao {

	AccountUnlockToken validateAccountUnlockToken(String token) throws Exception;

	void generateAccountUnlockToken(AccountUnlockToken accountUnlockToken) throws PersistenceException, Exception;

	void purgeAllExpiredTokensSince(Date now) throws Exception;

	void deleteToken(AccountUnlockToken token) throws Exception;

}
