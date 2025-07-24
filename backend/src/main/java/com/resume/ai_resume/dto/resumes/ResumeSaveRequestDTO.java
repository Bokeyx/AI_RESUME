package com.resume.ai_resume.dto.resumes;

import lombok.Data;

@Data

public class ResumeSaveRequestDTO {
    private String rawText;
    private String predictedCategory;
}
