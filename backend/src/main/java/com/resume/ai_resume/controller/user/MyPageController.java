// package com.resume.ai_resume.controller.user;

// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.annotation.AuthenticationPrincipal;
// import org.springframework.security.oauth2.core.user.OAuth2User;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.resume.ai_resume.service.user.UsersService;

// import lombok.RequiredArgsConstructor;


// @RestController
// @RequestMapping("/mypage")
// @RequiredArgsConstructor
// public class MyPageController {

//     private final UsersService usersService;

//     // MyPageController(UsersService usersService) {
//     //     this.usersService = usersService;
//     // }

//     @GetMapping("")
//     public String myPage(@AuthenticationPrincipal OAuth2User principal) {
//         if (principal == null) {
//             return "❌ 인증된 사용자만 접근 가능합니다. 먼저 로그인해주세요.";
//         }

//         String name = principal.getAttribute("name");
//         String email = principal.getAttribute("email");
//         return """
//             🎉 마이페이지
//             이름: %s
//             이메일: %s
//             👉 로그아웃: http://localhost:8080/logout
//             """.formatted(name, email);
//     }

//     // 회원 탈퇴
//     @DeleteMapping("/user/delete")
//     public ResponseEntity<?> deleteAccount(@AuthenticationPrincipal OAuth2User principal) {
//     String email = principal.getAttribute("email");
//     usersService.deleteUserByEmail(email);
//     return ResponseEntity.ok("회원 탈퇴 및 이력서 삭제 완료");
// }
// }