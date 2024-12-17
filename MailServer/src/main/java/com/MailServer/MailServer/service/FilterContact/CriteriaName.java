package com.MailServer.MailServer.service.FilterContact;

import com.MailServer.MailServer.service.Contact.Contact;

import java.util.ArrayList;
import java.util.List;

public class CriteriaName implements CriteriaContact{
    private String name;
    public CriteriaName(ContactFilterDTO DTO){
        this.name=DTO.getName();
    }

    @Override
    public List<Contact> meetCriteria(List<Contact> contacts) {
        List<Contact> nameContacts=new ArrayList<>();
        for(Contact contact:contacts){
            if(contact.getName().contains(this.name)){
                nameContacts.add(contact);
            }
        }
        return nameContacts;
    }
    public String get(){
        return this.name;
    }

}
