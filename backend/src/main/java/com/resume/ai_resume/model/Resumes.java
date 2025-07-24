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
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Table(name="resumes")

public class Resumes {
    @Id
    @Column(name="resume_id")
    private String resumeId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="resume_user", referencedColumnName="user_id")
    private Users user;

    private String rawText;
    private String predictedCategory;

    @Column(nullable=false)
    private LocalDateTime submittedAt;

}
