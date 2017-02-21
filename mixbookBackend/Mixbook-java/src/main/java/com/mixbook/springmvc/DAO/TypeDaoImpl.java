package com.mixbook.springmvc.DAO;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.hibernate.Query;

import com.mixbook.springmvc.Models.Type;

@Repository("typeDao")
public class TypeDaoImpl extends AbstractDao<Integer, Type> implements TypeDao {

	public List<Type> getTypes() {
		Query query = getSession().createQuery("from Type");
		return query.list();
	}

}
