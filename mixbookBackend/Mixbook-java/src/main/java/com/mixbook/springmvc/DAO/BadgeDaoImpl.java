package com.mixbook.springmvc.DAO;

import java.util.List;

import javax.persistence.NoResultException;
import javax.persistence.PersistenceException;

import org.hibernate.query.NativeQuery;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Badge;
import com.mixbook.springmvc.Models.User;

@Repository("badgeDao")
public class BadgeDaoImpl extends AbstractDao<Integer, Badge> implements BadgeDao {

	@Override
	public List<Badge> getAllBadges() throws Exception {
		NativeQuery q = getSession().createNativeQuery("SELECT * FROM badges", Badge.class);
		List<Badge> badges = q.getResultList();
		return badges;
	}

	@Override
	public User checkForNewBadges(User user) throws Exception {
		Query query = getSession().createQuery("select u from User u left join fetch u.badges b where u.username = :username");
		query.setParameter("username", user.getUsername());
		User tempUser = (User) query.getSingleResult();
		return tempUser;
	}

	@Override
	public void assignNewBadges(User user) throws PersistenceException, Exception {
		getSession().update(user);
	}

}
