package com.mixbook.springmvc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.InventoryDao;
import com.mixbook.springmvc.Models.Inventory;
import com.mixbook.springmvc.Models.User;

@Service("inventoryService")
@Transactional
public class InventoryServiceImpl implements InventoryService {

	@Autowired
	private InventoryDao dao;

	public void addIngredientToInventory(Inventory inventory, User user) {
		dao.addIngredientToInventory(inventory, user);
	}

	public void deleteIngredientFromInventory(Inventory inventory, User user) {
		dao.deleteIngredientFromInventory(inventory, user);
	}

}
