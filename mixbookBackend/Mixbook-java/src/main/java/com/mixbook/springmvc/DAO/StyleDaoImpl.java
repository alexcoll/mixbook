package com.mixbook.springmvc.DAO;

import java.util.List;

import org.hibernate.SQLQuery;

import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Style;

@Repository("styleDao")
public class StyleDaoImpl extends AbstractDao<Integer, Style> implements StyleDao {

	public List<Style> getStyles() throws Exception {
		SQLQuery query = getSession().createSQLQuery("SELECT * FROM style");
		List result = query.list();
		return result;
	}

}
