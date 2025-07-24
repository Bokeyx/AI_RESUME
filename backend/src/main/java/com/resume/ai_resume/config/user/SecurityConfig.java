// package com.resume.ai_resume.config.user;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;

// import com.resume.ai_resume.service.user.UsersService;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     @Autowired
//     private UsersService usersService;

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         return http
//             // CSRF 비활성화 (개발 시엔 꺼두는 것이 일반적)
//             .csrf(csrf -> csrf.disable())

//             // 인증 요청 설정
//             .authorizeHttpRequests(auth -> auth
//                 .requestMatchers("/", "/login**", "/css/**", "/js/**").permitAll()
//                 .anyRequest().authenticated()
//             )

//             // OAuth2 로그인 설정
//             .oauth2Login(oauth2 -> oauth2
//                 .userInfoEndpoint(userInfo -> userInfo
//                     .userService(usersService)
//                 )
//             )
//             // 로그아웃 기능
//             .logout(logout -> logout
//             .logoutUrl("/logout")
//             .logoutSuccessUrl("/") // 로그아웃 후 메인으로 이동
//             .invalidateHttpSession(true)
//             .deleteCookies("JSESSIONID")
//             )

//             .build();
//     }
// }