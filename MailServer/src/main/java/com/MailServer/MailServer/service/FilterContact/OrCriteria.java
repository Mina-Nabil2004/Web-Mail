package com.MailServer.MailServer.service.FilterContact;

import com.MailServer.MailServer.service.Contact.Contact;

import java.util.ArrayList;
import java.util.List;

public class OrCriteria implements CriteriaContact{
//        private final CriteriaContact criteria1;
        private final CriteriaContact criteria2;


        public OrCriteria(ContactFilterDTO DTO){
//            this.criteria1=new CriteriaEmail(DTO);
            this.criteria2=new CriteriaName(DTO);
        }


    @Override
    public List<Contact> meetCriteria(List<Contact> contacts) {
        List<Contact> finalizer = new ArrayList<Contact>();
//        if (this.criteria1.get() != null) {
//            finalizer = this.criteria1.meetCriteria(finalizer);
//        }
        if (this.criteria2.get() != null) {
            finalizer = this.criteria2.meetCriteria(finalizer);
        }
        return finalizer;
    }
    public String get(){
        return null;
    }

}
