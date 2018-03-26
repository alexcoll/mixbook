package com.mixbook.springmvc.Services;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;

public interface EmailService {

	void generateResetPasswordEmail(String to, String url) throws UnknownServerErrorException;
	
	void generateAccountUnlockEmail(String to, String url) throws UnknownServerErrorException;
	
}
