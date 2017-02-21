package com.mixbook.springmvc.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.TypeDao;
import com.mixbook.springmvc.Models.Type;

@Service("typeService")
@Transactional
public class TypeServiceImpl implements TypeService {

	@Autowired
	private TypeDao dao;

	public List<Type> getTypes() {
		return dao.getTypes();
	}

}
