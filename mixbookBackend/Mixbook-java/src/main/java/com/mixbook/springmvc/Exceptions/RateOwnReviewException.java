package com.mixbook.springmvc.Exceptions;

/**
 * Thrown when a user attempts to rate their own review.
 * @author John Tyler Preston
 * @version 1.0
 */
public class RateOwnReviewException extends Exception {

	/**
	 * Constructs an instance of an exception when a user attempts to rate their own review.
	 * @param s the exception message to include.
	 */
	public RateOwnReviewException(String s) {
		super(s);
	}
	
}
