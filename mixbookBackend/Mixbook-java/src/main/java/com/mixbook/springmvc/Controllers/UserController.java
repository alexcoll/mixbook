package com.mixbook.springmvc.Controllers;

import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpHeaders;
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
@SessionAttributes("roles")
public class UserController {

	@Autowired
	UserService userService;

	@Value("${jwt.header}")
	private String tokenHeader;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserDetailsService userDetailsService;

	private static final Logger logger = LogManager.getLogger(UserController.class);

	@RequestMapping(value = "/createUser", 
			method = RequestMethod.POST,
			headers = {"Content-type=application/json"})
	@ResponseBody
	public JsonResponse createUser(@RequestBody User user) {
		if (userService.isUserEmailUnique(user.getEmail()) == false) {
			return new JsonResponse("FAILED","Email is already taken");
		}
		if (userService.isUsernameUnique(user.getUsername()) == false) {
			return new JsonResponse("FAILED","Username is already taken");
		}
		userService.createUser(user);
		return new JsonResponse("OK","");
	}

	@RequestMapping(value = "/deleteUser", 
			method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse deleteUser(HttpServletRequest request, HttpServletResponse response) {
		User user = new User();
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		user.setUsername(username);
		userService.deleteUser(user);
		return new JsonResponse("OK","");
	}

	@RequestMapping(value = "/editUser",
			method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse editUser(@RequestHeader("Authorization") String token, @RequestBody User user) {
		String username = jwtTokenUtil.getUsernameFromToken(token);
		user.setUsername(username);
		userService.editUser(user);
		return new JsonResponse("OK","");
	}

}
