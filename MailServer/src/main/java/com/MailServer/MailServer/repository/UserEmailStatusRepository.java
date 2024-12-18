package com.MailServer.MailServer.repository;

import com.MailServer.MailServer.service.Email.Email;
import com.MailServer.MailServer.service.Email.UserEmailStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface UserEmailStatusRepository extends JpaRepository<UserEmailStatus,Long>  {
    UserEmailStatus findByEmail(Email email);
}
