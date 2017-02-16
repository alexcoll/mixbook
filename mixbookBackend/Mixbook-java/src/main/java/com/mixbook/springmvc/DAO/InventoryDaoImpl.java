package com.mixbook.springmvc.DAO;

import org.hibernate.SQLQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Inventory;
import com.mixbook.springmvc.Models.User;
import com.mixbook.springmvc.Services.UserService;

@Repository("inventoryDao")
public class InventoryDaoImpl extends AbstractDao<Integer, Inventory> implements InventoryDao {

	@Autowired
	UserService userService;

	public void addIngredientToInventory(Inventory inventory, User user) {
		user = this.userService.findByEntityUsername(user.getUsername());
		SQLQuery insertQuery = getSession().createSQLQuery("" + "INSERT INTO inventories(users_user_id,brand,type,style)VALUES(?,?,?,?)");
		insertQuery.setParameter(0, user.getUserId());
		insertQuery.setParameter(1, inventory.getBrand());
		insertQuery.setParameter(2, inventory.getType());
		insertQuery.setParameter(3, inventory.getStyle());
		insertQuery.executeUpdate();
	}

	public void deleteIngredientFromInventory(Inventory inventory, User user) {
		user = this.userService.findByEntityUsername(user.getUsername());
		SQLQuery deleteQuery = getSession().createSQLQuery("DELETE FROM inventories WHERE users_user_id=:users_user_id AND inventories_id=:inventories_id").setParameter("users_user_id", user.getUserId()).setParameter("inventories_id", inventory.getInventoriesId());
		deleteQuery.executeUpdate();
	}

}
