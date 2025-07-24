package com.resume.ai_resume.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.cors()
        .and()
        .csrf().disable()
        // .authorizeHttpRequests(auth -> auth
        //     .requestMatchers("/oauth/**", "login/**").permitAll()
        //     .anyRequest().authenticated());
        .authorizeHttpRequests(auth -> auth
          .requestMatchers("/test/**").permitAll()
          .requestMatchers("/login" , "/join").permitAll()
          .requestMatchers("/css/**", "/js/**").permitAll()
          .anyRequest().authenticated()
        );

            return http.build();
  }


}
