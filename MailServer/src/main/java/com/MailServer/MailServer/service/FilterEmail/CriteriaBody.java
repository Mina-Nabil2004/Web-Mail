package com.MailServer.MailServer.service.FilterEmail;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;

public class CriteriaBody implements  Criteria{
    private String body;
    public CriteriaBody(String body){
        this.body=body;
    }

    @Override
    public ArrayList<Email> meetCriteria(ArrayList<Email> emails) {
        ArrayList<Email> body = new ArrayList<Email>();
        for(Email email:emails){
            if(email.getBody().contains(this.body)){
                body.add(email);
            }
        }
        return body;
    }
}
