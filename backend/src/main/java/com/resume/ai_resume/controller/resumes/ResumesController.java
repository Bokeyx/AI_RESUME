package com.resume.ai_resume.controller.resumes;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.resume.ai_resume.dto.resumes.ResumeResponseDTO;
import com.resume.ai_resume.dto.resumes.ResumeSaveRequestDTO;
import com.resume.ai_resume.service.resumes.ResumesService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/resumes")
@RequiredArgsConstructor
public class ResumesController {
    private final ResumesService resumesService;

    // 이력서 저장
    @PostMapping(path="/insert")
    public ResponseEntity<?> saveResume(@AuthenticationPrincipal OAuth2User principal,
                                        @RequestBody ResumeSaveRequestDTO dto) {
       
        resumesService.saveResume(dto, principal.getAttribute("email"));
        return ResponseEntity.ok("이력서 저장 완료");
    }
    // 이력서 목록 조회
    @GetMapping(path="/list")
    public ResponseEntity<?> getMyResumes(@AuthenticationPrincipal OAuth2User principal) {
        var resumes = resumesService.getUserResumes(principal.getAttribute("email"));
        return ResponseEntity.ok(resumes);
    }

    // 이력서 상세 조회
    @GetMapping("/view/{resumeId}")
    public ResponseEntity<ResumeResponseDTO> getResumeDetail(
        @AuthenticationPrincipal OAuth2User principal,
        @PathVariable String resumeId) {
    
    String email = principal.getAttribute("email");
    ResumeResponseDTO dto = resumesService.getResumesDetail(resumeId, email);
    return ResponseEntity.ok(dto);
    }
    
    // 이력서 삭제
    @DeleteMapping("/delete/{resumeId}")
    public ResponseEntity<?> deleteResume(@AuthenticationPrincipal OAuth2User principal,
                                          @PathVariable String resumeId) {
        resumesService.deleteResume(resumeId, principal.getAttribute("email"));
        return ResponseEntity.ok("이력서 삭제 완료");
    }

    // <?> 를 쓰는 이유는 보통 return값이 없을때 주로 사용함

    
    
}
