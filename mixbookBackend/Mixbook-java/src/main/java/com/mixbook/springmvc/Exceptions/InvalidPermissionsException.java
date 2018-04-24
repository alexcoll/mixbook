package com.mixbook.springmvc.Exceptions;

/**
 * Thrown when a user attempts to modify a resource that they do not have permission to modify.
 * @author John Tyler Preston
 * @version 1.0
 */
public class InvalidPermissionsException extends Exception {

	/**
	 * Constructs an instance of an exception when a user attempts to modify a resource that they do not have permission to modify.
	 * @param s the exception message to include.
	 */
	public InvalidPermissionsException(String s) {
		super(s);
	}

}
