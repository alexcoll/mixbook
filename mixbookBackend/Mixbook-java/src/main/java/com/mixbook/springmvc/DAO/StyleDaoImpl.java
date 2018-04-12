package com.mixbook.springmvc.DAO;

import java.util.List;

import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Style;

@Repository("styleDao")
public class StyleDaoImpl extends AbstractDao<Integer, Style> implements StyleDao {

	public List<Style> getStyles() throws Exception {
		Query query = getSession().createQuery("select s from Style s");
		List<Style> result = (List<Style>) query.getResultList();
		return result;
	}

}
