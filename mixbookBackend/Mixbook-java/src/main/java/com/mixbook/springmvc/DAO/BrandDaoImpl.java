package com.mixbook.springmvc.DAO;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Brand;

@Repository("brandDao")
public class BrandDaoImpl extends AbstractDao<Integer, Brand> implements BrandDao {

	public List<Brand> getBrands() {
		Query query = getSession().createQuery("from Brand");
		return query.list();
	}

}
