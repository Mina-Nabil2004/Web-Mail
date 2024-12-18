package com.MailServer.MailServer.repository;

import com.MailServer.MailServer.service.Email.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepository extends JpaRepository<Attachment,Long>  {
}
