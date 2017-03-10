package com.mixbook.springmvc.Controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.JsonResponse;
import com.mixbook.springmvc.Models.Recipe;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Security.JwtTokenUtil;
import com.mixbook.springmvc.Services.RecipeService;

@Controller
@RequestMapping("/recipe")
public class RecipeController {

	@Autowired
	RecipeService recipeService;

	private String tokenHeader = "Authorization";

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@RequestMapping(value = "/createRecipe",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> createRecipe(HttpServletRequest request, @RequestBody Recipe recipe) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		return null;
	}

	@RequestMapping(value = "/editRecipe",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> editRecipe(HttpServletRequest request, @RequestBody Recipe recipe) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		return null;
	}

	@RequestMapping(value = "/deleteRecipe",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> deleteRecipe(HttpServletRequest request, @RequestBody Recipe recipe) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		return null;
	}

	@RequestMapping(value = "/addIngredientToRecipe",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> addIngredientToRecipe(HttpServletRequest request, @RequestBody Recipe recipe) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		return null;
	}

	@RequestMapping(value = "/deleteIngredientFromRecipe",
			method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<JsonResponse> deleteIngredientFromRecipe(HttpServletRequest request, @RequestBody Recipe recipe) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		return null;
	}

	@RequestMapping(value = "/searchForRecipeByName", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<Recipe> searchForRecipeByName(HttpServletRequest request, @RequestBody Recipe recipe) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		return null;
	}

	@RequestMapping(value = "/getAllRecipesCreatedByUser", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Recipe>> getAllRecipesCreatedByUser(HttpServletRequest request) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		return null;
	}

	@RequestMapping(value = "/getAllRecipesUserCanMake", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Recipe>> getAllRecipesUserCanMake(HttpServletRequest request) {
		String token = request.getHeader(tokenHeader);
		String username = jwtTokenUtil.getUsernameFromToken(token);
		User user = new User();
		user.setUsername(username);
		return null;
	}

	@RequestMapping(value = "/getAllRecipesAnonymousUserCanMake", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Recipe>> getAllRecipesAnonymousUserCanMake(@RequestBody List<Brand> brands) {
		return null;
	}

}
