package com.mixbook.springmvc.Configuration;

import javax.servlet.Filter;

import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

/**
 * Initializes all Spring MVC stuff for bootstrapping.
 * @author John Tyler Preston
 * @version 1.0
 */
public class AppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
 
	@Override
	protected Class<?>[] getRootConfigClasses() {
		return new Class[] { AppConfig.class };
	}

	@Override
	protected Class<?>[] getServletConfigClasses() {
		return null;
	}

	@Override
	protected String[] getServletMappings() {
		return new String[] { "/" };
	}

	@Override
	protected Filter[] getServletFilters() {
		CharacterEncodingFilter f = new CharacterEncodingFilter();
		f.setEncoding("UTF-8");
		f.setForceEncoding(true);
		Filter[] filters = {f};
		return filters;
	}
 
}
