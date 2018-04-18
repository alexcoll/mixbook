package com.mixbook.springmvc.Services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.RecommendationDao;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Recommendation;
import com.mixbook.springmvc.Models.User;

/**
 * Provides the concrete implementation of the modular service layer functionality for recommendation related tasks for the controller layer.
 * @author John Tyler Preston
 * @version 1.0
 */
@Service("recommendationService")
@Transactional
public class RecommendationServiceImpl implements RecommendationService {

	/**
	 * Provides ability to access recommendation data layer functions.
	 */
	@Autowired
	private RecommendationDao dao;

	@Override
	public void recommendRecipe(Recommendation recommendation) throws UnknownServerErrorException {
		try {
			recommendation.setStatus(false);
			dao.recommendRecipe(recommendation);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	@Override
	public void deleteRecommendation(Recommendation recommendation) throws UnknownServerErrorException {
		try {
			dao.deleteRecommendation(recommendation);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	@Override
	public Set<Recommendation> loadRecommendations(User user) throws UnknownServerErrorException {
		try {
			return dao.loadRecommendations(user);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

}
