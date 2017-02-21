package com.mixbook.springmvc.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.StyleDao;
import com.mixbook.springmvc.Models.Style;

@Service("styleService")
@Transactional
public class StyleServiceImpl implements StyleService {

	@Autowired
	private StyleDao dao;

	public List<Style> getStyles() {
		return dao.getStyles();
	}

}
