package com.mixbook.springmvc.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mixbook.springmvc.Services.RecipeService;

@Controller
@RequestMapping("/recipe")
public class RecipeController {

	@Autowired
	RecipeService recipeService;

}
