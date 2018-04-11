package com.mixbook.springmvc.Services;

import java.util.List;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;

public interface StyleService {

	List<String> getStyles() throws UnknownServerErrorException;

}
