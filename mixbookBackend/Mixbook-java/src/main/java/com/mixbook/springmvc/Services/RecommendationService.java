package com.mixbook.springmvc.Services;

import java.util.Set;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Recommendation;
import com.mixbook.springmvc.Models.User;

public interface RecommendationService {
	
	void recommendRecipe(Recommendation recommendation) throws UnknownServerErrorException;
	
	void deleteRecommendation(Recommendation recommendation) throws UnknownServerErrorException;
	
	Set<Recommendation> loadRecommendations(User user) throws UnknownServerErrorException;

}
