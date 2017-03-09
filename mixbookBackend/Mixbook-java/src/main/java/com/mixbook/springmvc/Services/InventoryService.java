package com.mixbook.springmvc.Services;

import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.InvalidIngredientException;
import com.mixbook.springmvc.Exceptions.MaxInventoryItemsException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.User;

public interface InventoryService {

	void addIngredientToInventory(Brand brand, User user) throws MaxInventoryItemsException, InvalidIngredientException, PersistenceException;

	void deleteIngredientFromInventory(Brand brand, User user) throws InvalidIngredientException;

	List<Brand> getUserInventory(User user);

}
