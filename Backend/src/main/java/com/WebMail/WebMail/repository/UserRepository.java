package com.Webmail.Webmail.repository;

import com.Webmail.Webmail.service.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository <User,Long> {
    User findByEmailOrUsername(String email, String username);
}
