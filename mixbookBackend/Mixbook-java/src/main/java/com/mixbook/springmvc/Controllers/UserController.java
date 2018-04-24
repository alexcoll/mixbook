package com.mixbook.springmvc.Controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.PersistenceException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import static org.springframework.security.web.context.HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.AccountUnlockToken;
import com.mixbook.springmvc.Models.JsonResponse;
import com.mixbook.springmvc.Models.PasswordDto;
import com.mixbook.springmvc.Models.PasswordResetToken;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Security.JwtTokenUtil;
import com.mixbook.springmvc.Services.AccountUnlockTokenService;
import com.mixbook.springmvc.Services.EmailService;
import com.mixbook.springmvc.Services.PasswordResetTokenService;
import com.mixbook.springmvc.Services.UserService;

/**
 * Provides API endpoints for user functions.
 * @author John Tyler Preston
 * @version 1.0
 */
@Controller
@RequestMapping("/user")
public class UserController {

	/**
	 * Provides ability to access user service layer functions.
	 */
	@Autowired
	UserService userService;

	/**
	 * Provides ability to access password reset service layer functions.
	 */
	@Autowired
	PasswordResetTokenService passwordResetTokenService;

	/**
	 * Provides ability to access email service layer functions.
	 */
	@Autowired
	EmailService emailService;

	/**
	 * Provides ability to access account unlock service layer functions.
	 */
	@Autowired
	AccountUnlockTokenService accountUnlockTokenService;

	/**
	 * Used to extract authentication information from the token.
	 */
	private String tokenHeader = "Authorization";

