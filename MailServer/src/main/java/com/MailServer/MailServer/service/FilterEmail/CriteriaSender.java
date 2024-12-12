package com.MailServer.MailServer.service.FilterEmail;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;

public class CriteriaSender implements Criteria{
    private final String sender;
    public CriteriaSender(String sender){
        this.sender=sender;
    }
    @Override
    public ArrayList<Email> meetCriteria(ArrayList<Email> emails) {
        ArrayList<Email> sender = new ArrayList<Email>();
        for (Email email : emails) {
            if (email.getSender().contains(this.sender)) {
                sender.add(email);
            }
        }
        return sender;
    }
}
