package com.resume.ai_resume.service.user;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.resume.ai_resume.dto.user.UsersDTO;
import com.resume.ai_resume.mapper.UserMapper;
import com.resume.ai_resume.model.Users;
import com.resume.ai_resume.repository.user.UsersRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Service
@Slf4j
public class UsersService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UsersRepository usersRepository;
    private final UserMapper userMapper; 
    // 생성자 주입 방식으로 UsersRepository 연결
    // @Autowired
    // public UsersService(UsersRepository usersRepository){
    //     this.usersRepository = usersRepository;
    // }
    /**
     * 소셜 로그인 완료 후 호출되는 메서드
     * OAuth2UserRequest: 소셜 로그인 요청 객체 (access token 포함)
     * OAuth2User: 사용자 정보 (프로필, 이메일 등)
    */

    public void registerUser(UsersDTO dto) {
        dto.setUserId(UUID.randomUUID().toString());
        dto.setCreatedAt(LocalDateTime.now());
        Users user = userMapper.toEntity(dto);
        usersRepository.save(user);
    }

    public boolean login(String email, String password) {
        return usersRepository.findByEmailAndPassword(email, password).isPresent();
    }
    
    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        // 기본 제공되는 OAuth2UserService를 통해 소셜 사용자 정보 가져오기
        // OAuth2User oauth2User = new DefaultOAuth2UserService().loadUser(request);
        // // 소셜 로그인 제공자(Google 등)로부터 받은 사용자 정보에서 이메일과 이름 추출
        // String email = oauth2User.getAttribute("email");
        // String name = oauth2User.getAttribute("name");

        // // 사용자 이메일로 기존 회원 여부 조회
        // Users user = usersRepository.findByEmail(email)
        //     // 기존 회원이 없으면 새로 가입 (UUID로 user_id 생성)
        //     .orElseGet(() -> usersRepository.save(
        //         new Users(
        //             UUID.randomUUID().toString(),// user_id
        //             email,                       // email
        //             "social_login", //password 대체값
        //             name,                        // 사용자 이름
        //             LocalDateTime.now().toString(), // 생성 시간 저장 (String 형태로)
        //             new ArrayList<>(),             // 추가된 resumes 필드
        //             new ArrayList<>()             // 추가된 essay 필드
        //         )
        //     ));
        // // Spring Security가 인증된 사용자 정보로 사용할 객체 반환
        // return new DefaultOAuth2User(
        //     Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
        //     // OAuth2 제공자에서 받은 전체 사용자 속성 (Map)
        //     oauth2User.getAttributes(),
        //     // 사용자 식별 키 (username 역할)
        //     "email"
        // );
        return null;
    }

    
    // 회원 탈퇴 기능
    @Transactional
    public void deleteUserByEmail(String email) {
    Users user = usersRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("회원 없음"));
        // → cascade 설정에 따라 이력서도 함께 삭제
    usersRepository.delete(user);  
    }
}
