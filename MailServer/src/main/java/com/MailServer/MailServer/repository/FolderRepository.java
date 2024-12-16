package com.MailServer.MailServer.repository;

import com.MailServer.MailServer.service.Folder.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FolderRepository extends JpaRepository <Folder,Long> {
    Folder findByUserUserIDAndName(Long userID, String sent);
    void deleteAllByUserUserID(Long userID);
}