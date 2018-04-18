package com.mixbook.springmvc.Services;

import java.util.List;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Type;

/**
 * Interface to provide modular service layer functionality for type related tasks for the controller layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface TypeService {

	/**
	 * Loads a complete list of types of styles of ingredients.
	 * @return a complete list of types of styles of ingredients.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	List<Type> getTypes() throws UnknownServerErrorException;

}
