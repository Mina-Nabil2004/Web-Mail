package com.MailServer.MailServer.service.FilterEmail;

public class CriteriaFactory {
    public Criteria getCriteria(FilterDTO dto){
        if(nameofCriteria==null){
            return null;
        }
        else if(nameofCriteria.equals("subject")){
            return new CriteriaSubject();
        }
        else if(nameofCriteria.equals("body")){
            return new CriteriaBody();
        }
        else if(nameofCriteria.equals("sender")){
            return new CriteriaSender();
        }
        else if(nameofCriteria.equals("receiver")){
            return new CriteriaReciever();
        }
        else if(nameofCriteria.equals("date")){
            return new CriteriaDate(ValueofCriteria);
        }
        else if (nameofCriteria.equals("and")){
            return new AndCriteria(new CriteriaSubject(ValueofCriteria),new CriteriaBody(ValueofCriteria),new CriteriaReciever(ValueofCriteria),new CriteriaDate(ValueofCriteria),new CriteriaSender(ValueofCriteria));
        }
        else{
            return null;
        }

    }

}
