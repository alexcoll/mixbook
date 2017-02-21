package com.mixbook.springmvc.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.InventoryDao;
import com.mixbook.springmvc.Exceptions.MaxInventoryItemsException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.User;

@Service("inventoryService")
@Transactional
public class InventoryServiceImpl implements InventoryService {

	@Autowired
	private InventoryDao dao;

	public void addIngredientToInventory(Brand brand, User user) throws MaxInventoryItemsException {
		try {
			dao.addIngredientToInventory(brand, user);
		} catch (MaxInventoryItemsException e) {
			throw new MaxInventoryItemsException("Maximum number of ingredients in inventory exceeded!");
		}
	}

	public void deleteIngredientFromInventory(Brand brand, User user) {
		dao.deleteIngredientFromInventory(brand, user);
	}

	public List<Brand> getUserInventory(User user) {
		return dao.getUserInventory(user);
	}

}
