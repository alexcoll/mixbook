package com.mixbook.springmvc.DAO;

import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Inventory;
import com.mixbook.springmvc.Models.User;

@Repository("inventoryDao")
public class InventoryDaoImpl extends AbstractDao<Integer, Inventory> implements InventoryDao {

	public void addIngredientToInventory(Inventory inventory, User user) {

	}

	public void deleteIngredientFromInventory(Inventory inventory, User user) {

	}

	public void editIngredientInInventory(Inventory inventory, User user) {

	}

}
