package com.MailServer.MailServer.repository;

import com.MailServer.MailServer.service.Contact.Contact;
import com.MailServer.MailServer.service.Email.Email;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface ContactRepository extends JpaRepository <Contact,Long> {
    ArrayList<Contact> findByUserUserID(Long userID);
}