package com.mixbook.springmvc.Services;

import java.util.List;

import com.mixbook.springmvc.Exceptions.UnknownServerErrorException;
import com.mixbook.springmvc.Models.Badge;
import com.mixbook.springmvc.Models.User;

public interface BadgeService {

	List<Badge> getAllBadges() throws UnknownServerErrorException;

	void checkForNewBadges(User user) throws UnknownServerErrorException;

}
