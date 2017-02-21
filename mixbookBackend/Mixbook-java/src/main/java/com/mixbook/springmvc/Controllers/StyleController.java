package com.mixbook.springmvc.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.mixbook.springmvc.Models.Style;
import com.mixbook.springmvc.Services.StyleService;

@Controller
@RequestMapping("/style")
public class StyleController {

	@Autowired
	StyleService styleService;

	@RequestMapping(value = "/getStyles", method = RequestMethod.GET)
	@ResponseBody
	public List<Style> getStyles() {
		return styleService.getStyles();
	}

}
