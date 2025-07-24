package com.resume.ai_resume.controller.user;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.resume.ai_resume.dto.user.UsersDTO;
import com.resume.ai_resume.service.user.UsersService;

import lombok.RequiredArgsConstructor;



@RestController
@RequiredArgsConstructor
public class UserController {
  private final UsersService usersService;

  @PostMapping("/login")
  public ResponseEntity<Void> login(@RequestBody UsersDTO dto) {
    boolean success =usersService.login(dto.getEmail(), dto.getPassword());
    
    if(success) {
      return ResponseEntity.ok().build();
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
  }
  
  @PostMapping("/join")
  public ResponseEntity<?> registerUser(@RequestBody UsersDTO userDto) {
    System.out.println(userDto);
    usersService.registerUser(userDto);
    return ResponseEntity.ok().build();
  }
}
