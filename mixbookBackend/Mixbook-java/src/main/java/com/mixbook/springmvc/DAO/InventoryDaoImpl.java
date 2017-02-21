package com.mixbook.springmvc.DAO;

import java.util.List;

import org.hibernate.SQLQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Exceptions.MaxInventoryItemsException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Services.UserService;

@Repository("inventoryDao")
public class InventoryDaoImpl extends AbstractDao<Integer, Brand> implements InventoryDao {

	@Autowired
	UserService userService;

	public void addIngredientToInventory(Brand brand, User user) throws MaxInventoryItemsException {
		user = this.userService.findByEntityUsername(user.getUsername());
		SQLQuery countQuery = getSession().createSQLQuery("SELECT COUNT(*) FROM user_has_brand WHERE user_user_id = ?").setParameter(0, user.getUserId());
		Long count = (Long) countQuery.uniqueResult();
		if (count == 20) {
			throw new MaxInventoryItemsException("Maximum number of ingredients in inventory exceeded!");
		}
		SQLQuery insertQuery = getSession().createSQLQuery("" + "INSERT INTO user_has_brand(user_user_id,brand_brand_id)VALUES(?,?)");
		insertQuery.setParameter(0, user.getUserId());
		insertQuery.setParameter(1, brand.getBrandId());
		insertQuery.executeUpdate();
	}

	public void deleteIngredientFromInventory(Brand brand, User user) {
		user = this.userService.findByEntityUsername(user.getUsername());
		SQLQuery deleteQuery = getSession().createSQLQuery("DELETE FROM user_has_brand WHERE user_user_id=:user_user_id AND brand_brand_id=:brand_brand_id").setParameter("user_user_id", user.getUserId()).setParameter("brand_brand_id", brand.getBrandId());
		deleteQuery.executeUpdate();
	}

	public List<Brand> getUserInventory(User user) {
		user = this.userService.findByEntityUsername(user.getUsername());
		SQLQuery query = getSession().createSQLQuery("SELECT brand_name FROM brand INNER JOIN user_has_brand ON brand.brand_id = user_has_brand.brand_brand_id WHERE user_has_brand.user_user_id = ?").setParameter(0, user.getUserId());
		List result = query.list();
		return result;
	}

}
