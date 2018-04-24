package com.mixbook.springmvc.DAO;

import java.util.List;

import com.mixbook.springmvc.Models.Brand;

/**
 * Interface to provide modular data layer functionality for brand related tasks for the service layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface BrandDao {

	/**
	 * Loads a complete list of brands.
	 * @return a complete list of brands.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	List<Brand> getBrands() throws Exception;

}
