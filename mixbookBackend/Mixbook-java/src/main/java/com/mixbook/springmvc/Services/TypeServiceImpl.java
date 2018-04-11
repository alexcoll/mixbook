package com.mixbook.springmvc.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.TypeDao;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;

@Service("typeService")
@Transactional
public class TypeServiceImpl implements TypeService {

	@Autowired
	private TypeDao dao;

	public List<String> getTypes() throws UnknownServerErrorException {
		List<String> tempList = new ArrayList<String>();
		try {
			tempList = dao.getTypes();
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
		return tempList;
	}

}
