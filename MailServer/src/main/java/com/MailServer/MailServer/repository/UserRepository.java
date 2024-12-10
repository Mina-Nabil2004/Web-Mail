package com.MailServer.MailServer.repository;

import com.MailServer.MailServer.service.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository <User,String> {
    User findByEmailAndPassword(String email, String password);
    User findByEmail(String email);
}
