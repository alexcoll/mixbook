package com.mixbook.springmvc.Services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.UserDao;
import com.mixbook.springmvc.Models.Authority;
import com.mixbook.springmvc.Models.AuthorityName;
import com.mixbook.springmvc.Models.JsonResponse;
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

	public User findById(int id) {
		return dao.findById(id);
	}

	public User findByEmail(String email) {
		return dao.findByEmail(email);	
	}

	public User findByEntityUsername(String username) {
		return dao.findByEntityUsername(username);
	}

	@SuppressWarnings("unchecked")
	public List<User> findAllUsers() {
		return dao.findAllUsers();
	}

	public void createUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setEnabled(true);
		Date currentTimestamp = new Date();
		user.setLastPasswordResetDate(currentTimestamp);
		List<Authority> authorities = new ArrayList<Authority>();
		Authority authority = new Authority();
		authority.setId(1);
		authority.setName(AuthorityName.ROLE_USER);
		authorities.add(authority);
		user.setAuthorities(authorities);
		dao.createUser(user);
	}

	public void deleteUser(User user) {
		dao.deleteUser(user);
	}

	public void editUser(User user) {
		dao.editUser(user);
	}

	public void changeEmail(User user) {
		dao.changeEmail(user);
	}

	public void changePassword(User user) {
		Date currentTimestamp = new Date();
		user.setLastPasswordResetDate(currentTimestamp);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		dao.changePassword(user);
	}

	public boolean isUserEmailUnique(String email) {
		User user = findByEmail(email);
		if (user == null) {
			return true;
		}
		else {
			return false;
		}
	}

	public boolean isUsernameUnique(String username) {
		User user = findByEntityUsername(username);
		if (user == null) {
			return true;
		}
		else {
			return false;
		}
	}

	public boolean isUserInfoValid(User user) {
		if (user.getEmail() == null || !isUserEmailValid(user.getEmail())) {
			return false;
		}
		if (user.getPassword() == null || !isUserPasswordValid(user.getPassword())) {
			return false;
		}
		if (user.getUsername() == null || !isUserUsernameValid(user.getUsername())) {
			return false;
		}
		if (user.getFirstName() == null || !isUserFirstNameValid(user.getFirstName())) {
			return false;
		}
		if (user.getLastName() == null || !isUserLastNameValid(user.getLastName())) {
			return false;
		}
		return true;
	}

	public boolean isUserEmailValid(String email) {
		Pattern pattern = Pattern.compile(EMAIL_PATTERN);
		Matcher matcher = pattern.matcher(email);
		if (!matcher.matches() || email.length() > 100) {
			return false;
		}
		return true;
	}

	public boolean isUserPasswordValid(String password) {
		Pattern pattern = Pattern.compile(PASSWORD_PATTERN);
		Matcher matcher = pattern.matcher(password);
		if (!matcher.matches() || password.length() > 63) {
			return false;
		}
		return true;
	}

	public boolean isUserUsernameValid(String username) {
		Pattern pattern = Pattern.compile(FIRSTLASTNAME_PATTERN, Pattern.UNICODE_CHARACTER_CLASS);
		Matcher matcher = pattern.matcher(username);
		if (!matcher.matches() || username.length() > 63 || username.length() < 6) {
			return false;
		}
		return true;
	}

	public boolean isUserFirstNameValid(String first_name) {
		Pattern pattern = Pattern.compile(FIRSTLASTNAME_PATTERN, Pattern.UNICODE_CHARACTER_CLASS);
		Matcher matcher = pattern.matcher(first_name);
		if (!matcher.matches() || first_name.length() > 63 || first_name.isEmpty()) {
			return false;
		}
		return true;
	}

	public boolean isUserLastNameValid(String last_name) {
		Pattern pattern = Pattern.compile(FIRSTLASTNAME_PATTERN, Pattern.UNICODE_CHARACTER_CLASS);
		Matcher matcher = pattern.matcher(last_name);
		if (!matcher.matches() || last_name.length() > 63 || last_name.isEmpty()) {
			return false;
		}
		return true;
	}

}
