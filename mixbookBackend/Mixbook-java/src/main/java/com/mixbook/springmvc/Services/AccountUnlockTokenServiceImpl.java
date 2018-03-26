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

import com.mixbook.springmvc.DAO.AccountUnlockTokenDao;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.AccountUnlockToken;
import com.mixbook.springmvc.Models.User;

@Service("accountUnlockTokenService")
@Transactional
public class AccountUnlockTokenServiceImpl implements AccountUnlockTokenService {

	@Autowired
	private AccountUnlockTokenDao dao;

	@Override
	public User validateAccountUnlockToken(Integer userId, String token) throws UnknownServerErrorException {
		try {
			AccountUnlockToken accountUnlockToken = dao.validateAccountUnlockToken(token);
			if ((accountUnlockToken == null) || (accountUnlockToken.getUser().getUserId() != userId)) {
				return null;
			}
			Calendar calendar = Calendar.getInstance();
			if ((accountUnlockToken.getExpiryDate().getTime() - calendar.getTime().getTime() <= 0)) {
				return null;
			}
			User user = accountUnlockToken.getUser();
			return user;
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	@Override
	public String generateAccountUnlockToken(User user) throws PersistenceException, UnknownServerErrorException {
		try {
			String token = UUID.randomUUID().toString();
			AccountUnlockToken accountUnlockToken = new AccountUnlockToken(token, user);
			dao.generateAccountUnlockToken(accountUnlockToken);
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
	public void deleteToken(AccountUnlockToken token) throws UnknownServerErrorException {
		try {
			dao.deleteToken(token);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

}
