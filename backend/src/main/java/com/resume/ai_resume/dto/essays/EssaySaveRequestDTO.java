package com.resume.ai_resume.dto.essays;

import lombok.Data;

// 자기소개서 신규 생성할 때 클라이언트에게 요청하는 DTO

@Data
public class EssaySaveRequestDTO {
    private String rawText;
}
