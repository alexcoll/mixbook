package com.mixbook.springmvc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.RecipeDao;

@Service("recipeService")
@Transactional
public class RecipeServiceImpl implements RecipeService {

	@Autowired
	private RecipeDao dao;

}
