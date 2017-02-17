package com.mixbook.springmvc.Controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.mixbook.springmvc.Models.Inventory;
import com.mixbook.springmvc.Models.JsonResponse;
import com.mixbook.springmvc.Models.User;
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

	@RequestMapping(value = "/addIngredientToInventory",
			method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse addIngredientToInventory(HttpServletRequest request, @RequestBody Inventory inventory) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		inventoryService.addIngredientToInventory(inventory, user);
		return new JsonResponse("OK","");
	}

	@RequestMapping(value = "/deleteIngredientFromInventory",
			method = RequestMethod.POST)
	@ResponseBody
	public JsonResponse deleteIngredientFromInventory(HttpServletRequest request, @RequestBody Inventory inventory) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		inventoryService.deleteIngredientFromInventory(inventory, user);
		return new JsonResponse("OK","");
	}

}
