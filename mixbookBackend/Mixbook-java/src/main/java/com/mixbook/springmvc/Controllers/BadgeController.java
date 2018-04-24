package com.mixbook.springmvc.Controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Badge;
import com.mixbook.springmvc.Services.BadgeService;

/**
 * Provides API endpoints for badge functions.
 * @author John Tyler Preston
 * @version 1.0
 */
@Controller
@RequestMapping("/badge")
public class BadgeController {

	/**
	 * Provides ability to access badge service layer functions.
	 */
	@Autowired
	private BadgeService badgeService;

	/**
	 * Loads a complete list of earnable badges.
	 * @return a <code>ResponseEntity</code> of type <code>List</code> of type <code>Badge</code> of all earnable badges. It contains each badge's
	 * information, information regarding the success or failure of request, along with an HTTP status code, 200 for success and 500 for an internal
	 * server error.
	 */
	@RequestMapping(value = "/getBadges", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Badge>> getBadges() {
		List<Badge> tempList = new ArrayList<Badge>();
		try {
			tempList = badgeService.getAllBadges();
		} catch (UnknownServerErrorException e) {
			List<Badge> emptyList = new ArrayList<Badge>();
			return new ResponseEntity<List<Badge>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Badge>>(tempList, HttpStatus.OK);
	}
	
}
