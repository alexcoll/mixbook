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
import com.mixbook.springmvc.Models.Type;
import com.mixbook.springmvc.Services.TypeService;

@Controller
@RequestMapping("/type")
public class TypeController {

	@Autowired
	TypeService typeService;

	@RequestMapping(value = "/getTypes", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<List<Type>> getTypes() {
		List<Type> tempList = new ArrayList<Type>();
		try {
			tempList = typeService.getTypes();
		} catch (UnknownServerErrorException e) {
			List<Type> emptyList = new ArrayList<Type>();
			return new ResponseEntity<List<Type>>(emptyList, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<List<Type>>(tempList, HttpStatus.OK);
	}

}
