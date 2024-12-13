package com.MailServer.MailServer.service.FilterEmail;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;

public class CriteriaBody implements Criteria{
    private final String body;
    public CriteriaBody(FilterDTO dto){
        this.body = dto.getBody();
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
    public String get(){
        return this.body;
    }
}