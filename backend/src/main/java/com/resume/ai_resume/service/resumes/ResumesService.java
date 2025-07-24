package com.resume.ai_resume.service.resumes;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.resume.ai_resume.dto.resumes.ResumeResponseDTO;
import com.resume.ai_resume.dto.resumes.ResumeSaveRequestDTO;
import com.resume.ai_resume.model.Resumes;
import com.resume.ai_resume.model.Users;
import com.resume.ai_resume.repository.resumes.ResumesRepository;
import com.resume.ai_resume.repository.user.UsersRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class ResumesService {
    private final ResumesRepository resumesRepository;
    private final UsersRepository usersRepository;

    // [1] 이력서 저장 메서드
    // 사용자의 이메일과 저장할 이력서 내용을 받아 DB에 저장합니다.
    public void saveResume(ResumeSaveRequestDTO dto, String email) {
        
        // 사용자의 이메일로 Users 엔티티를 찾습니다.
        // 이메일이 DB에 없으면 예외를 발생시킵니다.
        Users user = usersRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("사용자 없음"));
        // 새 이력서 객체 생성 후, 필요한 데이터 설정
        Resumes resume = new Resumes();
        // 이력서의 고유 ID 생성 (UUID = 중복 없는 랜덤 문자열)
        resume.setResumeId(UUID.randomUUID().toString());
        // 이력서 주인인 사용자 연결
        resume.setUser(user);
        // 이력서 본문 텍스트 설정 (DTO로부터 전달받은 내용)
        resume.setRawText(dto.getRawText());
        // 예측된 이력서 카테고리 (예: '개발자', '디자이너' 등)
        resume.setPredictedCategory(dto.getPredictedCategory());
        // 현재 시간을 제출 시간으로 설정
        resume.setSubmittedAt(LocalDateTime.now());
        // 최종적으로 DB에 저장
        resumesRepository.save(resume);

        /*
         * 🔍 왜 new Resumes()로 직접 정의하나요?
         * - DTO는 DB와 무관한 단순 데이터 전달 객체이기 때문입니다.
         * - DTO → Entity 로 직접 매핑해야 DB 저장이 가능합니다.
         */
    }

    // 이력서내역 삭제
    @Transactional
    public void deleteResume(String resumeId, String userEmail) {
        Users user = usersRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("사용자 없음"));

        resumesRepository.deleteByResumeIdAndUserUserId(resumeId, user.getUserId());
    }


    // 로그인된 사용자의 이력서 목록 조회
    public List<ResumeResponseDTO> getUserResumes(String userEmail) {
        Users user = usersRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("사용자 없음"));

        return resumesRepository.findByUserUserId(user.getUserId())
            .stream()
            .map(resume -> new ResumeResponseDTO(
                resume.getResumeId(),
                resume.getRawText(),
                resume.getPredictedCategory(),
                resume.getSubmittedAt().toString()
            ))
            .toList();

    }

    // 이력서의 상세조회
    public ResumeResponseDTO getResumesDetail(String resumeId, String userEmail) {
        Users user = usersRepository.findByEmail(userEmail)
        .orElseThrow(() -> new RuntimeException("사용자 없음"));

        Resumes resumes = resumesRepository.findByResumeIdAndUserUserId(resumeId, user.getUserId())
        .orElseThrow(() -> new RuntimeException("이력서를 찾을 수 없습니다."));

        return new ResumeResponseDTO(
            resumes.getResumeId(), 
            resumes.getRawText(),
            resumes.getPredictedCategory(),
            resumes.getSubmittedAt().toString()
            );
    }



}
