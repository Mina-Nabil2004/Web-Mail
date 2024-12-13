package com.MailServer.MailServer.service.FilterEmail;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;

public interface Criteria {
    public ArrayList<Email> meetCriteria(ArrayList<Email> emails);
    public String get();
}