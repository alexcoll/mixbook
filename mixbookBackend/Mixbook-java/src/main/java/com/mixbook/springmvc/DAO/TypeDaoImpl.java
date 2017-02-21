package com.mixbook.springmvc.DAO;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.SQLQuery;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Type;

@Repository("typeDao")
public class TypeDaoImpl extends AbstractDao<Integer, Type> implements TypeDao {

	public List<Type> getTypes() {
		SQLQuery query = getSession().createSQLQuery("SELECT * FROM type");
		List result = query.list();
		return result;
	}

}
