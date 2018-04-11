package com.mixbook.springmvc.Services;

import java.time.Instant;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import javax.persistence.PersistenceException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.PasswordResetTokenDao;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.PasswordResetToken;
import com.mixbook.springmvc.Models.User;

@Service("passwordResetTokenService")
@Transactional
public class PasswordResetTokenServiceImpl implements PasswordResetTokenService {

	@Autowired
	private PasswordResetTokenDao dao;
	
	@Override
	public User validatePasswordResetToken(Integer userId, String token) throws UnknownServerErrorException {
		try {
			PasswordResetToken passwordResetToken = dao.validatePasswordResetToken(token);
			if ((passwordResetToken == null) || (passwordResetToken.getUser().getUserId() != userId)) {
				return null;
			}
			Calendar calendar = Calendar.getInstance();
			if ((passwordResetToken.getExpiryDate().getTime() - calendar.getTime().getTime() <= 0)) {
				return null;
			}
			User user = passwordResetToken.getUser();
			return user;
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	@Override
	public String generatePasswordResetToken(User user) throws PersistenceException, UnknownServerErrorException {
		try {
			String token = UUID.randomUUID().toString();
			PasswordResetToken passwordResetToken = new PasswordResetToken(token, user);
			dao.generatePasswordResetToken(passwordResetToken);
			return token;
		} catch (PersistenceException e) {
			throw new PersistenceException("Duplicate token creation");
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	@Override
	@Scheduled(cron = "${purge.cron.expression}")
	public void purgeAllExpiredTokensSince() throws UnknownServerErrorException {
		try {
			Date now = Date.from(Instant.now());
			dao.purgeAllExpiredTokensSince(now);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	@Override
	public void deleteToken(PasswordResetToken token) throws UnknownServerErrorException {
		try {
			dao.deleteToken(token);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}
}
