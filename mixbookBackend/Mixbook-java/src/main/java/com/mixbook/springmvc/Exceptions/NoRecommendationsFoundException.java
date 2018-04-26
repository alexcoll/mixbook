package com.mixbook.springmvc.Exceptions;

/**
 * Thrown when a user loads their recommendations however none are found.
 * @author John Tyler Preston
 * @version 1.0
 */
public class NoRecommendationsFoundException extends Exception {

	/**
	 * Constructs an instance of an exception when a user loads their recommendations however none are found.
	 * @param s the exception message to include.
	 */
	public NoRecommendationsFoundException(String s) {
		super(s);
	}

}
