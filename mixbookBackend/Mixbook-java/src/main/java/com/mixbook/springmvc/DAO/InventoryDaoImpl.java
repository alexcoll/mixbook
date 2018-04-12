package com.mixbook.springmvc.DAO;

import java.math.BigInteger;
import java.util.List;

import javax.persistence.PersistenceException;

import org.hibernate.query.NativeQuery;
import org.hibernate.query.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Exceptions.MaxInventoryItemsException;
import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Services.UserService;

@Repository("inventoryDao")
public class InventoryDaoImpl extends AbstractDao<Integer, Brand> implements InventoryDao {

	@Autowired
	UserService userService;

	public void addIngredientToInventory(Brand brand, User user) throws MaxInventoryItemsException, NullPointerException, PersistenceException, NoDataWasChangedException, Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		NativeQuery countQuery = getSession().createNativeQuery("SELECT COUNT(*) FROM user_has_brand WHERE user_user_id = :user_user_id");
		countQuery.setParameter("user_user_id", user.getUserId());
		Integer count = ((BigInteger) countQuery.getSingleResult()).intValue();
		if (count == 20) {
			throw new MaxInventoryItemsException("Maximum number of ingredients in inventory exceeded!");
		}
		NativeQuery searchQuery = getSession().createNativeQuery("SELECT brand_id FROM brand WHERE brand_name = :brand_name");
		searchQuery.setParameter("brand_name", brand.getBrandName());
		Integer brandId = ((BigInteger) searchQuery.getSingleResult()).intValue();
		brand.setBrandId(brandId);
		NativeQuery insertQuery = getSession().createNativeQuery("INSERT INTO user_has_brand (user_user_id, brand_brand_id) VALUES (:user_id, :brand_id)");
		insertQuery.setParameter("user_id", user.getUserId());
		insertQuery.setParameter("brand_id", brand.getBrandId());
		int numRowsAffected = insertQuery.executeUpdate();
		if (numRowsAffected < 1) {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		}
	}

	public void deleteIngredientFromInventory(Brand brand, User user) throws NullPointerException, NoDataWasChangedException, Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		NativeQuery searchQuery = getSession().createNativeQuery("SELECT brand_id FROM brand WHERE brand_name = :brand_name");
		searchQuery.setParameter("brand_name", brand.getBrandName());
		Integer brandId = ((BigInteger) searchQuery.getSingleResult()).intValue();
		brand.setBrandId(brandId);
		NativeQuery deleteQuery = getSession().createNativeQuery("DELETE FROM user_has_brand WHERE user_user_id = :user_user_id AND brand_brand_id = :brand_brand_id");
		deleteQuery.setParameter("user_user_id", user.getUserId());
		deleteQuery.setParameter("brand_brand_id", brand.getBrandId());
		int numRowsAffected = deleteQuery.executeUpdate();
		if (numRowsAffected < 1) {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		}
	}

	public List<Brand> getUserInventory(User user) throws Exception {
		user = this.userService.findByEntityUsername(user.getUsername());
		Query query = getSession().createQuery("select b from Brand b inner join b.users u where u.userId = :userId");
		query.setParameter("userId", user.getUserId());
		List<Brand> result = (List<Brand>) query.getResultList();
		return result;
	}

}
