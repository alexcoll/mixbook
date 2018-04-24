package com.mixbook.springmvc.DAO;

import java.util.List;

import com.mixbook.springmvc.Models.Style;

/**
 * Interface to provide modular data layer functionality for style related tasks for the service layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface StyleDao {

	/**
	 * Loads a complete list of styles of ingredients.
	 * @return a complete list of styles of ingredients.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	List<Style> getStyles() throws Exception;

}
