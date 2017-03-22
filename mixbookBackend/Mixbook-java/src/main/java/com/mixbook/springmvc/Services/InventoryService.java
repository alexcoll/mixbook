package com.mixbook.springmvc.Services;

import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.InvalidIngredientException;
import com.mixbook.springmvc.Exceptions.MaxInventoryItemsException;
import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.User;

public interface InventoryService {

	void addIngredientToInventory(Brand brand, User user) throws MaxInventoryItemsException, InvalidIngredientException, PersistenceException, NoDataWasChangedException, UnknownServerErrorException;

	void deleteIngredientFromInventory(Brand brand, User user) throws InvalidIngredientException, NoDataWasChangedException, UnknownServerErrorException;

	List<Brand> getUserInventory(User user) throws UnknownServerErrorException;

}
