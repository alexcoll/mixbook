package com.mixbook.springmvc.Exceptions;

/**
 * Thrown when an unknown server error occurs.
 * @author John Tyler Preston
 * @version 1.0
 */
public class UnknownServerErrorException extends Exception {

	/**
	 * Constructs an instance of an exception when an unknown server error occurs.
	 * @param s the exception message to include.
	 */
	public UnknownServerErrorException(String s) {
		super(s);
	}

}
