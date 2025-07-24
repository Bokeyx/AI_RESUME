package com.resume.ai_resume.dto.user;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersDTO {
    private String userId;
    private String email;
    private String password;
    private String name;
    private LocalDateTime createdAt;    
}

