package com.mixbook.springmvc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.InventoryDao;
import com.mixbook.springmvc.Models.Inventory;

@Service("inventoryService")
@Transactional
public class InventoryServiceImpl implements InventoryService {

	@Autowired
	private InventoryDao dao;

	public void addIngredientToInventory(Inventory inventory) {
		dao.addIngredientToInventory(inventory);
	}

	public void deleteIngredientFromInventory(Inventory inventory) {
		dao.deleteIngredientFromInventory(inventory);
	}

	public void editIngredientInInventory(Inventory inventory) {
		dao.editIngredientInInventory(inventory);
	}

}
