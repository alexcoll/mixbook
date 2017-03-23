package com.mixbook.springmvc.DAO;

import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.type.StringType;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Brand;

@Repository("brandDao")
public class BrandDaoImpl extends AbstractDao<Integer, Brand> implements BrandDao {

	public List<String> getBrands() throws Exception {
		SQLQuery query = getSession().createSQLQuery("SELECT brand_name FROM brand");
		query.addScalar("brand_name", new StringType());
		List<String> result = query.list();
		return result;
	}

}
