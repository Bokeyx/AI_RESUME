package com.resume.ai_resume.repository.resumes;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.resume.ai_resume.model.Resumes;

@Repository
public interface ResumesRepository extends JpaRepository<Resumes, Object> {
    // 사용자 id로 목록 조회
    List<Resumes> findByUserUserId(String user_id);
    // 본인만 삭제 기능
    void deleteByResumeIdAndUserUserId(String resume_id, String user_id);
    // 본인만 조회 가능
    Optional<Resumes> findByResumeIdAndUserUserId(String resumeId, String user_id);
    
}
