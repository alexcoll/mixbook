package com.mixbook.springmvc.DAO;

import java.util.List;

import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Type;

@Repository("typeDao")
public class TypeDaoImpl extends AbstractDao<Integer, Type> implements TypeDao {

	public List<Type> getTypes() throws Exception {
		Query query = getSession().createQuery("select t from Type t");
		List<Type> result = (List<Type>) query.getResultList();
		return result;
	}

}
