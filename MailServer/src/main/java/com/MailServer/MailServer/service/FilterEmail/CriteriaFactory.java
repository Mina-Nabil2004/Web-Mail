package com.MailServer.MailServer.service.FilterEmail;

public class CriteriaFactory {
    public static Criteria getCriteria(FilterDTO dto, String criteria){
        if(criteria==null){
            return null;
        }
        else if(criteria.equals("subject")){
            return new CriteriaSubject(dto);
        }
        else if(criteria.equals("body")){
            return new CriteriaBody(dto);
        }
        else if(criteria.equals("sender")){
            return new CriteriaSender(dto);
        }
//        else if(criteria.equals("receiver")){
//            return new CriteriaReciever(dto);
//        }
        else if(criteria.equals("datetime")){
            return new CriteriaDate(dto);
        }
        else if (criteria.equals("and")){
            return new AndCriteria(dto);
        }
        else{
            return null;
        }
    }
}
