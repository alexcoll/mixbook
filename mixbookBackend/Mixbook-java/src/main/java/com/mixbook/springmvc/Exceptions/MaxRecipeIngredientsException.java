package com.mixbook.springmvc.Exceptions;

/**
 * Thrown when a user attempts to add too many ingredients to a recipe.
 * @author John Tyler Preston
 * @version 1.0
 */
public class MaxRecipeIngredientsException extends Exception {

	/**
	 * Constructs an instance of an exception when a user attempts to add too many ingredients to a recipe.
	 * @param s the exception message to include.
	 */
	public MaxRecipeIngredientsException(String s) {
		super(s);
	}

}
