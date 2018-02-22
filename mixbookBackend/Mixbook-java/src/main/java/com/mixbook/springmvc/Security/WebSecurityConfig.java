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

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableTransactionManagement
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	public void configureAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder
		.userDetailsService(this.userDetailsService)
		.passwordEncoder(passwordEncoder());
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

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