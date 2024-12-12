package com.MailServer.MailServer.repository;

import com.MailServer.MailServer.service.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface UserRepository extends JpaRepository <User,Long> {
    User findByEmail(String email);
}
