//package com.MailServer.MailServer.service.FilterEmail;
//
//import com.MailServer.MailServer.service.Email.Email;
//
//import java.util.ArrayList;
//
//public class CriteriaReciever implements Criteria{
//    private String reciever;
//    public CriteriaReciever(String reciever){
//        this.reciever=reciever;
//    }
//
//    @Override
//    public ArrayList<Email> meetCriteria(ArrayList<Email> emails) {
//        ArrayList<Email> recievers = new ArrayList<Email>();
//        for(Email email:emails){
//            if(email.getreceiver().equals(this.reciever)){
//                recievers.add(email);
//            }
//        }
//        return recievers;
//    }
//}
