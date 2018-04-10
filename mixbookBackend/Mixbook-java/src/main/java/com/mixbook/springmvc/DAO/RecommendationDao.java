package com.mixbook.springmvc.DAO;

import java.util.Set;

import com.mixbook.springmvc.Models.Recommendation;
import com.mixbook.springmvc.Models.User;

public interface RecommendationDao {
	
	void recommendRecipe(Recommendation recommendation) throws Exception;
	
	void deleteRecommendation(Recommendation recommendation) throws Exception;
	
	Set<Recommendation> loadRecommendations(User user) throws Exception;

}
