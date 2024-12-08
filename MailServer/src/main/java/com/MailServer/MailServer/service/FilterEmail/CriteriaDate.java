package com.MailServer.MailServer.service.FilterEmail;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;

public class CriteriaDate implements Criteria{
    private String date;
    public CriteriaDate(String date){
        this.date=date;
    }

    @Override
    public ArrayList<Email> meetCriteria(ArrayList<Email> emails) {
        ArrayList<Email> Date = new ArrayList<Email>();

        for(Email email:emails){
            if (email.getdatetime().contains(this.date)){
                Date.add(email);
            }
        }
        return Date;
    }
}
