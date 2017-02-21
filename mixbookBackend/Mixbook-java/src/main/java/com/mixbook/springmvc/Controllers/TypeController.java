package com.mixbook.springmvc.Controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.mixbook.springmvc.Models.Type;
import com.mixbook.springmvc.Services.TypeService;

@Controller
@RequestMapping("/type")
public class TypeController {

	@Autowired
	TypeService typeService;

	@RequestMapping(value = "/getTypes", method = RequestMethod.GET)
	@ResponseBody
	public List<Type> getTypes() {
		return typeService.getTypes();
	}

}