	/**
	 * Allows access to JWT token utilities.
	 */
	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	/**
	 * Creates a user.
	 * <p>
	 * Request must include all of the fields of a <code>User</code> to create a user. The request does not need to include
	 * the fields indicated if an account is enabled, the last password reset date, the profile statistics fields, or the user permissions roles to be associated
	 * with the account. All fields are validated by the <code>isUserInfoValid</code> method.
	 * @param user the user object that will be persisted in the system.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request along
	 * with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/createUser", 
			method = RequestMethod.POST,
			headers = {"Content-type=application/json"})
	@ResponseBody
	public ResponseEntity<JsonResponse> createUser(@RequestBody User user) {
		try {
			if (!userService.isUserInfoValid(user)) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","User info is invalid"), HttpStatus.BAD_REQUEST);
			}
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		try {
			userService.createUser(user);
		} catch (PersistenceException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Email or Username is already taken"), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Deletes a user.
	 * @param request the request coming in to identify the user.
	 * @param response the response to send out should a more custom response be needed.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request along
	 * with an HTTP status code, 200 for success and 500 for an internal server error.
	 */
	@RequestMapping(value = "/deleteUser", 
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> deleteUser(HttpServletRequest request, HttpServletResponse response) {
		User user = new User();
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		user.setUsername(username);
		try {
			userService.deleteUser(user);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Edits a user.
	 * <p>
	 * Request must include at-least the first name or the last name and any/all fields are validated by the <code>isUserFirstNameValid</code> and/or <code>isUserLastNameValid</code> methods.
	 * @param request the request coming in to identify the user to edit.
	 * @param user the user object containing the user information to edit.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request
	 * along with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/editUser",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> editUser(HttpServletRequest request, @RequestBody User user) {
		try {
			if (user.getFirstName() != null) {
				if (user.getFirstName().isEmpty()) {
					user.setFirstName(null);
				}
			}
			if (user.getLastName() != null) {
				if (user.getLastName().isEmpty()) {
					user.setLastName(null);
				}
			}
			if (user.getFirstName() == null && user.getLastName() == null) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid first and last name format"), HttpStatus.BAD_REQUEST);
			}
			else if (user.getFirstName() != null && user.getLastName() != null) {
				if (!userService.isUserFirstNameValid(user.getFirstName()) || !userService.isUserLastNameValid(user.getLastName())) {
					return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid first and last name format"), HttpStatus.BAD_REQUEST);
				}
			}
			if (user.getLastName() == null && !userService.isUserFirstNameValid(user.getFirstName())) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid first name format"), HttpStatus.BAD_REQUEST);
			}
			if (user.getFirstName() == null && !userService.isUserLastNameValid(user.getLastName())) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid last name format"), HttpStatus.BAD_REQUEST);
			}
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		user.setUsername(username);
		try {
			userService.editUser(user);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Edits a user's email address.
	 * <p>
	 * Request must include a valid email address.
	 * @param request the request coming in to identity the user to change their email address.
	 * @param user the user object containing the user email to change to.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request
	 * along with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/changeEmail",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> changeEmail(HttpServletRequest request, @RequestBody User user) {
		try {
			if (!userService.isUserEmailValid(user.getEmail())) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid email format"), HttpStatus.BAD_REQUEST);
			}
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		user.setUsername(username);
		try {
			userService.changeEmail(user);
		} catch (PersistenceException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Email is already taken"), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Edits a user's password.
	 * <p>
	 * Request must include a valid password.
	 * @param request the request coming in to identify the user to change their password.
	 * @param user the user object containing the user password to change to.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request
	 * along with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/changePassword",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> changePassword(HttpServletRequest request, @RequestBody User user) {
		try {
			if (!userService.isUserPasswordValid(user.getPassword())) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid password format"), HttpStatus.BAD_REQUEST);
			}
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		user.setUsername(username);
		try {
			userService.changePassword(user);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Generates a password reset request.
	 * <p>
	 * Request must include a valid email address.
	 * @param request the request coming in to identify the context path and the likes needed for password reset link generation.
	 * @param email the email of the user requesting to reset their password.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request
	 * along with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/resetPassword",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> resetPassword(HttpServletRequest request, @RequestParam("email") String email) {
		try {
			User user = userService.findByEntityEmail(email);
			if (user == null) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","No user found with that email"), HttpStatus.UNAUTHORIZED);
			}
			String token = passwordResetTokenService.generatePasswordResetToken(user);
			String url = "https://" + request.getServerName() + request.getContextPath() + "/user/updatePassword?id=" + user.getUserId() + "&token=" + token;
			emailService.generateResetPasswordEmail(email, url);
		} catch (PersistenceException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Password reset request has already been requested in the last 24 hours"), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Saves a new password after a user completes the form that is linked from the password recovery email.
	 * <p>
	 * Request must include a valid new password.
	 * @param request the request coming in to identify the context's authentication needed to determine the authenticated user.
	 * @param passwordDto the password object containing the new password.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request
	 * along with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/savePassword",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> savePassword(HttpServletRequest request, PasswordDto passwordDto) {
		try {
			if (!userService.isUserPasswordValid(passwordDto.getNewPassword())) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid password format"), HttpStatus.BAD_REQUEST);
			}
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		try {
			user.setPassword(passwordDto.getNewPassword());
			userService.changePassword(user);
			PasswordResetToken token = new PasswordResetToken();
			user = userService.findByEntityUsername(user.getUsername());
			token.setUser(user);
			passwordResetTokenService.deleteToken(token);
		} catch (UnknownServerErrorException e) {
			SecurityContextHolder.getContext().setAuthentication(null);
			SecurityContextHolder.clearContext();
			HttpSession session = request.getSession();
			session.invalidate();
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		SecurityContextHolder.getContext().setAuthentication(null);
		SecurityContextHolder.clearContext();
		HttpSession session = request.getSession();
		session.invalidate();
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Validates a password reset token and redirects a user to the page to change reset their password upon successful validation, or redirects them to the home page is validation fails.
	 * <p>
	 * Request must include a valid token string as well as a valid primary key of a user.
	 * @param request the request coming in to get the user's current session.
	 * @param response the response to send out if a request fails for some reason.
	 * @param id the primary key of the user requesting to reset their password.
	 * @param token the token string of the password reset token to validate.
	 * @return a redirect along with an HTTP status code, 200 for success, 401 for an unauthorized request, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/updatePassword", method = RequestMethod.GET)
	public String showChangePasswordPage(HttpServletRequest request, HttpServletResponse response, @RequestParam("id") Integer id, @RequestParam("token") String token) {
		try {
			User result = passwordResetTokenService.validatePasswordResetToken(id, token);
			if (result == null) {
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				return "redirect:https://mymixbook.com";
			}
			Authentication authentication = new UsernamePasswordAuthenticationToken(result, null,
					Arrays.asList(new SimpleGrantedAuthority("CHANGE_PASSWORD_PRIVILEGE")));
			SecurityContext sc = SecurityContextHolder.getContext();
			sc.setAuthentication(authentication);
			HttpSession session = request.getSession(true);
			session.setAttribute(SPRING_SECURITY_CONTEXT_KEY, sc);
			return "redirect:/user/loadSavePasswordPage";
		} catch (UnknownServerErrorException e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return "redirect:https://mymixbook.com";
		}
	}

	/**
	 * Loads a page containing a form to reset a user's password.
	 * @return a page containing a form to reset a user's password.
	 */
	@RequestMapping(value = "/loadSavePasswordPage", method = RequestMethod.GET)
	public String showSavePasswordPage() {
		return "savePassword";
	}

	/**
	 * Loads a page containing a form to request a reset of a user's password.
	 * @return a page containing a form to request a reset of a user's password.
	 */
	@RequestMapping(value = "/requestReset", method = RequestMethod.GET)
	public String requestReset() {
		return "requestResetPassword";
	}

	/**
	 * Locks a user's account.
	 * @param request the request coming in to identify the user.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request
	 * along with an HTTP status code, 200 for success and 500 for an internal server error.
	 */
	@RequestMapping(value = "/lockAccount", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> lockAccount(HttpServletRequest request) {
		try {
			String token = request.getHeader(tokenHeader);
			String username = jwtTokenUtil.getUsernameFromToken(token);
			User user = new User();
			user.setUsername(username);
			userService.lockAccount(user);
			return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Validates an account unlock token and redirects a user to the page to indicate a successful account unlock after unlocking a user's account.
	 * @param request the request coming in to identify the user (not used here).
	 * @param response the response to send out if a request fails for some reason.
	 * @param id the primary key of the user requesting to unlock their account.
	 * @param token the token string of the account unlock token to validate.
	 * @return a redirect along with an HTTP status code, 200 for success, 401 for an unauthorized request, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/unlockAccount", method = RequestMethod.GET)
	public String unlockAccount(HttpServletRequest request, HttpServletResponse response, @RequestParam("id") Integer id, @RequestParam("token") String token) {
		try {
			User result = accountUnlockTokenService.validateAccountUnlockToken(id, token);
			if (result == null) {
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				return "redirect:https://mymixbook.com";
			}
			userService.unlockAccount(result);
			AccountUnlockToken accountUnlockToken = new AccountUnlockToken();
			accountUnlockToken.setUser(result);
			accountUnlockTokenService.deleteToken(accountUnlockToken);
			return "redirect:/user/loadUnlockAccountSuccessPage";
		} catch (UnknownServerErrorException e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return "redirect:https://mymixbook.com";
		}
	}

	/**
	 * Generates an account unlock request.
	 * <p>
	 * Request must include a valid email address.
	 * @param request the request coming in to identify the user to unlock their account.
	 * @param email the email of the user requesting to unlock their account.
	 * @return a <code>ResponseEntity</code> of type <code>JsonResponse</code> that contains information regarding the success or failure of request
	 * along with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal server error.
	 */
	@RequestMapping(value = "/requestAccountUnlock",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> requestAccountUnlock(HttpServletRequest request, @RequestParam("email") String email) {
		try {
			User user = userService.findByEntityEmail(email);
			if (user == null) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","No user found with that email"), HttpStatus.UNAUTHORIZED);
			}
			if (user.getEnabled()) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","No locked user found with that email"), HttpStatus.UNAUTHORIZED);
			}
			String token = accountUnlockTokenService.generateAccountUnlockToken(user);
			String url = "https://" + request.getServerName() + request.getContextPath() + "/user/unlockAccount?id=" + user.getUserId() + "&token=" + token;
			emailService.generateAccountUnlockEmail(user.getEmail(), url);
		} catch (PersistenceException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Account unlock request has already been requested in the last 24 hours"), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	/**
	 * Loads a page containing a form to request an unlock of a user's account.
	 * @return a page containing a form to request an unlock of a user's account.
	 */
	@RequestMapping(value = "/requestUnlock", method = RequestMethod.GET)
	public String loadUnlockAccountPage() {
		return "requestAccountUnlock";
	}

	/**
	 * Loads a page to indicate a successful account unlock.
	 * @return a page to indicate a successful account unlock.
	 */
	@RequestMapping(value = "/loadUnlockAccountSuccessPage", method = RequestMethod.GET)
	public String loadUnlockAccountSuccessPage() {
		return "unlockAccountSuccess";
	}

	/**
	 * Loads a user's profile and the badges that they have earned.
	 * @param username the username of the user to load.
	 * @return a <code>ResponseEntity</code> of type <code>User</code> of the user's profile. It contains a user's
	 * information, information regarding the success or failure of request, along with an HTTP status code, 200 for success, 400 for bad request/failure, and 500 for an internal
	 * server error.
	 */
	@RequestMapping(value = "/getUserInfo", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<User> getUserInfo(@RequestParam("username") String username) {
		try {
			User user = userService.loadUserProfile(username);
			user.setPassword(null);
			user.setEnabled(null);
			user.setLastPasswordResetDate(null);
			user.setAuthorities(null);
			return new ResponseEntity<User>(user, HttpStatus.OK);
		} catch (PersistenceException e) {
			User emptyUser = new User();
			return new ResponseEntity<User>(emptyUser, HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			User emptyUser = new User();
			return new ResponseEntity<User>(emptyUser, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Loads a complete list of users.
	 * @return a <code>ResponseEntity</code> of type <code>List</code> of type <code>User</code> of all the user profiles. It contains each user's
	 * information, information regarding the success or failure of request, along with an HTTP status code, 200 for success and 500 for an internal
	 * server error.
	 */
	@RequestMapping(value = "/loadAllUsers", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<User>> loadAllUsers() {
		try {
			List<User> users = userService.loadAllUsers();
			return new ResponseEntity<List<User>>(users, HttpStatus.OK);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<List<User>>(new ArrayList<User>(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
