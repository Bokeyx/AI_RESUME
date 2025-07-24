package com.resume.ai_resume.repository.essays;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.resume.ai_resume.model.Essays;

@Repository
public interface EssaysRepository extends JpaRepository<Essays, String>{
    // 사용자 id로 목록 조회
    List<Essays> findByUserUserId(String user_id);

    // 사용자 id, 에세이 id로 상세 조회
    Optional<Essays> findByEssayIdAndUserUserId(String essayId, String user_id);

    // 본인만 삭제 가능
    void deleteByEssayIdAndUserUserId(String essay_id, String user_id);


}
