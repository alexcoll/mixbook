package com.mixbook.springmvc.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mixbook.springmvc.DAO.UserDao;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Security.JwtUserFactory;
import com.mixbook.springmvc.Services.UserService;

@Service
public class JwtUserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	UserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = this.userService.findByEntityUsername(username);

		if (user == null) {
			throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
		} else {
			return JwtUserFactory.create(user);
		}
	}

}
