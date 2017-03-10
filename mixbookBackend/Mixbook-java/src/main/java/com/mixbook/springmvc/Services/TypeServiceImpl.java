package com.mixbook.springmvc.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.TypeDao;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Type;

@Service("typeService")
@Transactional
public class TypeServiceImpl implements TypeService {

	@Autowired
	private TypeDao dao;

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
