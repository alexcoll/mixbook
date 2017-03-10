package com.mixbook.springmvc.DAO;

import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.MaxInventoryItemsException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.User;

public interface InventoryDao {

	void addIngredientToInventory(Brand brand, User user) throws MaxInventoryItemsException, NullPointerException, PersistenceException, Exception;

	void deleteIngredientFromInventory(Brand brand, User user) throws NullPointerException, Exception;

	List<Brand> getUserInventory(User user) throws Exception;

}
