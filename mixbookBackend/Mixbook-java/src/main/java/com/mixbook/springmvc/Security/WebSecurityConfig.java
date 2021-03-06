package com.mixbook.springmvc.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Configures Spring Security.
 * @author John Tyler Preston
 * @version 1.0
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableTransactionManagement
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	/**
	 * Allows configuring the unauthorized handler.
	 */
	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;

	/**
	 * Allows the use of Spring Security's <code>UserDetailsService</code> functionality.
	 */
	@Autowired
	private UserDetailsService userDetailsService;

	/**
	 * Configures authentication for Spring Security.
	 * @param authenticationManagerBuilder the Spring Security object used to construct the authentication manager.
	 * @throws Exception thrown when an unknown configuration error occurs.
	 */
	@Autowired
	public void configureAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder
		.userDetailsService(this.userDetailsService)
		.passwordEncoder(passwordEncoder());
	}

	/**
	 * Configures the encryption for passwords.
	 * @return the <code>BCryptPasswordEncoder</code> to use for encryption purposes.
	 */
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/**
	 * Configures the authentication filter.
	 * @return the authentication filter.
	 * @throws Exception thrown when an unknown configuration error occurs.
	 */
	@Bean
	public JwtAuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {
		JwtAuthenticationTokenFilter jwtAuthenticationTokenFilter = new JwtAuthenticationTokenFilter();
		jwtAuthenticationTokenFilter.setAuthenticationManager(super.authenticationManagerBean());
		return jwtAuthenticationTokenFilter;
	}

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity
		.csrf().disable()
		.exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.NEVER).and()
		.authorizeRequests()
		.antMatchers("/auth/**").permitAll()
		.antMatchers("/user/createUser").permitAll()
		.antMatchers("/user/resetPassword").permitAll()
		.antMatchers("/user/updatePassword").permitAll()
		.antMatchers("/user/savePassword").hasAuthority("CHANGE_PASSWORD_PRIVILEGE")
		.antMatchers("/user/loadSavePasswordPage").hasAuthority("CHANGE_PASSWORD_PRIVILEGE")
		.antMatchers("/user/requestReset").permitAll()
		.antMatchers("/user/getUserInfo").permitAll()
		.antMatchers("/user/loadAllUsers").permitAll()
		.antMatchers("/user/unlockAccount").permitAll()
		.antMatchers("/user/loadUnlockAccountSuccessPage").permitAll()
		.antMatchers("/user/unlockAccountSuccess").permitAll()
		.antMatchers("/user/requestUnlock").permitAll()
		.antMatchers("/user/requestAccountUnlock").permitAll()
		.antMatchers("/badge/getBadges").permitAll()
		.antMatchers("/css/**").permitAll()
		.antMatchers("/js/**").permitAll()
		.antMatchers("/type/**").permitAll()
		.antMatchers("/style/**").permitAll()
		.antMatchers("/brand/**").permitAll()
		.antMatchers("/recipe/getAllRecipesAnonymousUserCanMake").permitAll()
		.antMatchers("/recipe/searchForRecipeByName").permitAll()
		.antMatchers("/recipe/getBrandsForRecipe").permitAll()
		.antMatchers("/review/loadReviewsForRecipe").permitAll()
		.antMatchers("/recipe/getAllRecipes").permitAll()
		.anyRequest().authenticated();
		httpSecurity
		.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
		httpSecurity.headers().cacheControl();
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

}