//package com.MailServer.MailServer.service.FilterContact;
//
//import com.MailServer.MailServer.service.Contact.Contact;
//
//import java.util.ArrayList;
//
//public class CriteriaEmail implements CriteriaContact{
//    private String email;
//    public CriteriaEmail(ContactFilterDTO DTO){
//        this.email=DTO.getEmail();
//    }
//    @Override
//    public ArrayList<Contact> meetCriteria(ArrayList<Contact> contacts) {
//        ArrayList<Contact> emailContacts=new ArrayList<>();
//        for(Contact contact:contacts){
//            if(contact.getEmail().contains(this.email)){
//                emailContacts.add(contact);
//            }
//        }
//        return emailContacts;
//    }
//    public String get(){
//        return this.email;
//    }
//
//}
