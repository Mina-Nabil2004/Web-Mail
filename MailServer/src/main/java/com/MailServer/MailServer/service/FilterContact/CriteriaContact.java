package com.MailServer.MailServer.service.FilterContact;

import com.MailServer.MailServer.service.Contact;

import java.util.ArrayList;

public interface CriteriaContact {
    public ArrayList<Contact>meetCriteria(ArrayList<Contact> contacts);
}
