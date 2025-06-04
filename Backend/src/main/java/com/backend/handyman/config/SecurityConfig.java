package com.backend.handyman.config;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	 @Bean
	    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	        http
	            .csrf().disable()
	            .authorizeHttpRequests()
	                .requestMatchers("/auth/**").permitAll() // ✅ Allow both /auth/register and /auth/login
	                .anyRequest().authenticated()
	            .and()
	            .httpBasic(); // This enables basic auth (not needed for your endpoints but doesn't hurt)

	        return http.build();
	    }
}

