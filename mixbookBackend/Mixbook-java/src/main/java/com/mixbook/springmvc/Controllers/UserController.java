package com.mixbook.springmvc.Controllers;

import java.sql.SQLException;
import java.util.List;
import java.util.Locale;

import javax.persistence.PersistenceException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.mixbook.springmvc.Models.JsonResponse;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Security.JwtTokenUtil;
import com.mixbook.springmvc.Services.UserService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService userService;

	private String tokenHeader = "Authorization";

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserDetailsService userDetailsService;

	private static final Logger logger = LogManager.getLogger(UserController.class);

	@RequestMapping(value = "/createUser", 
			method = RequestMethod.POST,
			headers = {"Content-type=application/json"})
	@ResponseBody
	public ResponseEntity<JsonResponse> createUser(@RequestBody User user) {
		if (userService.isUserInfoValid(user) == false) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","User info is invalid"), HttpStatus.BAD_REQUEST);
		}
		try {
			userService.createUser(user);
		}
		catch (PersistenceException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Email or Username is already taken"), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);

	}

	@RequestMapping(value = "/deleteUser", 
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> deleteUser(HttpServletRequest request, HttpServletResponse response) {
		User user = new User();
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		user.setUsername(username);
		userService.deleteUser(user);
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	@RequestMapping(value = "/editUser",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> editUser(HttpServletRequest request, @RequestBody User user) {
		if (user.getFirstName() == null && user.getLastName() == null) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid first and last name format"), HttpStatus.BAD_REQUEST);
		}
		if (user.getFirstName() != null) {
			if (userService.isUserFirstNameValid(user.getFirstName()) == false) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid first name format"), HttpStatus.BAD_REQUEST);
			}
		}
		if (user.getLastName() != null) {
			if (userService.isUserLastNameValid(user.getLastName()) == false) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid last name format"), HttpStatus.BAD_REQUEST);
			}
		}
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		user.setUsername(username);
		userService.editUser(user);
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	@RequestMapping(value = "/changeEmail",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> changeEmail(HttpServletRequest request, @RequestBody User user) {
		if (user.getEmail() != null) {
			if (userService.isUserEmailValid(user.getEmail()) == false) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid email format"), HttpStatus.BAD_REQUEST);
			}
		}
		else {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid email format"), HttpStatus.BAD_REQUEST);
		}
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		user.setUsername(username);
		try {
			userService.changeEmail(user);
		}
		catch (PersistenceException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Email is already taken"), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	@RequestMapping(value = "/changePassword",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> changePassword(HttpServletRequest request, @RequestBody User user) {
		if (user.getPassword() != null) {
			if (userService.isUserPasswordValid(user.getPassword()) == false) {
				return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid password format"), HttpStatus.BAD_REQUEST);
			}
		}
		else {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid password format"), HttpStatus.BAD_REQUEST);
		}
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		user.setUsername(username);
		userService.changePassword(user);
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	@RequestMapping(value = "/getUserInfo", method = RequestMethod.GET)
	@ResponseBody
	public User getUserInfo(HttpServletRequest request) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = userService.findByEntityUsername(username);
		User tempUser = new User();
		tempUser.setUsername(username);
		tempUser.setEmail(user.getEmail());
		tempUser.setFirstName(user.getFirstName());
		tempUser.setLastName(user.getLastName());
		return tempUser;
	}

}
