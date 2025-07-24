package com.resume.ai_resume.dto.essays;

import java.time.LocalDateTime;

import com.resume.ai_resume.model.Essays;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EssaysDTO {
    private String essay_id;
    private String user_id;

    private String raw_text;

    private float positivity_score;
    private String feedback;

    private LocalDateTime submitted_at;

    public EssaysDTO(Essays essays) {
    this.essay_id = essays.getEssayId();
    this.user_id = essays.getUser().getUserId();
    this.raw_text = essays.getRawText();
    this.positivity_score = essays.getPositivityScore();
    this.feedback = essays.getFeedback();
    this.submitted_at = essays.getSubmittedAt();
}

}