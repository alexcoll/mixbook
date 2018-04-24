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

/**
 * Provides API endpoints for brand functions.
 * @author John Tyler Preston
 * @version 1.0
 */
@Controller
@RequestMapping("/brand")
public class BrandController {

	/**
	 * Provides ability to access brand service layer functions.
	 */
	@Autowired
	BrandService brandService;

	/**
	 * Loads a complete list of brands (ingredients).
	 * @return a <code>ResponseEntity</code> of type <code>List</code> of type <code>Brand</code> of all brands (ingredients). It contains each brand's
	 * information, information regarding the success or failure of request, along with an HTTP status code, 200 for success and 500 for an internal
	 * server error.
	 */
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
