package com.resume.ai_resume.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;


@RestController
@AllArgsConstructor
@RequestMapping("/test")
public class TestController {

  @GetMapping("/spring_test")
  public ResponseEntity<String> getTest() {
      return ResponseEntity.ok("연결 성공");
  }
  
}
