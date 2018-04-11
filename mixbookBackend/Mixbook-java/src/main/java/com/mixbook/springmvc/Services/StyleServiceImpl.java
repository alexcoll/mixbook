package com.mixbook.springmvc.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.StyleDao;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;

@Service("styleService")
@Transactional
public class StyleServiceImpl implements StyleService {

	@Autowired
	private StyleDao dao;

	public List<String> getStyles() throws UnknownServerErrorException {
		List<String> tempList = new ArrayList<String>();
		try {
			tempList = dao.getStyles();
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
		return tempList;
	}

}
