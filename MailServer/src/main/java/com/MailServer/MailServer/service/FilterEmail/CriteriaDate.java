package com.MailServer.MailServer.service.FilterEmail;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;

public class CriteriaDate implements Criteria{
    private final String date;
    public CriteriaDate(FilterDTO dto){
        this.date=dto.getDatetime();
    }
    public CriteriaDate(String criteria){
        this.date = criteria;
    }
    @Override
    public ArrayList<Email> meetCriteria(ArrayList<Email> emails) {
        ArrayList<Email> Date = new ArrayList<Email>();

        for(Email email:emails){
            if (email.getDatetime().contains(this.date)){
                Date.add(email);
            }
        }
        return Date;
    }
    public String get(){
        return this.date;
    }
}
