package com.mixbook.springmvc.Controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Services.BrandService;

@Controller
@RequestMapping("/brand")
public class BrandController {

	@Autowired
	BrandService brandService;

	@RequestMapping(value = "/getBrands", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Brand>> getBrands() {
		List<Brand> tempList = new ArrayList<Brand>();
		try {
			tempList = brandService.getBrands();
		} catch (UnknownServerErrorException e) {
			List<Brand> emptyList = new ArrayList<Brand>();
			return new ResponseEntity<List<Brand>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Brand>>(tempList, HttpStatus.OK);
	}

}
