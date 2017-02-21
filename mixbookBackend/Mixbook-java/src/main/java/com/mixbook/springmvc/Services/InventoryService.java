package com.mixbook.springmvc.Services;

import java.util.List;

import com.mixbook.springmvc.Exceptions.MaxInventoryItemsException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.User;

public interface InventoryService {

	void addIngredientToInventory(Brand brand, User user) throws MaxInventoryItemsException;

	void deleteIngredientFromInventory(Brand brand, User user);

	List<Brand> getUserInventory(User user);

}
