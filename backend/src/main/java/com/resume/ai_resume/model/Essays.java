package com.resume.ai_resume.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name="essays")
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Builder
public class Essays {
    @Id
    @Column(name="essay_id")
    private String essayId;
    // private String essay_user;
    
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="essay_user", referencedColumnName="user_id")
    private Users user;
    private String rawText;
    private Integer sentenceCount;
    private Integer wordCount;
    private Integer charCount;
    private String keywordsFound;
    private float positivityScore;
    private String feedback;

    @Column(nullable=false)
    private LocalDateTime submittedAt;
}
