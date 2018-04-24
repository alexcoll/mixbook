package com.mixbook.springmvc.Exceptions;

/**
 * Thrown when a user attempts to review their own recipe.
 * @author John Tyler Preston
 * @version 1.0
 */
public class ReviewOwnRecipeException extends Exception {

	/**
	 * Constructs an instance of an exception when a user attempts to review their own recipe.
	 * @param s the exception message to include.
	 */
	public ReviewOwnRecipeException(String s) {
		super(s);
	}

}
