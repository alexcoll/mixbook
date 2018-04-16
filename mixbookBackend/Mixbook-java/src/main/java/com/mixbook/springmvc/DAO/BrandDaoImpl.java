package com.mixbook.springmvc.DAO;

import java.util.List;

import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Brand;

@Repository("brandDao")
public class BrandDaoImpl extends AbstractDao<Integer, Brand> implements BrandDao {

	@Override
	public List<Brand> getBrands() throws Exception {
		Query query = getSession().createQuery("select b from Brand b");
		List<Brand> result = (List<Brand>) query.getResultList();
		return result;
	}

}
