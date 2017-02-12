package com.mixbook.springmvc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.mixbook.springmvc.Security.JwtTokenUtil;
import com.mixbook.springmvc.Services.InventoryService;

@Controller
@RequestMapping("/inventory")
@SessionAttributes("roles")
public class InventoryController {

	@Autowired
	InventoryService inventoryService;

	@Value("${jwt.header}")
	private String tokenHeader;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserDetailsService userDetailsService;

}
