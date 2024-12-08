package com.MailServer.MailServer.service.FilterContact;

import com.MailServer.MailServer.service.Contact;

import java.util.ArrayList;

public class CriteriaEmail implements CriteriaContact{
    private String email;
    public CriteriaEmail(String email){
        this.email=email;
    }

    @Override
    public ArrayList<Contact> meetCriteria(ArrayList<Contact> contacts) {
        ArrayList<Contact> emailContacts=new ArrayList<>();
        for(Contact contact:contacts){
            if(contact.getEmail().contains(this.email)){
                emailContacts.add(contact);
            }
        }
        return emailContacts;
    }
}
