package com.mixbook.springmvc.DAO;

import java.util.List;

import javax.persistence.PersistenceException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import org.hibernate.query.NativeQuery;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Services.UserService;

@Repository("userDao")
public class UserDaoImpl extends AbstractDao<Integer, User> implements UserDao {

	@Autowired
	UserService userService;

	private static final Logger logger = LogManager.getLogger(UserDaoImpl.class);

	public User findByEntityUsername(String username) throws Exception {
		Query query = getSession().createQuery("select u from User u where u.username = :username");
		query.setParameter("username", username);
		User user = (User) query.getSingleResult();
		return user;
	}
	
	public User findByEntityEmail(String email) throws Exception {
		Query query = getSession().createQuery("select u from User u where u.email = :email");
		query.setParameter("email", email);
		User user = (User) query.getSingleResult();
		return user;
	}

	@Override
	public User loadUserProfile(String username) throws PersistenceException, Exception {
		Query query = getSession().createQuery("select u from User u left join fetch u.badges b where u.username = :username");
		query.setParameter("username", username);
		User user = (User) query.getSingleResult();
		return user;
	}
	
	@Override
	public List<User> loadAllUsers() throws Exception {
		Query query = getSession().createQuery("select new User(userId, username, sumOfPersonalRecipeRatings, numberOfPersonalRecipeRatings) from User");
		List<User> users = (List<User>) query.getResultList();
		return users;
	}

	public void createUser(User user) throws PersistenceException, Exception {
		persist(user);
	}

	public void deleteUser(User user) throws Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		NativeQuery updateQuery = getSession().createNativeQuery("UPDATE recipe r1 INNER JOIN users_recipe_has_review r2 ON r1.recipe_id = r2.recipe_recipe_id SET r1.number_of_ratings = r1.number_of_ratings - 1, r1.total_rating = r1.total_rating - r2.rating WHERE r2.users_user_id = :users_user_id");
		updateQuery.setParameter("users_user_id", user.getUserId());
		updateQuery.executeUpdate();
		Query query = getSession().createQuery("delete User where username = :username");
		query.setParameter("username", user.getUsername());
		query.executeUpdate();
	}

	public void editUser(User user) throws Exception {
		//Updating both first name and last name
		if (user.getFirstName() != null && user.getLastName() != null ) {
			Query q = getSession().createQuery("update User set firstName = :firstName, lastName = :lastName where username = :username");
			q.setParameter("firstName", user.getFirstName());
			q.setParameter("lastName", user.getLastName());
			q.setParameter("username", user.getUsername());
			q.executeUpdate();
		}
		//Updating last name
		else if (user.getLastName() != null) {
			Query q = getSession().createQuery("update User set lastName = :lastName where username = :username");
			q.setParameter("lastName", user.getLastName());
			q.setParameter("username", user.getUsername());
			q.executeUpdate();
		}
		//Updating first name
		else if (user.getFirstName() != null) {
			Query q = getSession().createQuery("update User set firstName = :firstName where username = :username");
			q.setParameter("firstName", user.getFirstName());
			q.setParameter("username", user.getUsername());
			q.executeUpdate();
		}
		//All fields were null
		else {
			logger.error("Invalid request! Nothing was received to update!");
		}

	}

	public void changeEmail(User user) throws PersistenceException, Exception {
		Query q = getSession().createQuery("update User set email = :email where username = :username");
		q.setParameter("email", user.getEmail());
		q.setParameter("username", user.getUsername());
		q.executeUpdate();
	}

	public void changePassword(User user) throws Exception {
		Query q = getSession().createQuery("update User set password = :password, lastPasswordResetDate = :lastPasswordResetDate where username = :username");
		q.setParameter("password", user.getPassword());
		q.setParameter("lastPasswordResetDate", user.getLastPasswordResetDate());
		q.setParameter("username", user.getUsername());
		q.executeUpdate();
	}

	@Override
	public void lockAccount(User user) throws Exception {
		Query q = getSession().createQuery("update User set enabled = :enabled where username = :username");
		q.setParameter("enabled", Boolean.FALSE);
		q.setParameter("username", user.getUsername());
		q.executeUpdate();
	}
	
	@Override
	public void unlockAccount(User user) throws Exception {
		Query q = getSession().createQuery("update User set enabled = :enabled where userId = :userId");
		q.setParameter("enabled", Boolean.TRUE);
		q.setParameter("userId", user.getUserId());
		q.executeUpdate();
	}
}
