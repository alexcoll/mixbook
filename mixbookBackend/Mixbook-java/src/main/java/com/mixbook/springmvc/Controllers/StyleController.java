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
import com.mixbook.springmvc.Models.Style;
import com.mixbook.springmvc.Services.StyleService;

@Controller
@RequestMapping("/style")
public class StyleController {

	@Autowired
	StyleService styleService;

	@RequestMapping(value = "/getStyles", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Style>> getStyles() {
		List<Style> tempList = new ArrayList<Style>();
		try {
			tempList = styleService.getStyles();
		} catch (UnknownServerErrorException e) {
			List<Style> emptyList = new ArrayList<Style>();
			return new ResponseEntity<List<Style>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Style>>(tempList, HttpStatus.OK);
	}

}
