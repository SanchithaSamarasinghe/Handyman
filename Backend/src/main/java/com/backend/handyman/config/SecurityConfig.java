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
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/profile/**").permitAll()
                .requestMatchers("/booking/**").permitAll()
                // ✅ Add this line
                .anyRequest().authenticated()
            .and()
            .httpBasic();

        return http.build();
    }
}


