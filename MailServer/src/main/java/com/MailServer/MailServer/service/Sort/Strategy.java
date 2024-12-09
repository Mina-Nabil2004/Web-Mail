package com.MailServer.MailServer.service.Sort;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;

public interface Strategy {
    public ArrayList<Email>doOperation(ArrayList<Email> emails,boolean Order);
}