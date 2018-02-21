package com.mixbook.springmvc.DAO;

import java.util.Date;

import javax.persistence.PersistenceException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.query.NativeQuery;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.PasswordResetToken;

@Repository("passwordResetTokenDao")
public class PasswordResetTokenDaoImpl extends AbstractDao<Integer, PasswordResetToken> implements PasswordResetTokenDao {

	private static final Logger logger = LogManager.getLogger(PasswordResetTokenDaoImpl.class);
	
	@Override
	public PasswordResetToken validatePasswordResetToken(String token) throws Exception {
		NativeQuery q = getSession().createNativeQuery("SELECT * FROM password_reset_token WHERE token = :token", PasswordResetToken.class);
		q.setParameter("token", token);
		PasswordResetToken passwordResetToken = (PasswordResetToken) q.getSingleResult();
		return passwordResetToken;
	}

	@Override
	public void generatePasswordResetToken(PasswordResetToken passwordResetToken) throws PersistenceException, Exception {
		persist(passwordResetToken);
	}

	@Override
	public void purgeAllExpiredTokensSince(Date now) throws Exception {
		NativeQuery q = getSession().createNativeQuery("DELETE FROM password_reset_token WHERE expiry_date <= :expiry_date");
		q.setParameter("expiry_date", now);
		q.executeUpdate();
	}

	@Override
	public void deleteToken(PasswordResetToken token) throws Exception {
		NativeQuery q = getSession().createNativeQuery("DELETE FROM password_reset_token WHERE user_user_id = :user_user_id");
		q.setParameter("user_user_id", token.getUser().getUserId());
		q.executeUpdate();
	}
	
}
