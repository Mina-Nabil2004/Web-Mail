package com.MailServer.MailServer.repository;

import com.MailServer.MailServer.service.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepository extends JpaRepository <Folder,Long> {
}