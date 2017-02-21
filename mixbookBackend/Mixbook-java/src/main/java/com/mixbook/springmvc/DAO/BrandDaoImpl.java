package com.mixbook.springmvc.DAO;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Brand;

@Repository("brandDao")
public class BrandDaoImpl extends AbstractDao<Integer, Brand> implements BrandDao {

	public List<Brand> getBrands() {
		SQLQuery query = getSession().createSQLQuery("SELECT * FROM brand");
		List result = query.list();
		return result;
	}

}
