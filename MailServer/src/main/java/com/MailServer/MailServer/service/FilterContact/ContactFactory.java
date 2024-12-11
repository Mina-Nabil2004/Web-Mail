package com.MailServer.MailServer.service.FilterContact;

public class ContactFactory {
    public CriteriaContact getCriteria(String nameofcriteria,String Valueofcriteria){
        if(nameofcriteria==null){
            return null;
        }
//        else if(nameofcriteria.equals("email")){
//            return new CriteriaEmail(Valueofcriteria);
//        }
        else if(nameofcriteria.equals("name")){
            return new CriteriaName(Valueofcriteria);
        }
//        else if(nameofcriteria.equals("show all")){
//            return new OrCriteria(new CriteriaEmail(Valueofcriteria),new CriteriaName(Valueofcriteria));
//        }
        return null;
    }
}
