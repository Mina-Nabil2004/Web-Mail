package com.MailServer.MailServer.service.FilterEmail;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;

public class OrCriteria implements Criteria{
    private Criteria criteria1;
    private Criteria criteria2;
    private Criteria criteria3;
    private Criteria criteria4;
    private Criteria criteria5;

    public OrCriteria(String criteria) {
        this.criteria1 = new CriteriaSender(criteria);
        this.criteria2 = new CriteriaSubject(criteria);
        this.criteria3 = new CriteriaDate(criteria);
        this.criteria4 = new CriteriaBody(criteria);
//        this.criteria5 = new ;
    }

    @Override
    public ArrayList<Email> meetCriteria(ArrayList<Email> emails) {
        ArrayList<Email> criteriaFilters = new ArrayList<>();
        if(this.criteria1.get() != null){
            ArrayList<Email> criteria1filters =this.criteria1.meetCriteria(emails);
            for (Email email:criteria1filters){
                if(!criteriaFilters.contains(email)){
                    criteriaFilters.add(email);
                }
            }
        }
        if(this.criteria2.get()!= null){
            ArrayList<Email> criteria2filters =this.criteria2.meetCriteria(emails);
            for (Email email:criteria2filters){
                if(!criteriaFilters.contains(email)){
                    criteriaFilters.add(email);
                }
            }
        }
        if(this.criteria3.get()!=null){
            ArrayList<Email> criteria3filters =this.criteria3.meetCriteria(emails);
            for (Email email:criteria3filters){
                if(!criteriaFilters.contains(email)){
                    criteriaFilters.add(email);
                }
            }
        }
        if(this.criteria4.get()!=null){
            ArrayList<Email> criteria4filters =this.criteria4.meetCriteria(emails);
            for (Email email:criteria4filters){
                if(!criteriaFilters.contains(email)){
                    criteriaFilters.add(email);
                }
            }
        }
//        if(this.criteria5.get()!=null){
//            ArrayList<Email> criteria5filters =this.criteria5.meetCriteria(emails);
//            for (Email email:criteria5filters){
//                if(!criteriaFilters.contains(email)){
//                    criteriaFilters.add(email);
//                }
//            }
//        }
        return criteriaFilters;
    }

    @Override
    public String get() {
        return null;
    }
}
