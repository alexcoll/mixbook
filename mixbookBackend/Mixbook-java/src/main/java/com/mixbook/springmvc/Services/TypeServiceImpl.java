package com.mixbook.springmvc.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.TypeDao;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Type;

/**
 * Provides the concrete implementation of the modular service layer functionality for style type related tasks for the controller layer.
 * @author John Tyler Preston
 * @version 1.0
 */
@Service("typeService")
@Transactional
public class TypeServiceImpl implements TypeService {

	/**
	 * Provides ability to access style type data layer functions.
	 */
	@Autowired
	private TypeDao dao;

	@Override
	public List<Type> getTypes() throws UnknownServerErrorException {
		List<Type> tempList = new ArrayList<Type>();
		try {
			tempList = dao.getTypes();
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
		return tempList;
	}

}
