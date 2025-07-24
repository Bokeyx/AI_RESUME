package com.resume.ai_resume.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController; 


// @RestController
// public class Index {
//     @GetMapping("/")
//     public String home(@AuthenticationPrincipal OAuth2User principal) {
//         if (principal != null) {
//             return "✅ 로그인됨: " + principal.getAttribute("email") + "\n👉 /mypage 접근 가능";
//         } else {
//             return """
//                 ❌ 로그인되지 않음
//                 👉 [구글 로그인] http://localhost:8080/oauth2/authorization/google
//                 """;
//         }
//     }
    
// }
