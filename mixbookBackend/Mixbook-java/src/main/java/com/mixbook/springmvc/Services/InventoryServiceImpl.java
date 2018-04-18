package com.mixbook.springmvc.Services;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.PersistenceException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mixbook.springmvc.DAO.InventoryDao;
import com.mixbook.springmvc.Exceptions.InvalidIngredientException;
import com.mixbook.springmvc.Exceptions.MaxInventoryItemsException;
import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.User;

/**
 * Provides the concrete implementation of the modular service layer functionality for inventory related tasks for the controller layer.
 * @author John Tyler Preston
 * @version 1.0
 */
@Service("inventoryService")
@Transactional
public class InventoryServiceImpl implements InventoryService {

	/**
	 * Provides ability to access account unlock data layer functions.
	 */
	@Autowired
	private InventoryDao dao;

	@Override
	public void addIngredientToInventory(Brand brand, User user) throws MaxInventoryItemsException, InvalidIngredientException, PersistenceException, NoDataWasChangedException, UnknownServerErrorException {
		try {
			dao.addIngredientToInventory(brand, user);
		} catch (MaxInventoryItemsException e) {
			throw new MaxInventoryItemsException("Maximum number of ingredients in inventory exceeded!");
		} catch (NullPointerException e) {
			throw new InvalidIngredientException("Invalid ingredient added!");
		} catch (PersistenceException e) {
			throw new PersistenceException();
		} catch (NoDataWasChangedException e) {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	@Override
	public void deleteIngredientFromInventory(Brand brand, User user) throws InvalidIngredientException, NoDataWasChangedException, UnknownServerErrorException {
		try {
			dao.deleteIngredientFromInventory(brand, user);
		} catch (NullPointerException e) {
			throw new InvalidIngredientException("Invalid ingredient deleted!");
		} catch (NoDataWasChangedException e) {
			throw new NoDataWasChangedException("No data was changed! Info may have been invalid!");
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
	}

	@Override
	public List<Brand> getUserInventory(User user) throws UnknownServerErrorException {
		List<Brand> tempList = new ArrayList<Brand>();
		try {
			tempList = dao.getUserInventory(user);
		} catch (Exception e) {
			throw new UnknownServerErrorException("Unknown server error!");
		}
		return tempList;
	}

}
