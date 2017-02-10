package com.mixbook.springmvc.DAO;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.User;

@Repository("userDao")
public class UserDaoImpl extends AbstractDao<Integer, User> implements UserDao {

	private static final Logger logger = LogManager.getLogger(UserDaoImpl.class); 

	public User findById(int id) {
		return getByKey(id);
	}

	public User findByEmail(String email) {
		boolean exists = (Long) getSession().createQuery("select count(*) from User where email = :email").setParameter("email", email).uniqueResult() > 0;
		if (exists) {
			return new User();
		}
		else {
			return null;
		}
	}

	public User findByEntityUsername(String username) {
		Criteria crit = createEntityCriteria();
		crit.add(Restrictions.eq("username", username));
		User user = (User)crit.uniqueResult();
		return user;
	}

	@SuppressWarnings("unchecked")
	public List<User> findAllUsers() {
		return null;
	}

	public void createUser(User user) {
		persist(user);
	}

	public void deleteUser(User user) {
		Query query = getSession().createQuery("delete User where username = :username");
		query.setParameter("username", user.getUsername());
		query.executeUpdate();
	}

	public void editUser(User user) {
		//Updating both first name and last name
		if (user.getFirstName() != null && user.getLastName() != null ) {
			Query q = getSession().createQuery("update User set first_name = :first_name, last_name = :last_name where username = :username");
			q.setParameter("first_name", user.getFirstName());
			q.setParameter("last_name", user.getLastName());
			q.setParameter("username", user.getUsername());
			q.executeUpdate();
		}
		//Updating last name
		else if (user.getLastName() != null) {
			Query q = getSession().createQuery("update User set last_name = :last_name where username = :username");
			q.setParameter("last_name", user.getLastName());
			q.setParameter("username", user.getUsername());
			q.executeUpdate();
		}
		//Updating first name
		else if (user.getFirstName() != null) {
			Query q = getSession().createQuery("update User set first_name = :first_name where username = :username");
			q.setParameter("first_name", user.getFirstName());
			q.setParameter("username", user.getUsername());
			q.executeUpdate();
		}
		//All fields were null
		else {
			logger.error("Invalid request! Nothing was received to update!");
		}

	}

}
