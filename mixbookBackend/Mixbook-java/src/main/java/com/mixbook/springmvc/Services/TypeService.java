package com.mixbook.springmvc.Services;

import java.util.List;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Type;

public interface TypeService {

	/**
	 * Loads a complete list of types of styles of ingredients.
	 * @return a complete list of types of styles of ingredients.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	List<Type> getTypes() throws UnknownServerErrorException;

}
