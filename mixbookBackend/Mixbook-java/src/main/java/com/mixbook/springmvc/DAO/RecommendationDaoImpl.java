package com.mixbook.springmvc.DAO;

import java.util.Set;

import org.hibernate.query.NativeQuery;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Recommendation;
import com.mixbook.springmvc.Models.User;

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
		Query query = getSession().createQuery("select u from User u inner join fetch u.recommendationsReceived r inner join fetch r.recommender inner join fetch r.recommendedRecipe where u.username = :username");
		query.setParameter("username", user.getUsername());
		User loadedUser = (User) query.getSingleResult();
		Set<Recommendation> recommendations = loadedUser.getRecommendationsReceived();
		return recommendations;
	}

}
