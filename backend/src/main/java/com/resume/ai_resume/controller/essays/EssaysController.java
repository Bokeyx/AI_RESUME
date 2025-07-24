package com.resume.ai_resume.controller.essays;

import java.util.List;

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

import com.resume.ai_resume.dto.essays.EssayResponseDTO;
import com.resume.ai_resume.dto.essays.EssaySaveRequestDTO;
import com.resume.ai_resume.dto.essays.EssaysDTO;
import com.resume.ai_resume.service.essays.EssaysService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/essays")
@RequiredArgsConstructor
public class EssaysController {
    private final EssaysService essaysService;

    // 1. 자소서 저장/추가 (새로운 자소서)
    @PostMapping("/insert")
    public ResponseEntity<EssaySaveRequestDTO> setEssaysInsert(
        @AuthenticationPrincipal OAuth2User principal,
        @RequestBody EssaySaveRequestDTO dto) {
        
        essaysService.saveEssay(dto, principal.getAttribute("email"));

        return ResponseEntity.ok(dto);
    }
    
    // 2. 자소서 목록 조회(회원별)
    // @GetMapping("/list")
    // public ResponseEntity<List<EssayResponseDTO>> getEssaysList(
    //     @AuthenticationPrincipal OAuth2User principal ) {
    //     var essays = essaysService.getUserEssays(principal.getAttribute("email"));

    //     return ResponseEntity.ok(essays);
    // }
        @GetMapping("/{userId}")
    public ResponseEntity<List<EssaysDTO>> getEssaysByUserId(@PathVariable String userId) {
        List<EssaysDTO> essaysList = essaysService.getEssays(userId);
        return ResponseEntity.ok(essaysList);
    }
   
    // 3. 자소서 세부 조회
    @GetMapping("/view/{essay_id}")
    public ResponseEntity<EssayResponseDTO> getEssayDetail(
        @AuthenticationPrincipal OAuth2User principal,
        @PathVariable("essay_id") String essayId) {
        
        EssayResponseDTO essay = essaysService.getUserEssay(
            principal.getAttribute("email"),
            essayId
        );

        return ResponseEntity.ok(essay) ;
    }
    
    // 5. 자소서 삭제
    @DeleteMapping("/delete/{essay_id}")
    public ResponseEntity<Void> setEssayDelete(
        @AuthenticationPrincipal OAuth2User principal,
        @PathVariable("essay_id") String essayId){
        essaysService.setEssayDelete(principal.getAttribute("email"), essayId);

        return ResponseEntity.noContent().build();
    }
}
