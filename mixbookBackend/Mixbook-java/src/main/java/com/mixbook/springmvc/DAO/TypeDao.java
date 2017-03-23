package com.mixbook.springmvc.DAO;

import java.util.List;

import com.mixbook.springmvc.Models.Type;

public interface TypeDao {

	List<String> getTypes() throws Exception;

}
