package com.MailServer.MailServer.repository;

import com.MailServer.MailServer.service.Email.Email;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<Email,Long> {
}
