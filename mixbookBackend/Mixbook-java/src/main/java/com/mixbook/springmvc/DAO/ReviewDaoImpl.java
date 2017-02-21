package com.mixbook.springmvc.DAO;

import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.UserRecipeHasReview;

@Repository("reviewDao")
public class ReviewDaoImpl extends AbstractDao<Integer, UserRecipeHasReview> implements ReviewDao {

}
