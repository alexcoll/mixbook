package com.mixbook.springmvc.DAO;

import java.util.List;

import javax.persistence.PersistenceException;

import com.mixbook.springmvc.Exceptions.MaxInventoryItemsException;
import com.mixbook.springmvc.Exceptions.NoDataWasChangedException;
import com.mixbook.springmvc.Models.Brand;
import com.mixbook.springmvc.Models.User;

/**
 * Interface to provide modular data layer functionality for inventory related tasks for the service layer.
 * @author John Tyler Preston
 * @version 1.0
 */
public interface InventoryDao {

	/**
	 * Adds an ingredient to a user's inventory.
	 * @param brand the ingredient to add to a user's inventory.
	 * @param user the user for whom to add the ingredient.
	 * @throws MaxInventoryItemsException the exception is thrown when a user tries to add more than the maximum number of ingredients to their inventory.
	 * @throws NullPointerException the exception is the data provided yields null results.
	 * @throws PersistenceException the exception is thrown when a user tries to add a duplicate ingredient to their inventory.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to add an ingredient that became invalid.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void addIngredientToInventory(Brand brand, User user) throws MaxInventoryItemsException, NullPointerException, PersistenceException, NoDataWasChangedException, Exception;

	/**
	 * Removes an ingredient to a user's inventory.
	 * @param brand the ingredient to remove from a user's inventory.
	 * @param user the user for whom to remove the ingredient.
	 * @throws NullPointerException the exception is the data provided yields null results.
	 * @throws NoDataWasChangedException the exception is thrown when a user tries to remove an ingredient that became invalid.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	void deleteIngredientFromInventory(Brand brand, User user) throws NullPointerException, NoDataWasChangedException, Exception;

	/**
	 * Loads a user's inventory of ingredients.
	 * @param user the user for whom to load their inventory of ingredients.
	 * @return a list of a all the ingredients in a user's inventory.
	 * @throws Exception the exception is thrown when an unknown server error occurs.
	 */
	List<Brand> getUserInventory(User user) throws Exception;

}
