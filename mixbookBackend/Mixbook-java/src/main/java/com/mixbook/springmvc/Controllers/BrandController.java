package com.mixbook.springmvc.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Services.BrandService;

@Controller
@RequestMapping("/brand")
public class BrandController {

	@Autowired
	BrandService brandService;

	@RequestMapping(value = "/getBrands", method = RequestMethod.GET)
	@ResponseBody
	public List<Brand> getBrands() {
		return brandService.getBrands();
	}

}
