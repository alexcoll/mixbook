package com.mixbook.springmvc.Exceptions;

/**
 * Thrown when a user attempts to use an invalid/non-existent ingredient.
 * @author John Tyler Preston
 * @version 1.0
 */
public class InvalidIngredientException extends Exception {

	/**
	 * Constructs an instance of an exception when a user attempts to use an invalid/non-existent ingredient.
	 * @param s the exception message to include.
	 */
	public InvalidIngredientException(String s) {
		super(s);
	}

}
