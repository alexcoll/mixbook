package com.mixbook.springmvc.DAO;

import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Recipe;

@Repository("recipeDao")
public class RecipeDaoImpl extends AbstractDao<Integer, Recipe> implements RecipeDao {

}
