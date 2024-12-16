package com.MailServer.MailServer.service.Sort;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;
import java.util.List;

public interface Strategy {
    public List<Email> doOperation(List<Email> emails, boolean Order);
}