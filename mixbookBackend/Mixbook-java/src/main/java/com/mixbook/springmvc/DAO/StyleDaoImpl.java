package com.mixbook.springmvc.DAO;

import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.type.StringType;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Style;

@Repository("styleDao")
public class StyleDaoImpl extends AbstractDao<Integer, Style> implements StyleDao {

	public List<String> getStyles() throws Exception {
		SQLQuery query = getSession().createSQLQuery("SELECT style_name FROM style");
		query.addScalar("style_name", new StringType());
		List<String> result = query.list();
		return result;
	}

}
