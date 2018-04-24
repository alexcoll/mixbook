package com.mixbook.springmvc.DAO;

import java.util.List;

import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Type;

/**
 * Provides the concrete implementation of the modular data layer functionality for type related tasks for the service layer.
 * @author John Tyler Preston
 * @version 1.0
 */
@Repository("typeDao")
public class TypeDaoImpl extends AbstractDao<Integer, Type> implements TypeDao {

	@Override
	public List<Type> getTypes() throws Exception {
		Query query = getSession().createQuery("select t from Type t");
		List<Type> result = (List<Type>) query.getResultList();
		return result;
	}

}
