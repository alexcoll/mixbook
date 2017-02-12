package com.mixbook.springmvc.DAO;

import org.springframework.stereotype.Repository;

import com.mixbook.springmvc.Models.Inventory;

@Repository("inventoryDao")
public class InventoryDaoImpl extends AbstractDao<Integer, Inventory> implements InventoryDao {

}
