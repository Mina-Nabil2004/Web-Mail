package com.MailServer.MailServer.service.Sort;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;
import java.util.Comparator;

public class SortDate implements Strategy{

    @Override
    public ArrayList<Email> doOperation(ArrayList<Email> emails, boolean Order) {
        if(Order){
            emails.sort(Comparator.comparing(Email::getDatetime));
        }
        else {
//            emails.sort(Comparator.comparing(Email::getdatetime).reversed());
        }
        return emails;
    }
}
