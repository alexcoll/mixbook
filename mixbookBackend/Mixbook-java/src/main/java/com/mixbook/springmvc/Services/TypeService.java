package com.mixbook.springmvc.Services;

import java.util.List;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;

public interface TypeService {

	List<String> getTypes() throws UnknownServerErrorException;

}
