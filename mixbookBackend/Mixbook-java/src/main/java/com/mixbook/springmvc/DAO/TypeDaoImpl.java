package com.mixbook.springmvc.DAO;

import java.util.List;

import org.hibernate.SQLQuery;
import org.hibernate.type.StringType;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Type;

@Repository("typeDao")
public class TypeDaoImpl extends AbstractDao<Integer, Type> implements TypeDao {

	public List<String> getTypes() throws Exception {
		SQLQuery query = getSession().createSQLQuery("SELECT type_name FROM type");
		query.addScalar("type_name", new StringType());
		List<String> result = query.list();
		return result;
	}

}
