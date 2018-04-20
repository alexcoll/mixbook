package com.mixbook.springmvc.Security;

import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;

/**
 * Registers the <code>DelegatingFilterProxy</code> to use the <code>springSecurityFilterChain</code> before any other registered <code>Filter</code>.
 * @author John Tyler Preston
 * @version 1.0
 */
public class SecurityWebApplicationInitializer extends AbstractSecurityWebApplicationInitializer {

}
