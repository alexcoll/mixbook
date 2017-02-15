package com.mixbook.springmvc.DAO;

import com.mixbook.springmvc.Models.Inventory;
import com.mixbook.springmvc.Models.User;

public interface InventoryDao {

	void addIngredientToInventory(Inventory inventory, User user);

	void deleteIngredientFromInventory(Inventory inventory, User user);

	void editIngredientInInventory(Inventory inventory, User user);

}
