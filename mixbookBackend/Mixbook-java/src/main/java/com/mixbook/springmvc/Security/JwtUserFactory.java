package com.mixbook.springmvc.Security;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.mixbook.springmvc.Models.Authority;
import com.mixbook.springmvc.Models.User;

/**
 * Creates new <code>JwtUser</code>s.
 * @author John Tyler Preston
 * @version 1.0
 */
public class JwtUserFactory {

	/**
	 * Empty default constructor needed by default.
	 */
	private JwtUserFactory() {
	}

	/**
	 * Creates a new <code>JwtUser</code>.
	 * @param user the user to use to create a new <code>JwtUser</code>.
	 * @return a new <code>JwtUser</code>.
	 */
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

	/**
	 * Maps authorities to the <code>JwtUser</code>.
	 * @param authorities the authorities to map to the <code>JwtUser</code>.
	 * @return the mapped authorities.
	 */
	private static List<GrantedAuthority> mapToGrantedAuthorities(List<Authority> authorities) {
		return authorities.stream()
				.map(authority -> new SimpleGrantedAuthority(authority.getName().name()))
				.collect(Collectors.toList());
	}

}
