package com.mixbook.springmvc.Services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.BrandDao;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Brand;

/**
 * Provides the concrete implementation of the modular service layer functionality for brand related tasks for the controller layer.
 * @author John Tyler Preston
 * @version 1.0
 */
@Service("brandService")
@Transactional
public class BrandServiceImpl implements BrandService {

	/**
	 * Provides ability to access brand data layer functions.
	 */
	@Autowired
	private BrandDao dao;

	@Override
	public List<Brand> getBrands() throws UnknownServerErrorException {
		List<Brand> tempList = new ArrayList<Brand>();
		try {
			tempList = dao.getBrands();
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
		return tempList;
	}

}
