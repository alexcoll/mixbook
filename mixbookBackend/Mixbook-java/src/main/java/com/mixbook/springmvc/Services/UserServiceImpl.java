package com.mixbook.springmvc.Services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

import javax.persistence.PersistenceException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.UserDao;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Authority;
import com.mixbook.springmvc.Models.AuthorityName;
import com.mixbook.springmvc.Models.User;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao dao;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private static final String FIRSTLASTNAME_PATTERN = "^\\w+$";

	private static final String PASSWORD_PATTERN = "^(?=.*[\\p{Ll}])(?=.*[\\p{Lu}])(?=.*[\\p{L}])(?=.*\\d)(?=.*[$@$!%*?&])[\\p{Ll}‌​\\p{Lu}\\p{L}\\d$@$!%*?&]{8,}";

	private static final String EMAIL_PATTERN =
			"^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
					+ "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
	
	public User findByEntityUsername(String username) throws UnknownServerErrorException {
		try {
			User user = dao.findByEntityUsername(username);
			return user;
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}
	
	public User findByEntityEmail(String email) throws UnknownServerErrorException {
		try {
			User user = dao.findByEntityEmail(email);
			return user;
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}
	
	public User loadUserProfile(String username) throws PersistenceException, UnknownServerErrorException {
		try {
			User user = dao.loadUserProfile(username);
			return user;
		} catch (PersistenceException e) {
			throw new PersistenceException("User not found!");
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}
	
	@Override
	public List<User> loadAllUsers() throws UnknownServerErrorException {
		try {
			return dao.loadAllUsers();
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public void createUser(User user) throws PersistenceException, UnknownServerErrorException {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setEnabled(true);
		Date currentTimestamp = new Date();
		user.setLastPasswordResetDate(currentTimestamp);
		user.setNumberOfRecipes(0);
		user.setNumberOfRatings(0);
		user.setSumOfPersonalRecipeRatings(0);
		user.setNumberOfPersonalRecipeRatings(0);
		List<Authority> authorities = new ArrayList<Authority>();
		Authority authority = new Authority();
		authority.setId(1);
		authority.setName(AuthorityName.ROLE_USER);
		authorities.add(authority);
		user.setAuthorities(authorities);
		user.getBadges().clear();
		user.getBrands().clear();
		user.getRecipes().clear();
		user.getUserRecipeHasReviews().clear();
		user.getUserRatingReviews().clear();
		try {
			dao.createUser(user);
		} catch (PersistenceException e) {
			throw new PersistenceException();
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public void deleteUser(User user) throws UnknownServerErrorException {
		try {
			dao.deleteUser(user);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public void editUser(User user) throws UnknownServerErrorException {
		try {
			dao.editUser(user);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public void changeEmail(User user) throws PersistenceException, UnknownServerErrorException {
		try {
			dao.changeEmail(user);
		} catch (PersistenceException e) {
			throw new PersistenceException();
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public void changePassword(User user) throws UnknownServerErrorException {
		Date currentTimestamp = new Date();
		user.setLastPasswordResetDate(currentTimestamp);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		try {
			dao.changePassword(user);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}
	
	@Override
	public void lockAccount(User user) throws UnknownServerErrorException {
		try {
			dao.lockAccount(user);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}
	
	@Override
	public void unlockAccount(User user) throws UnknownServerErrorException {
		try {
			dao.unlockAccount(user);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	public boolean isUserInfoValid(User user) throws UnknownServerErrorException {
		try {
			if (!isUserEmailValid(user.getEmail())) {
				return false;
			}
			if (!isUserPasswordValid(user.getPassword())) {
				return false;
			}
			if (!isUserUsernameValid(user.getUsername())) {
				return false;
			}
			if (!isUserFirstNameValid(user.getFirstName())) {
				return false;
			}
			if (!isUserLastNameValid(user.getLastName())) {
				return false;
			}
		} catch (UnknownServerErrorException e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
		return true;
	}

	public boolean isUserEmailValid(String email) throws UnknownServerErrorException {
		if (email == null) {
			return false;
		}
		if (email.isEmpty()) {
			return false;
		}
		try {
			Pattern pattern = Pattern.compile(EMAIL_PATTERN);
			Matcher matcher = pattern.matcher(email);
			if (email.length() > 100 || !matcher.matches()) {
				return false;
			}
		} catch (PatternSyntaxException e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
		return true;
	}

	public boolean isUserPasswordValid(String password) throws UnknownServerErrorException {
		if (password == null) {
			return false;
		}
		if (password.isEmpty()) {
			return false;
		}
		try {
			Pattern pattern = Pattern.compile(PASSWORD_PATTERN);
			Matcher matcher = pattern.matcher(password);
			if (password.length() > 63 || !matcher.matches()) {
				return false;
			}
		} catch (PatternSyntaxException e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
		return true;
	}

	public boolean isUserUsernameValid(String username) throws UnknownServerErrorException {
		if (username == null) {
			return false;
		}
		if (username.isEmpty()) {
			return false;
		}
		try {
			Pattern pattern = Pattern.compile(FIRSTLASTNAME_PATTERN, Pattern.UNICODE_CHARACTER_CLASS);
			Matcher matcher = pattern.matcher(username);
			if (username.length() > 63 || username.length() < 6 || !matcher.matches()) {
				return false;
			}
		} catch (PatternSyntaxException e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
		return true;
	}

	public boolean isUserFirstNameValid(String first_name) throws UnknownServerErrorException {
		if (first_name == null) {
			return false;
		}
		if (first_name.isEmpty()) {
			return false;
		}
		try {
			Pattern pattern = Pattern.compile(FIRSTLASTNAME_PATTERN, Pattern.UNICODE_CHARACTER_CLASS);
			Matcher matcher = pattern.matcher(first_name);
			if (first_name.length() > 63 || !matcher.matches()) {
				return false;
			}
		} catch (PatternSyntaxException e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
		return true;
	}

	public boolean isUserLastNameValid(String last_name) throws UnknownServerErrorException {
		if (last_name == null) {
			return false;
		}
		if (last_name.isEmpty()) {
			return false;
		}
		try {
			Pattern pattern = Pattern.compile(FIRSTLASTNAME_PATTERN, Pattern.UNICODE_CHARACTER_CLASS);
			Matcher matcher = pattern.matcher(last_name);
			if (last_name.length() > 63 || !matcher.matches()) {
				return false;
			}
		} catch (PatternSyntaxException e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
		return true;
	}
}
