package com.mixbook.springmvc.Formatters;

import java.text.ParseException;
import java.util.Locale;

import org.springframework.format.Formatter;
import org.thymeleaf.util.StringUtils;

/**
 * Name formatter class that implements the Spring Formatter interface.
 * <p>
 * Formats a name(String) and returns the value with spaces replaced by commas.
 * @author John Tyler Preston
 * @version 1.0
 */
public class NameFormatter implements Formatter<String> {

	@Override
	public String print(String input, Locale locale) {
		return formatName(input, locale);
	}

	@Override
	public String parse(String input, Locale locale) throws ParseException {
		return formatName(input, locale);
	}

	/**
	 * Formats a name(String) and returns the value with spaces replaced by commas.
	 * @param input the string to format.
	 * @param locale represents the geographical, political, or cultural region to be used for locale-sensitive formatting.
	 * @return the input with spaces replaced by commas.
	 */
	private String formatName(String input, Locale locale) {
		return StringUtils.replace(input, " ", ",");
	}
}
