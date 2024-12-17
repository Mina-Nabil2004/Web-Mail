package com.MailServer.MailServer.service.FilterEmail;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;
import java.util.List;

public class CriteriaSender implements Criteria{
    private final String sender;
    public CriteriaSender(FilterDTO dto){
        this.sender= dto.getSender();
    }
    public CriteriaSender(String criteria){
        this.sender= criteria;
    }
    @Override
    public List<Email> meetCriteria(List<Email> emails) {
        List<Email> sender = new ArrayList<Email>();
        for (Email email : emails) {
            if (email.getSender().contains(this.sender)) {
                sender.add(email);
            }
        }
        return sender;
    }
    public String get(){
        return this.sender;
    }
}
