package com.mixbook.springmvc.DAO;

import java.util.Date;

import javax.persistence.PersistenceException;

import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.AccountUnlockToken;

/**
 * Provides the concrete implementation of the modular data layer functionality for account unlock related tasks for the service layer.
 * @author John Tyler Preston
 * @version 1.0
 */
@Repository("accountUnlockTokenDao")
public class AccountUnlockTokenDaoImpl extends AbstractDao<Integer, AccountUnlockToken>
		implements AccountUnlockTokenDao {

	@Override
	public AccountUnlockToken validateAccountUnlockToken(String token) throws Exception {
		NativeQuery q = getSession().createNativeQuery("SELECT * FROM account_unlock_token WHERE token = :token",
				AccountUnlockToken.class);
		q.setParameter("token", token);
		AccountUnlockToken accountUnlockToken = (AccountUnlockToken) q.getSingleResult();
		return accountUnlockToken;
	}

	@Override
	public void generateAccountUnlockToken(AccountUnlockToken accountUnlockToken)
			throws PersistenceException, Exception {
		persist(accountUnlockToken);
	}

	@Override
	public void purgeAllExpiredTokensSince(Date now) throws Exception {
		NativeQuery q = getSession()
				.createNativeQuery("DELETE FROM account_unlock_token WHERE expiry_date <= :expiry_date");
		q.setParameter("expiry_date", now);
		q.executeUpdate();
	}

	@Override
	public void deleteToken(AccountUnlockToken token) throws Exception {
		NativeQuery q = getSession()
				.createNativeQuery("DELETE FROM account_unlock_token WHERE user_user_id = :user_user_id");
		q.setParameter("user_user_id", token.getUser().getUserId());
		q.executeUpdate();
	}

}
