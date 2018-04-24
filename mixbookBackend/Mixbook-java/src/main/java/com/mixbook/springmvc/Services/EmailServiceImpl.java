package com.mixbook.springmvc.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;

/**
 * Provides the concrete implementation of the modular service layer functionality for email related tasks for the controller layer.
 * @author John Tyler Preston
 * @version 1.0
 */
@Service("emailService")
public class EmailServiceImpl implements EmailService {

	/**
	 * Provides ability to access JavaMailSender library functions.
	 */
	@Autowired
	private JavaMailSender mailSender;
	
	@Override
	@Async
	public void generateResetPasswordEmail(String to, String url) throws UnknownServerErrorException {
		SimpleMailMessage email = new SimpleMailMessage();
		email.setTo(to);
		email.setFrom("mixbookhelp@gmail.com");
		email.setSubject("Password Reset Link Requested");
		email.setText("Dear " + to + ",\r\n\r\n" + "We have received a request to reset your account password. If you did not make this request, simply disregard this email.\r\n\r\nPlease click on the following link to reset your password: " + url + "\r\n\r\nSincerely,\r\n\r\nMixbook Support");
		mailSender.send(email);
	}

	@Override
	@Async
	public void generateAccountUnlockEmail(String to, String url) throws UnknownServerErrorException {
		SimpleMailMessage email = new SimpleMailMessage();
		email.setTo(to);
		email.setFrom("mixbookhelp@gmail.com");
		email.setSubject("Account Unlock Link Requested");
		email.setText("Dear " + to + ",\r\n\r\n" + "We have received a request to unlock your account. If you did not make this request, simply disregard this email.\r\n\r\nPlease click on the following link to unlock your account: " + url + "\r\n\r\nSincerely,\r\n\r\nMixbook Support");
		mailSender.send(email);
	}
	
}
