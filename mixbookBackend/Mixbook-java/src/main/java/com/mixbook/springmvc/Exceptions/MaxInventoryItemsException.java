package com.mixbook.springmvc.Exceptions;

/**
 * Thrown when a user attempts to add too many items to their inventory.
 * @author John Tyler Preston
 * @version 1.0
 */
public class MaxInventoryItemsException extends Exception {

	/**
	 * Constructs an instance of an exception when a user attempts to add too many items to their inventory.
	 * @param s the exception message to include.
	 */
	public MaxInventoryItemsException(String s) {
		super(s);
	}

}
