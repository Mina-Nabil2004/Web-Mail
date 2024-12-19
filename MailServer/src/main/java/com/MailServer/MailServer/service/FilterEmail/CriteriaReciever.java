package com.MailServer.MailServer.service.FilterEmail;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CriteriaReciever implements Criteria{
    private final String reciever;
    public CriteriaReciever(FilterDTO dto){
        this.reciever = dto.getReceiver();
    }
    public CriteriaReciever(String criteria){
        this.reciever = criteria;
    }
    @Override
    public List<Email> meetCriteria(List<Email> emails) {
        List<Email> matchingEmails = new ArrayList<>();
        for (Email email : emails) {
            List<String> emailReceivers = email.getReceivers();
            for (String receiver : emailReceivers) {
                if (Arrays.asList(emailReceivers).contains(receiver.trim())) {
                    matchingEmails.add(email);
                    break;
                }
            }
        }
        return matchingEmails;
    }
    public String get(){
        return this.reciever;
    }
}


