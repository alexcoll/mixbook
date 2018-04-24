package com.mixbook.springmvc.DAO;

import java.util.List;

import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Style;

/**
 * Provides the concrete implementation of the modular data layer functionality for style related tasks for the service layer.
 * @author John Tyler Preston
 * @version 1.0
 */
@Repository("styleDao")
public class StyleDaoImpl extends AbstractDao<Integer, Style> implements StyleDao {

	@Override
	public List<Style> getStyles() throws Exception {
		Query query = getSession().createQuery("select s from Style s");
		List<Style> result = (List<Style>) query.getResultList();
		return result;
	}

}
