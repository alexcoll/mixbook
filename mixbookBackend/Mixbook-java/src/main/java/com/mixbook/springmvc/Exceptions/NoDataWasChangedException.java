package com.mixbook.springmvc.Exceptions;

/**
 * Thrown when a user's action yields no effect.
 * @author John Tyler Preston
 * @version 1.0
 */
public class NoDataWasChangedException extends Exception {

	/**
	 * Constructs an instance of an exception when a user's action yields no effect.
	 * @param s the exception message to include.
	 */
	public NoDataWasChangedException(String s) {
		super(s);
	}

}
