package com.resume.ai_resume.service.essays;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.resume.ai_resume.dto.essays.EssayResponseDTO;
import com.resume.ai_resume.dto.essays.EssaySaveRequestDTO;
import com.resume.ai_resume.dto.essays.EssaysDTO;
import com.resume.ai_resume.model.Essays;
import com.resume.ai_resume.model.Users;
import com.resume.ai_resume.repository.essays.EssaysRepository;
import com.resume.ai_resume.repository.user.UsersRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EssaysService {
    private final EssaysRepository essaysRepository;
    private final UsersRepository usersRepository;

    public List<EssaysDTO> getEssays(String user_id) {
    List<Essays> essaysList = this.essaysRepository.findByUserUserId(user_id);

    return essaysList.stream()
            .map(EssaysDTO::new)  
            .collect(Collectors.toList());
}





    /**
     * 
     * 
     * 
     */




    // 1. 자소서 저장/추가 (새로운 자소서)
    //    -> essay_id, user, raw_test, submitted_at
    public void saveEssay(EssaySaveRequestDTO dto, String email){
        Users user = usersRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("해당 사용자 없음"));
        
        Essays essay = new Essays();
        essay.setEssayId(UUID.randomUUID().toString());
        essay.setUser(user);

        essay.setRawText(dto.getRawText());

        // flask를 통해 해당 컬럼 값 저장

        // 단어수, 키워드수, 글자수
        // essay.setWordCount();
        // essay.setKeywordsFound();

        // 점수, 피드백
        // essay.setPositivityScore();
        // essay.setFeedback();

        // 제출 날짜
        essay.setSubmittedAt(LocalDateTime.now());

        // 최종적으로 DB에 저장
        essaysRepository.save(essay);
    }

    // 2. 자소서 목록 조회(회원별)
    public List<EssayResponseDTO> getUserEssays(String userEmail){
        Users user = usersRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("사용자 없음"));

        return essaysRepository.findByUserUserId(user.getUserId())
            .stream()
            .map(essay -> new EssayResponseDTO(
                essay.getEssayId(),
                essay.getRawText(),
                essay.getPositivityScore(),
                essay.getFeedback(),
                essay.getSubmittedAt().toString()
            ))
            .toList();
    }
    
    // 3. 자소서 세부 조회
    public EssayResponseDTO getUserEssay(String userEmail, String essayId){
        Users user = usersRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("사용자 없음"));

        Essays essay = essaysRepository.findByEssayIdAndUserUserId(essayId, user.getUserId())
            .orElseThrow(() -> new RuntimeException("해당 이력서 없음"));

        return new EssayResponseDTO(
            essay.getEssayId(),
            essay.getRawText(),
            essay.getPositivityScore(),
            essay.getFeedback(),
            essay.getSubmittedAt().toString()
        );
    }

    // 4. 자소서 업데이트

    // 5. 자소서 삭제
    public void setEssayDelete(String userEmail, String essayId){
        Users user = usersRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("사용자 없음"));

        Essays essay = essaysRepository.findByEssayIdAndUserUserId(essayId, user.getUserId())
            .orElseThrow(() -> new RuntimeException("해당 이력서 없음"));

        // 삭제 처리
        essaysRepository.delete(essay);
    }
}