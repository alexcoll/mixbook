package com.mixbook.springmvc.Controllers;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.PersistenceException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mixbook.springmvc.Exceptions.InvalidIngredientException;
import com.mixbook.springmvc.Exceptions.MaxInventoryItemsException;
import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.JsonResponse;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Security.JwtTokenUtil;
import com.mixbook.springmvc.Services.InventoryService;

@Controller
@RequestMapping("/inventory")
public class InventoryController {

	@Autowired
	InventoryService inventoryService;

	private String tokenHeader = "Authorization";

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@RequestMapping(value = "/addIngredientToInventory",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> addIngredientToInventory(HttpServletRequest request, @RequestBody Brand brand) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		try {
			inventoryService.addIngredientToInventory(brand, user);
		} catch (MaxInventoryItemsException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Exceeded maximum of 20 items in inventory"), HttpStatus.BAD_REQUEST);
		} catch (InvalidIngredientException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid ingredient added"), HttpStatus.BAD_REQUEST);
		} catch (PersistenceException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Ingredient of that name already in user inventory"), HttpStatus.BAD_REQUEST);
		} catch (NoDataWasChangedException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","No data was changed. Info may have been invalid."), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	@RequestMapping(value = "/deleteIngredientFromInventory",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> deleteIngredientFromInventory(HttpServletRequest request, @RequestBody Brand brand) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		try {
			inventoryService.deleteIngredientFromInventory(brand, user);
		} catch (InvalidIngredientException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Invalid ingredient deleted"), HttpStatus.BAD_REQUEST);
		} catch (NoDataWasChangedException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","No data was changed. Info may have been invalid."), HttpStatus.BAD_REQUEST);
		} catch (UnknownServerErrorException e) {
			return new ResponseEntity<JsonResponse>(new JsonResponse("FAILED","Unknown server error"), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<JsonResponse>(new JsonResponse("OK",""), HttpStatus.OK);
	}

	@RequestMapping(value = "/getUserInventory", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Brand>> getUserInventory(HttpServletRequest request) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		List<Brand> tempList = new ArrayList<Brand>();
		try {
			tempList = inventoryService.getUserInventory(user);
		} catch (UnknownServerErrorException e) {
			List<Brand> emptyList = new ArrayList<Brand>();
			return new ResponseEntity<List<Brand>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Brand>>(tempList, HttpStatus.OK);
	}

}
