package com.mixbook.springmvc.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.mobile.device.Device;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Provides utility functions for JSON web tokens.
 * @author John Tyler Preston
 * @version 1.0
 */
@Component
public class JwtTokenUtil implements Serializable {

	/**
	 * Standard random <code>serialVersionUID</code>.
	 */
	private static final long serialVersionUID = -3301605591108950415L;

	/**
	 * Token username key claim.
	 */
	static final String CLAIM_KEY_USERNAME = "sub";

	/**
	 * Token audience key claim.
	 */
	static final String CLAIM_KEY_AUDIENCE = "audience";

	/**
	 * Token created date key claim.
	 */
	static final String CLAIM_KEY_CREATED = "created";

	/**
	 * Unknown device type.
	 */
	private static final String AUDIENCE_UNKNOWN = "unknown";

	/**
	 * Computer device type.
	 */
	private static final String AUDIENCE_WEB = "web";

	/**
	 * Mobile device type.
	 */
	private static final String AUDIENCE_MOBILE = "mobile";

	/**
	 * Tablet device type.
	 */
	private static final String AUDIENCE_TABLET = "tablet";

	/**
	 * Secret hashing phrase for token.
	 */
	private String secret = "mySecret";

	/**
	 * Token expiration time in seconds (currently 1 week/7 days).
	 */
	private Long expiration = (long) 604800;

	/**
	 * Parses a username from a token.
	 * @param token the token to parse the username from.
	 * @return the username from the token.
	 */
	public String getUsernameFromToken(String token) {
		String username;
		try {
			final Claims claims = getClaimsFromToken(token);
			username = claims.getSubject();
		} catch (Exception e) {
			username = null;
		}
		return username;
	}

	/**
	 * Parses the date a token was created from a token.
	 * @param token the token to parse the date created from.
	 * @return the date the token was created.
	 */
	public Date getCreatedDateFromToken(String token) {
		Date created;
		try {
			final Claims claims = getClaimsFromToken(token);
			created = new Date((Long) claims.get(CLAIM_KEY_CREATED));
		} catch (Exception e) {
			created = null;
		}
		return created;
	}

	/**
	 * @param token the token to parse the expiration date from.
	 * @return the expiration date from the token.
	 */
	public Date getExpirationDateFromToken(String token) {
		Date expiration;
		try {
			final Claims claims = getClaimsFromToken(token);
			expiration = claims.getExpiration();
		} catch (Exception e) {
			expiration = null;
		}
		return expiration;
	}

	/**
	 * Parses a device type from a token.
	 * @param token the token to parse the device type from.
	 * @return the device type from the token.
	 */
	public String getAudienceFromToken(String token) {
		String audience;
		try {
			final Claims claims = getClaimsFromToken(token);
			audience = (String) claims.get(CLAIM_KEY_AUDIENCE);
		} catch (Exception e) {
			audience = null;
		}
		return audience;
	}

	/**
	 * Gets the claims from a token.
	 * @param token the token to parse the claims from.
	 * @return the claims from the token.
	 */
	private Claims getClaimsFromToken(String token) {
		Claims claims;
		try {
			claims = Jwts.parser()
					.setSigningKey(secret)
					.parseClaimsJws(token)
					.getBody();
		} catch (Exception e) {
			claims = null;
		}
		return claims;
	}

	/**
	 * Generates an expiration date for a token.
	 * @return the expiration date for a token.
	 */
	private Date generateExpirationDate() {
		return new Date(System.currentTimeMillis() + expiration * 1000);
	}

	/**
	 * Determines if a token is expired.
	 * @param token the token to determine if it is expired or not.
	 * @return true if the token is expired, or false if it isn't.
	 */
	private Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}

	/**
	 * Determines if the token was created before a user's password was last reset.
	 * @param created the date the token was created.
	 * @param lastPasswordReset the date the user's password was last reset.
	 * @return true if the token was created after the user's password was last reset, or false if it wasn't.
	 */
	private Boolean isCreatedBeforeLastPasswordReset(Date created, Date lastPasswordReset) {
		return (lastPasswordReset != null && created.before(lastPasswordReset));
	}

	/**
	 * Determines what device type to use for token generation.
	 * @param device the device to use for token generation.
	 * @return the audience to use for token generation.
	 */
	private String generateAudience(Device device) {
		String audience = AUDIENCE_UNKNOWN;
		if (device.isNormal()) {
			audience = AUDIENCE_WEB;
		} else if (device.isTablet()) {
			audience = AUDIENCE_TABLET;
		} else if (device.isMobile()) {
			audience = AUDIENCE_MOBILE;
		}
		return audience;
	}

	/**
	 * Ignores a token's expiration date if it was created on a mobile device or tablet.
	 * @param token the token to check what device it came from.
	 * @return true if the token was created on a tablet or a mobile device.
	 */
	private Boolean ignoreTokenExpiration(String token) {
		String audience = getAudienceFromToken(token);
		return (AUDIENCE_TABLET.equals(audience) || AUDIENCE_MOBILE.equals(audience));
	}

	/**
	 * Generates a token for a user (first step of generation).
	 * @param userDetails the user account details to use when generating the token..
	 * @param device the device type to generate the token for.
	 * @return the generated token.
	 */
	public String generateToken(UserDetails userDetails, Device device) {
		Map<String, Object> claims = new HashMap<>();
		claims.put(CLAIM_KEY_USERNAME, userDetails.getUsername());
		claims.put(CLAIM_KEY_AUDIENCE, generateAudience(device));
		claims.put(CLAIM_KEY_CREATED, new Date());
		return generateToken(claims);
	}

	/**
	 * Generates a token for a user (second step of generation).
	 * @param claims the claims to use in token generation.
	 * @return the generated token.
	 */
	String generateToken(Map<String, Object> claims) {
		return Jwts.builder()
				.setClaims(claims)
				.setExpiration(generateExpirationDate())
				.signWith(SignatureAlgorithm.HS512, secret)
				.compact();
	}

	/**
	 * Determines if a token can be refreshed for a user.
	 * @param token the token to be refreshed.
	 * @param lastPasswordReset the date when the user's password was last reset.
	 * @return true if the token can be refreshed, or false if it can't be refreshed.
	 */
	public Boolean canTokenBeRefreshed(String token, Date lastPasswordReset) {
		final Date created = getCreatedDateFromToken(token);
		return !isCreatedBeforeLastPasswordReset(created, lastPasswordReset)
				&& (!isTokenExpired(token) || ignoreTokenExpiration(token));
	}

	/**
	 * Refreshes a user's token.
	 * @param token the token to be refreshed.
	 * @return the refreshed token.
	 */
	public String refreshToken(String token) {
		String refreshedToken;
		try {
			final Claims claims = getClaimsFromToken(token);
			claims.put(CLAIM_KEY_CREATED, new Date());
			refreshedToken = generateToken(claims);
		} catch (Exception e) {
			refreshedToken = null;
		}
		return refreshedToken;
	}

	/**
	 * Validates a token.
	 * @param token the token to validate.
	 * @param userDetails the user account details.
	 * @return true if the token is valid, or false if it isn't valid.
	 */
	public Boolean validateToken(String token, UserDetails userDetails) {
		JwtUser user = (JwtUser) userDetails;
		final String username = getUsernameFromToken(token);
		final Date created = getCreatedDateFromToken(token);
		return (
				username.equals(user.getUsername())
				&& !isTokenExpired(token)
				&& !isCreatedBeforeLastPasswordReset(created, user.getLastPasswordResetDate()));
	}

}
