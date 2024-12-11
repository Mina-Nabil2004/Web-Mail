//package com.MailServer.MailServer.service.FilterContact;
//
//import com.MailServer.MailServer.service.Contact.Contact;
//
//import java.util.ArrayList;
//
//public class CriteriaName implements CriteriaContact{
//    private String name;
//    public CriteriaName(String name){
//        this.name=name;
//    }
//
//    @Override
//    public ArrayList<Contact> meetCriteria(ArrayList<Contact> contacts) {
//        ArrayList<Contact> nemeContacts=new ArrayList<>();
//        for(Contact contact:contacts){
//            if(contact.getName().contains(this.name)){
//                nemeContacts.add(contact);
//            }
//        }
//        return nemeContacts;
//    }
//
//}
