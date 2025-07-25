package com.resume.ai_resume.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.resume.ai_resume.model.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, String>{
    Optional<Users> findByEmail(String email);

    Optional<Users> findByEmailAndPassword(String email, String password);


}
