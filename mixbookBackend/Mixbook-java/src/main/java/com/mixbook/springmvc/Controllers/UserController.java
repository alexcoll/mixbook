package com.mixbook.springmvc.Controllers;

import javax.persistence.PersistenceException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
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

	@RequestMapping(value = "/getUserInfo", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<User> getUserInfo(HttpServletRequest request) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		try {
			User user = userService.findByEntityUsername(username);
			User tempUser = new User();
			tempUser.setUsername(username);
			tempUser.setEmail(user.getEmail());
			tempUser.setFirstName(user.getFirstName());
			tempUser.setLastName(user.getLastName());
			return new ResponseEntity<User>(tempUser, HttpStatus.OK);
		} catch (UnknownServerErrorException e) {
			User emptyUser = new User();
			return new ResponseEntity<User>(emptyUser, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
