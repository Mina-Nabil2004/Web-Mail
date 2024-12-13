package com.MailServer.MailServer.service.FilterContact;

import com.MailServer.MailServer.service.Contact.Contact;

import java.util.ArrayList;

public class OrCriteria implements CriteriaContact{
        private final CriteriaContact criteria1;
        private final CriteriaContact criteria2;


        public OrCriteria(ContactFilterDTO DTO){
            this.criteria1=new CriteriaEmail(DTO);
            this.criteria2=new CriteriaName(DTO);
        }

    public OrCriteria(CriteriaEmail criteriaEmail, CriteriaName criteriaName) {

    }

    @Override
    public ArrayList<Contact> meetCriteria(ArrayList<Contact> contacts) {

        ArrayList<Contact> final =new ArrayList<>();
//        ArrayList<Contact> criteria1contacts=this.criteria1.meetCriteria(contacts);
//        ArrayList<Contact> criteria2contacts=this.criteria2.meetCriteria(contacts);
        if(criteria1!=null){
            final.add(criteria1);
        }
        if(criteria2!=null){
            final.add(criteria1);
        }

//        for(Contact contact : criteria2contacts){
//            if(!criteria1contacts.contains(contact)){
//                criteria1contacts.add(contact);
//            }
//        }
//        return criteria1contacts;
    }
}
