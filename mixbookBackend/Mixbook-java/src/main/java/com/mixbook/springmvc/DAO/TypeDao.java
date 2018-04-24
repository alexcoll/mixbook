package com.mixbook.springmvc.DAO;

import java.util.List;

import com.mixbook.springmvc.Models.Type;

/**
 * Interface to provide modular data layer functionality for type related tasks for the service layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface TypeDao {

	/**
	 * Loads a complete list of types of styles of ingredients.
	 * @return a complete list of types of styles of ingredients.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	List<Type> getTypes() throws Exception;

}
