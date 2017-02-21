package com.mixbook.springmvc.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.BrandDao;
import com.mixbook.springmvc.Models.Brand;

@Service("brandService")
@Transactional
public class BrandServiceImpl implements BrandService {

	@Autowired
	private BrandDao dao;

	public List<Brand> getBrands() {
		return dao.getBrands();
	}

}
