package com.mixbook.springmvc.DAO;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Style;

@Repository("styleDao")
public class StyleDaoImpl extends AbstractDao<Integer, Style> implements StyleDao {

	public List<Style> getStyles() {
		Query query = getSession().createQuery("from Style");
		return query.list();
	}

}
