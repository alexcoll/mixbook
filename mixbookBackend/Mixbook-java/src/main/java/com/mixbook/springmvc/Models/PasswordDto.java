package com.mixbook.springmvc.Models;

/**
 * Models a new and old password.
 * @author John Tyler Preston
 * @version 1.0
 */
public class PasswordDto {

	/**
	 * Old password of the user.
	 */
	private String oldPassword;

	/**
	 * New password of the user.
	 */
	private String newPassword;

	/**
	 * Standard getter method that returns the old password of the user.
	 * @return the old password of the user.
	 */
	public String getOldPassword() {
		return oldPassword;
	}

	/**
	 * Standard setter method that sets the old password for the user.
	 * @param oldPassword the old password to set for the user.
	 */
	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	/**
	 * Standard getter method that returns the new password of the user.
	 * @return the new password of the user.
	 */
	public String getNewPassword() {
		return newPassword;
	}

	/**
	 * Standard setter method that sets the new password for the user.
	 * @param newPassword the new password to set for the user.
	 */
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

}