package com.mixbook.springmvc.DAO;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.hibernate.query.NativeQuery;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Recommendation;
import com.mixbook.springmvc.Models.User;

/**
 * Provides the concrete implementation of the modular data layer functionality for recommendation related tasks for the service layer.
 * @author John Tyler Preston
 * @version 1.0
 */
@Repository("recommendationDao")
public class RecommendationDaoImpl extends AbstractDao<Integer, Recommendation> implements RecommendationDao {

	@Override
	public void recommendRecipe(Recommendation recommendation) throws Exception {
		persist(recommendation);
	}

	@Override
	public void deleteRecommendation(Recommendation recommendation) throws Exception {
		NativeQuery q = getSession().createNativeQuery("DELETE FROM recommendation WHERE recommendation_id = :recommendation_id AND recipient_id = :recipient_id");
		q.setParameter("recommendation_id", recommendation.getRecommendationId());
		q.setParameter("recipient_id", recommendation.getRecipient().getUserId());
		q.executeUpdate();
	}

	@Override
	public Set<Recommendation> loadRecommendations(User user) throws Exception {
		Query query = getSession().createQuery("select u from User u inner join fetch u.recommendationsReceived r inner join fetch r.recommender inner join fetch r.recommendedRecipe rr inner join fetch rr.user where u.username = :username");
		query.setParameter("username", user.getUsername());
		User loadedUser = (User) query.getSingleResult();
		Set<Recommendation> recommendations = loadedUser.getRecommendationsReceived();
		List<Integer> recommendationIds = new ArrayList<>();
		for (Recommendation recommendation : recommendations) {
			if (!recommendation.getStatus()) {
				recommendationIds.add(recommendation.getRecommendationId());
			}
		}
		if (!recommendationIds.isEmpty()) {
			query = getSession().createQuery("update Recommendation set status = :status where recommendationId in (:recommendationIds)");
			query.setParameter("status", Boolean.TRUE);
			query.setParameterList("recommendationIds", recommendationIds);
			query.executeUpdate();
		}
		return recommendations;
	}

}
