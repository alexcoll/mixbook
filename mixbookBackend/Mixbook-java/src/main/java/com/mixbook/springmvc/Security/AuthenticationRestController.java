package com.mixbook.springmvc.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mixbook.springmvc.Security.JwtAuthenticationRequest;
import com.mixbook.springmvc.Security.JwtTokenUtil;
import com.mixbook.springmvc.Security.JwtUser;
import com.mixbook.springmvc.Security.JwtAuthenticationResponse;

import javax.servlet.http.HttpServletRequest;

/**
 * Authenticates users and refreshes tokens.
 * @author John Tyler Preston
 * @version 1.0
 */
@RestController
public class AuthenticationRestController {

	/**
	 * Used to extract authentication information from the token.
	 */
	private String tokenHeader = "Authorization";

	/**
	 * Used to access Spring Security's authentication manager.
	 */
	@Autowired
	private AuthenticationManager authenticationManager;

	/**
	 * Allows access to JWT token utilities.
	 */
	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	/**
	 * Allows the use of Spring Security's <code>UserDetailsService</code> functionality.
	 */
	@Autowired
	private UserDetailsService userDetailsService;

	/**
	 * Authenticates a user in terms of initial request with a username and password.
	 * @param authenticationRequest the request coming in to be authenticated.
	 * @param device the device used to make the request.
	 * @return a <code>ResponseEntity</code> with a 200 response in the event of a successful authentication, a 401 for unauthorized, and 500 for an internal
	 * server error.
	 * @throws AuthenticationException thrown if authentication fails.
	 */
	@RequestMapping(value = "/auth", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest, Device device) throws AuthenticationException {
		final Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						authenticationRequest.getUsername(),
						authenticationRequest.getPassword()
						)
				);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
		if (userDetails.equals(null)) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		final String token = jwtTokenUtil.generateToken(userDetails, device);

		return ResponseEntity.ok(new JwtAuthenticationResponse(token));
	}

	/**
	 * Refreshes an expired token.
	 * @param request the request containing the token to be refreshed.
	 * @return a <code>ResponseEntity</code> with a 200 response as well as a new token in the event of a successful refresh, a 401 for unauthorized, and 500 for an internal
	 * server error.
	 */
	@RequestMapping(value = "/refresh", method = RequestMethod.GET)
	public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		JwtUser user = (JwtUser) userDetailsService.loadUserByUsername(username);
		if (user.equals(null)) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		if (!user.isEnabled()) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		if (jwtTokenUtil.canTokenBeRefreshed(token, user.getLastPasswordResetDate())) {
			String refreshedToken = jwtTokenUtil.refreshToken(token);
			return ResponseEntity.ok(new JwtAuthenticationResponse(refreshedToken));
		} else {
			return ResponseEntity.badRequest().body(null);
		}
	}

}
