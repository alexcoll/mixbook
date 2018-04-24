package com.mixbook.springmvc.Exceptions;

/**
 * Thrown when a user attempts to remove an ingredient from a recipe with no ingredients.
 * @author John Tyler Preston
 * @version 1.0
 */
public class NotEnoughRecipeIngredientsException extends Exception {

	/**
	 * Constructs an instance of an exception when a user attempts to remove an ingredient from a recipe with no ingredients.
	 * @param s the exception message to include.
	 */
	public NotEnoughRecipeIngredientsException(String s) {
		super(s);
	}

}
