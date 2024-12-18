package com.MailServer.MailServer.service.FilterEmail;

public class CriteriaFactory {
    public static Criteria getCriteria(FilterDTO dto, String criteria){
        return switch (criteria) {
            case "subject" -> new CriteriaSubject(dto);
            case "body" -> new CriteriaBody(dto);
            case "sender" -> new CriteriaSender(dto);

//        else if(criteria.equals("receiver")){
//            return new CriteriaReciever(dto);
//        }
            case "datetime" -> new CriteriaDate(dto);
            case "and" -> new AndCriteria(dto);
            default -> new OrCriteria(criteria);
        };
    }
}
