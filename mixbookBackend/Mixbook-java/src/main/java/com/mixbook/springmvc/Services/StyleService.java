package com.mixbook.springmvc.Services;

import java.util.List;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Style;

/**
 * Interface to provide modular service layer functionality for style related tasks for the controller layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface StyleService {

	/**
	 * Loads a complete list of styles of ingredients.
	 * @return a complete list of styles of ingredients.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	List<Style> getStyles() throws UnknownServerErrorException;

}
