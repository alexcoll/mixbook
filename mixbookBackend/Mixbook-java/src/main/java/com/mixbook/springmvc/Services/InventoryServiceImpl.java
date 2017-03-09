package com.mixbook.springmvc.Services;

import java.util.List;

import javax.persistence.PersistenceException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.InventoryDao;
import com.mixbook.springmvc.Exceptions.InvalidIngredientException;
import com.mixbook.springmvc.Exceptions.MaxInventoryItemsException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.User;

@Service("inventoryService")
@Transactional
public class InventoryServiceImpl implements InventoryService {

	@Autowired
	private InventoryDao dao;

	public void addIngredientToInventory(Brand brand, User user) throws MaxInventoryItemsException, InvalidIngredientException, PersistenceException {
		try {
			dao.addIngredientToInventory(brand, user);
		} catch (MaxInventoryItemsException e) {
			throw new MaxInventoryItemsException("Maximum number of ingredients in inventory exceeded!");
		} catch (NullPointerException e) {
			throw new InvalidIngredientException("Invalid ingredient added!");
		} catch (PersistenceException e) {
			throw new PersistenceException();
		}
	}

	public void deleteIngredientFromInventory(Brand brand, User user) throws InvalidIngredientException {
		try {
			dao.deleteIngredientFromInventory(brand, user);
		} catch (NullPointerException e) {
			throw new InvalidIngredientException("Invalid ingredient deleted!");
		}
	}

	public List<Brand> getUserInventory(User user) {
		return dao.getUserInventory(user);
	}

}
