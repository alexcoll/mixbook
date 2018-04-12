package com.mixbook.springmvc.Services;

import java.util.List;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Type;

public interface TypeService {

	List<Type> getTypes() throws UnknownServerErrorException;

}
