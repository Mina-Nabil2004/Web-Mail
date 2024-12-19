package com.MailServer.MailServer.service.FilterContact;

import com.MailServer.MailServer.service.FilterEmail.*;
import com.MailServer.MailServer.service.FilterEmail.OrCriteria;

public class ContactFactory {
    public static CriteriaContact getCriteria(ContactFilterDTO DTO, String criteria){
//        if(criteria==null){
//            return null;
//      }
////        else if(criteria.equals("email")){
////            return new CriteriaEmail(DTO);
////        }
//        else if(criteria.equals("name")){
//            return new CriteriaName(DTO);
//        }
//        else if(criteria.equals("show all")){
//            return new OrCriteria(DTO);
//        }
//        return null;

        return switch (criteria) {
//        else if(criteria.equals("receiver")){
//            return new CriteriaReciever(dto);
//        }
            case "datetime" -> new CriteriaDate(dto);
            case "and" -> new AndCriteria(dto);
            default -> new OrCriteria(criteria);
        }
    }

}
