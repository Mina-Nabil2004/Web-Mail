package com.MailServer.MailServer.repository;

import com.MailServer.MailServer.service.Email.Email;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;

public interface EmailRepository extends JpaRepository<Email,Long> {
    Page<Email> findByFolderFolderID(Long folderID, Pageable pageable);
    ArrayList<Email> findByFolderFolderID(Long folderID);
    Page<Email> findByUserUserID(Long userID, Pageable pageable);
    void deleteAllByFolderFolderID(Long folderID);
    void deleteAllByUserUserID(Long userID);
}
