package com.MailServer.MailServer.service.FilterContact;

import com.MailServer.MailServer.service.Contact.Contact;

import java.util.ArrayList;

public class OrCriteria implements CriteriaContact{
        private CriteriaContact criteria1;
        private CriteriaContact criteria2;

        public OrCriteria(CriteriaContact criteria1,CriteriaContact criteria2){
            this.criteria1=criteria1;
            this.criteria2=criteria2;
        }

    @Override
    public ArrayList<Contact> meetCriteria(ArrayList<Contact> contacts) {
        ArrayList<Contact> criteria1contacts=this.criteria1.meetCriteria(contacts);
        ArrayList<Contact> criteria2contacts=this.criteria2.meetCriteria(contacts);

        for(Contact contact : criteria2contacts){
            if(!criteria1contacts.contains(contact)){
                criteria1contacts.add(contact);
            }
        }
        return criteria1contacts;
    }
}
