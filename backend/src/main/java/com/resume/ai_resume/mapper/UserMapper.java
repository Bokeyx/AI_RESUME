package com.resume.ai_resume.mapper;

import org.springframework.stereotype.Component;

import com.resume.ai_resume.dto.user.UsersDTO;
import com.resume.ai_resume.model.Users;

@Component
public class UserMapper {
  public Users toEntity(UsersDTO dto) {
    return Users.builder()
        .userId(dto.getUserId())
        .name(dto.getName())
        .email(dto.getEmail())
        .password(dto.getPassword())
        .createdAt(dto.getCreatedAt())
        .build();
  }   
}
