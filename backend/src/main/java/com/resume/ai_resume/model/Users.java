package com.resume.ai_resume.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Builder
public class Users {
    @Id
    @Column(name="user_id")
    private String userId;

    @Column(nullable=false)
    private String email;

    @Column(name="password_hash", nullable=false)
    private String password;

    private String name;
    
    @Column(nullable=false)
    private LocalDateTime createdAt;

    
    @OneToMany(mappedBy="user")
    private List<Essays> essays = new ArrayList<>();
    
    @OneToMany(mappedBy="user", cascade = CascadeType.ALL, orphanRemoval=true)
    private List<Resumes> resumes = new ArrayList<>();
}
