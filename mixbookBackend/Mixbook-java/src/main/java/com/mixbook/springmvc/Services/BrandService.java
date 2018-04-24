package com.mixbook.springmvc.Services;

import java.util.List;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Brand;

/**
 * Interface to provide modular service layer functionality for brand related tasks for the controller layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface BrandService {

	/**
	 * Loads a complete list of brands.
	 * @return a complete list of brands.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	List<Brand> getBrands() throws UnknownServerErrorException;

}
