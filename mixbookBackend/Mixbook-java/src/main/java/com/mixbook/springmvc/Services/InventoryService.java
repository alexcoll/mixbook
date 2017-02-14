package com.mixbook.springmvc.Services;

import com.mixbook.springmvc.Models.Inventory;

public interface InventoryService {

	void addIngredientToInventory(Inventory inventory);

	void deleteIngredientFromInventory(Inventory inventory);

	void editIngredientInInventory(Inventory inventory);

}
