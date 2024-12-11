package com.MailServer.MailServer.repository;

import com.MailServer.MailServer.service.Contact.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository <Contact,Long> {
}