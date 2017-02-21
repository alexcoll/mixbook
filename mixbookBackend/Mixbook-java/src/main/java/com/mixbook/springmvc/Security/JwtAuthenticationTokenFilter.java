package com.mixbook.springmvc.Security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import com.mixbook.springmvc.Controllers.UserController;
import com.mixbook.springmvc.DAO.UserDaoImpl;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class JwtAuthenticationTokenFilter extends UsernamePasswordAuthenticationFilter {

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	private static final List<String> NO_AUTH_ROUTES = new ArrayList<>();
	
	static {
		NO_AUTH_ROUTES.add("/mixbook/user/createUser");
		NO_AUTH_ROUTES.add("/mixbook/auth");
		NO_AUTH_ROUTES.add("/mixbook/type/getTypes");
		NO_AUTH_ROUTES.add("/mixbook/style/getStyles");
		NO_AUTH_ROUTES.add("/mixbook/brand/getBrands");
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletResponse resp = (HttpServletResponse) response;
		boolean needsAuthentication = true;
		jwtTokenUtil = WebApplicationContextUtils
				.getRequiredWebApplicationContext(this.getServletContext())
				.getBean(JwtTokenUtil.class);
		userDetailsService = WebApplicationContextUtils
				.getRequiredWebApplicationContext(this.getServletContext())
				.getBean(UserDetailsService.class);
		resp.setHeader("Access-Control-Allow-Origin", "*");
		resp.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE, PATCH");
		resp.setHeader("Access-Control-Max-Age", "3600");
		resp.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, " + "Authorization");
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		String authToken = httpRequest.getHeader("Authorization");
		String route = httpRequest.getRequestURI();
		if (NO_AUTH_ROUTES.contains(route)) {
			needsAuthentication = false;
		}
		if (needsAuthentication) {
			String username = jwtTokenUtil.getUsernameFromToken(authToken);

			if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
				UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
				if (jwtTokenUtil.validateToken(authToken, userDetails)) {
					UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
					authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
					SecurityContextHolder.getContext().setAuthentication(authentication);
					chain.doFilter(request, response);
				}
				else {
					resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
				}
			}
			else if (username == null) {
				resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
			}
			else {
				chain.doFilter(request, response);
			}
		}
		else {
			chain.doFilter(request, response);
		}
		
	}

}
