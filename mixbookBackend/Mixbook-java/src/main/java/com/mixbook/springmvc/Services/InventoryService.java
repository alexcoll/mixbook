package com.mixbook.springmvc.Services;

import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.InvalidIngredientException;
import com.mixbook.springmvc.Exceptions.MaxInventoryItemsException;
import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.User;

/**
 * Interface to provide modular service layer functionality for inventory related tasks for the controller layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface InventoryService {

	/**
	 * Adds an ingredient to a user's inventory.
	 * @param brand the ingredient to add to a user's inventory.
	 * @param user the user for whom to add the ingredient.
	 * @throws MaxInventoryItemsException the exception is thrown when a user tries to add more than the maximum number of ingredients to their inventory.
	 * @throws InvalidIngredientException the exception is thrown when a user tries to add an invalid ingredient to their inventory.
	 * @throws PersistenceException the exception is thrown when a user tries to add a duplicate ingredient to their inventory.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to add an ingredient that became invalid.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void addIngredientToInventory(Brand brand, User user) throws MaxInventoryItemsException, InvalidIngredientException, PersistenceException, NoDataWasChangedException, UnknownServerErrorException;

	/**
	 * Removes an ingredient from a user's inventory.
	 * @param brand the ingredient to remove from a user's inventory.
	 * @param user the user for whom to remove the ingredient.
	 * @throws InvalidIngredientException the exception is thrown when a user tries to remove an invalid ingredient.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to remove an ingredient that became invalid.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	void deleteIngredientFromInventory(Brand brand, User user) throws InvalidIngredientException, NoDataWasChangedException, UnknownServerErrorException;

	/**
	 * Loads a user's inventory of ingredients.
	 * @param user the user for whom to load their inventory of ingredients.
	 * @return a list of a all the ingredients in a user's inventory.
	 * @throws UnknownServerErrorException the exception is thrown when an unknown server error occurs.
	 */
	List<Brand> getUserInventory(User user) throws UnknownServerErrorException;

}
