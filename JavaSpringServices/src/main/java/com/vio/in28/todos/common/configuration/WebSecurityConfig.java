package com.vio.in28.todos.common.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.csrf().ignoringAntMatchers("/api/**")
				.and().cors()
				.and().authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/api/**").permitAll().anyRequest().authenticated()
				.and().httpBasic();
	}
}

