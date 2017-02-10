package com.mixbook.springmvc.Services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.UserDao;
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
	
}
