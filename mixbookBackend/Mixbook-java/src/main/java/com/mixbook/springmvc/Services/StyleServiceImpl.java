package com.mixbook.springmvc.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.StyleDao;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Style;

/**
 * Provides the concrete implementation of the modular service layer functionality for brand style related tasks for the controller layer.
 * @author John Tyler Preston
 * @version 1.0
 */
@Service("styleService")
@Transactional
public class StyleServiceImpl implements StyleService {

	/**
	 * Provides ability to access brand style data layer functions.
	 */
	@Autowired
	private StyleDao dao;

	@Override
	public List<Style> getStyles() throws UnknownServerErrorException {
		List<Style> tempList = new ArrayList<Style>();
		try {
			tempList = dao.getStyles();
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
		return tempList;
	}

}
