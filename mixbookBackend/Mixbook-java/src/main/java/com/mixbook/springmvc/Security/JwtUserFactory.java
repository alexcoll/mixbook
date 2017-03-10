package com.mixbook.springmvc.Security;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.mixbook.springmvc.Models.Authority;
import com.mixbook.springmvc.Models.User;

public class JwtUserFactory {

	private JwtUserFactory() {
	}

	public static JwtUser create(User user) {
		return new JwtUser(
				user.getUserId(),
				user.getUsername(),
				user.getFirstName(),
				user.getLastName(),
				user.getEmail(),
				user.getPassword(),
				mapToGrantedAuthorities(user.getAuthorities()),
				user.getEnabled(),
				user.getLastPasswordResetDate()
				);
	}

	private static List<GrantedAuthority> mapToGrantedAuthorities(List<Authority> authorities) {
		return authorities.stream()
				.map(authority -> new SimpleGrantedAuthority(authority.getName().name()))
				.collect(Collectors.toList());
	}

}
