package com.MailServer.MailServer.service.Sort;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;
import java.util.Comparator;

public class SortSubject implements Strategy{

    @Override
    public ArrayList<Email> doOperation(ArrayList<Email> emails, boolean Order) {
        if(Order) {
            emails.sort(Comparator.comparing(Email::getSubject));
        }
        else{
            emails.sort(Comparator.comparing(Email::getSubject).reversed());
        }
        return emails;
      }
    }


