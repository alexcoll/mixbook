package com.mixbook.springmvc.Services;

import java.util.List;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Style;

public interface StyleService {

	/**
	 * Loads a complete list of styles of ingredients.
	 * @return a complete list of styles of ingredients.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	List<Style> getStyles() throws UnknownServerErrorException;

}
