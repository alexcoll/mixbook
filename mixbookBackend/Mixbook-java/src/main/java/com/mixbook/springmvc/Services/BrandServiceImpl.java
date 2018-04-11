package com.mixbook.springmvc.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.BrandDao;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;

@Service("brandService")
@Transactional
public class BrandServiceImpl implements BrandService {

	@Autowired
	private BrandDao dao;

	public List<String> getBrands() throws UnknownServerErrorException {
		List<String> tempList = new ArrayList<String>();
		try {
			tempList = dao.getBrands();
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
		return tempList;
	}

}
