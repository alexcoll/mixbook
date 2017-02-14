package com.mixbook.springmvc.DAO;

import com.mixbook.springmvc.Models.Inventory;

public interface InventoryDao {

	void addIngredientToInventory(Inventory inventory);

	void deleteIngredientFromInventory(Inventory inventory);

	void editIngredientInInventory(Inventory inventory);

}
