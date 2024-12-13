//package com.MailServer.MailServer.service.FilterEmail;
//
//import com.MailServer.MailServer.service.Email.Email;
//
//import java.util.ArrayList;
//
//public class OrCriteria implements Criteria{
//    private Criteria criteria1;
//    private Criteria criteria2;
//    private Criteria criteria3;
//    private Criteria criteria4;
//    private Criteria criteria5;
//
//    public OrCriteria(Criteria criteria1, Criteria criteria2, Criteria criteria3, Criteria criteria4, Criteria criteria5) {
//        this.criteria1 = criteria1;
//        this.criteria2 = criteria2;
//        this.criteria3 = criteria3;
//        this.criteria4 = criteria4;
//        this.criteria5 = criteria5;
//    }
//    public OrCriteria(Criteria criteria1, Criteria criteria2, Criteria criteria3, Criteria criteria4) {
//        this.criteria1 = criteria1;
//        this.criteria2 = criteria2;
//        this.criteria3 = criteria3;
//        this.criteria4 = criteria4;
//    }
//    public OrCriteria(Criteria criteria1, Criteria criteria2, Criteria criteria3) {
//        this.criteria1 = criteria1;
//        this.criteria2 = criteria2;
//        this.criteria3 = criteria3;
//    }
//    public OrCriteria(Criteria criteria1, Criteria criteria2) {
//        this.criteria1 = criteria1;
//        this.criteria2 = criteria2;
//    }
//
//    @Override
//    public ArrayList<Email> meetCriteria(ArrayList<Email> emails) {
//        ArrayList<Email> criteria1filters =this.criteria1.meetCriteria(emails);
//        ArrayList<Email> criteria2filters =this.criteria2.meetCriteria(emails);
//
//        for(Email email:criteria2filters){
//            if(!criteria1filters.contains(email)){
//                criteria1filters.add(email);
//            }
//        }
//        if(this.criteria3!=null){
//            ArrayList<Email> criteria3filters =this.criteria3.meetCriteria(emails);
//            for (Email email:criteria3filters){
//                if(!criteria1filters.contains(email)){
//                    criteria1filters.add(email);
//                }
//            }
//        }
//        if(this.criteria4!=null){
//            ArrayList<Email> criteria4filters =this.criteria4.meetCriteria(emails);
//            for (Email email:criteria4filters){
//                if(!criteria1filters.contains(email)){
//                    criteria1filters.add(email);
//                }
//            }
//        }
//        if(this.criteria5!=null){
//            ArrayList<Email> criteria5filters =this.criteria5.meetCriteria(emails);
//            for (Email email:criteria5filters){
//                if(!criteria1filters.contains(email)){
//                    criteria1filters.add(email);
//                }
//            }
//        }
//        return criteria1filters;
//    }
//}
