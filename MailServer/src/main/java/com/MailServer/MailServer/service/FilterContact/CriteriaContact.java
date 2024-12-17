package com.MailServer.MailServer.service.FilterContact;

import com.MailServer.MailServer.service.Contact.Contact;

import java.util.ArrayList;
import java.util.List;

public interface CriteriaContact {
    public List<Contact>meetCriteria(List<Contact> contacts);
    public String get();
}
