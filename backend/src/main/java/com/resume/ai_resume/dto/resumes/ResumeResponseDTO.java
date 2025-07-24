package com.resume.ai_resume.dto.resumes;

import lombok.Data;

@Data

public class ResumeResponseDTO {
    private String resumeId;
    private String rawText;
    private String predictedCategory;
    private String submittedAt;

    public ResumeResponseDTO(String resumeId, String rawText, String predictedCategory, String submittedAt) {
        this.resumeId = resumeId;
        this.rawText = rawText;
        this.predictedCategory = predictedCategory;
        this.submittedAt = submittedAt;
    }
}
