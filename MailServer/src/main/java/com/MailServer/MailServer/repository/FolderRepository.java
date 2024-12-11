package com.MailServer.MailServer.repository;

import com.MailServer.MailServer.service.Folder.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FolderRepository extends JpaRepository <Folder,Long> {
    List<Folder> findByUserUserID(Long userID);
    Folder findByUserUserIDAndName(Long userID, String sent);
}