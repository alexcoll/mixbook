package com.mixbook.springmvc.DAO;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
 
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import org.springframework.beans.factory.annotation.Autowired;

/**
 * Provides base functionality for many CRUD and utility functions for any persistent class.
 * @author John Tyler Preston
 * @version 1.0
 * @param <PK> generic class that gets used as a primary key. 
 * @param <T> generic class that gets used to identify the persistent class.
 */
public abstract class AbstractDao<PK extends Serializable, T> {

	/**
	 * Generic class that gets used to be the identifier of what class needs to be persisted.
	 */
	private final Class<T> persistentClass;

	/**
	 * Constructs an instance of the abstract class (well, not literally, since an abstract class can't be instantiated). Used to assign the
	 * appropriate persistent class to be used.
	 */
	@SuppressWarnings("unchecked")
	public AbstractDao(){
		this.persistentClass =(Class<T>) ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[1];
	}

	/**
	 * Used so that a session can be constructed.
	 */
	@Autowired
	private SessionFactory sessionFactory;

	/**
	 * Gets the current session from the session factory.
	 * @return the current session that the session factory produced.
	 */
	protected Session getSession(){
		return sessionFactory.getCurrentSession();
	}

	/**
	 * Loads an entity from the database based on the primary key.
	 * @param key the primary key of the object to load.
	 * @return the entity loaded from the database.
	 */
	@SuppressWarnings("unchecked")
	public T getByKey(PK key) {
		return (T) getSession().get(persistentClass, key);
	}

	/**
	 * Persists an entity.
	 * @param entity the entity to persist.
	 */
	public void persist(T entity) {
		getSession().persist(entity);
	}

	/**
	 * Updates an entity.
	 * @param entity the entity to update.
	 */
	public void update(T entity) {
		getSession().update(entity);
	}

	/**
	 * Deletes an entity.
	 * @param entity the entity to delete.
	 */
	public void delete(T entity) {
		getSession().delete(entity);
	}
 
}
