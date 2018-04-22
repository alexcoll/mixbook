package com.mixbook.springmvc.Models;

/**
 * Describes the permissions role of a user, either a normal user or an administrator.
 * @author John Tyler Preston
 * @version 1.0
 */
public enum AuthorityName {

	/**
	 * A permissions role. Indicates a normal user.
	 */
	ROLE_USER,

	/**
	 * A permissions role. Indicates a super user/administrator.
	 */
	ROLE_ADMIN

}
