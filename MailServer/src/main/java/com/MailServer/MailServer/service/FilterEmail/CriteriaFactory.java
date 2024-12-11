//package com.MailServer.MailServer.service.FilterEmail;
//
//public class CriteriaFactory {
//    public Criteria getCriteria(String nameofCriteria,String ValueofCriteria){
//        if(nameofCriteria==null){
//            return null;
//        }
//        else if(nameofCriteria.equals("subject")){
//            return new CriteriaSubject(ValueofCriteria);
//        }
//        else if(nameofCriteria.equals("body")){
//            return new CriteriaBody(ValueofCriteria);
//        }
//        else if(nameofCriteria.equals("sender")){
//            return new CriteriaSender(ValueofCriteria);
//        }
//        else if(nameofCriteria.equals("receiver")){
//            return new CriteriaReciever(ValueofCriteria);
//        }
//        else if(nameofCriteria.equals("date")){
//            return new CriteriaDate(ValueofCriteria);
//        }
//        else if (nameofCriteria.equals("show all")){
//            return new OrCriteria(new CriteriaSubject(ValueofCriteria),new CriteriaBody(ValueofCriteria),new CriteriaReciever(ValueofCriteria),new CriteriaDate(ValueofCriteria),new CriteriaSender(ValueofCriteria));
//        }
//        else{
//            return null;
//        }
//
//    }
//
//}
