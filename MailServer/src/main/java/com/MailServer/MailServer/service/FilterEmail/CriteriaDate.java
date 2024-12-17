package com.MailServer.MailServer.service.FilterEmail;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;
import java.util.List;

public class CriteriaDate implements Criteria{
    private final String date;
    public CriteriaDate(FilterDTO dto){
        this.date=dto.getDatetime();
    }
    public CriteriaDate(String criteria){
        this.date = criteria;
    }
    @Override
    public List<Email> meetCriteria(List<Email> emails) {
        List<Email> Date = new ArrayList<Email>();

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
