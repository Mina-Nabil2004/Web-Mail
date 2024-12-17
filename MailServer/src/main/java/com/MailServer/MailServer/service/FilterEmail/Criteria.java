package com.MailServer.MailServer.service.FilterEmail;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;
import java.util.List;

public interface Criteria {
    public List<Email> meetCriteria(List<Email> emails);
    public String get();
}