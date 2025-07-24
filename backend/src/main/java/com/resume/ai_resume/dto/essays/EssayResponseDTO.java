package com.resume.ai_resume.dto.essays;

import lombok.Data;

// 자기소개서 상세보기 정보 응답 DTO

@Data
public class EssayResponseDTO {
    private String essayId;

    private String rawText;

    private float positivityScore;
    private String feedback;

    private String submittedAt;

    public EssayResponseDTO(String essay_id, String raw_text, float positivity_score, String feedback, String submitted_at){
        this.essayId = essay_id;
        this.rawText = raw_text;
        this.positivityScore = positivity_score;
        this.feedback = feedback;
        this.submittedAt = submitted_at;
    }
}
