package com.MailServer.MailServer.repository;

import com.MailServer.MailServer.service.Email.Email;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository<Email,Long> {
    Page<Email> findByFolderFolderID(Long folderID, Pageable pageable);
    Page<Email> findByUserUserID(Long userID, Pageable pageable);
}
