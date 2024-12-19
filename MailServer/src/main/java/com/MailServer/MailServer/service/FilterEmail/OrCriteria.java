package com.MailServer.MailServer.service.FilterEmail;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;
import java.util.List;

public class OrCriteria implements Criteria{
    private Criteria criteria1;
    private Criteria criteria2;
    private Criteria criteria3;
    private Criteria criteria4;
    private Criteria criteria5;
    private Criteria criteria6;

    public OrCriteria(String criteria) {
        this.criteria1 = new CriteriaSender(criteria);
        this.criteria2 = new CriteriaSubject(criteria);
        this.criteria3 = new CriteriaDate(criteria);
        this.criteria4 = new CriteriaBody(criteria);
        this.criteria5 = new Criteriapriority(criteria);
        this.criteria6 = new CriteriaReciever(criteria);
    }

    @Override
    public List<Email> meetCriteria(List<Email> emails) {
        List<Email> criteriaFilters = new ArrayList<>();
        if(this.criteria1.get() != null){
            List<Email> criteria1filters =this.criteria1.meetCriteria(emails);
            for (Email email:criteria1filters){
                if(!criteriaFilters.contains(email)){
                    criteriaFilters.add(email);
                }
            }
        }
        if(this.criteria2.get()!= null){
            List<Email> criteria2filters =this.criteria2.meetCriteria(emails);
            for (Email email:criteria2filters){
                if(!criteriaFilters.contains(email)){
                    criteriaFilters.add(email);
                }
            }
        }
        if(this.criteria3.get()!=null){
            List<Email> criteria3filters =this.criteria3.meetCriteria(emails);
            for (Email email:criteria3filters){
                if(!criteriaFilters.contains(email)){
                    criteriaFilters.add(email);
                }
            }
        }
        if(this.criteria4.get()!=null){
            List<Email> criteria4filters =this.criteria4.meetCriteria(emails);
            for (Email email:criteria4filters){
                if(!criteriaFilters.contains(email)){
                    criteriaFilters.add(email);
                }
            }
        }
        if(this.criteria5.get()!=null){
            List<Email> criteria5filters =this.criteria5.meetCriteria(emails);
            for (Email email:criteria5filters){
                if(!criteriaFilters.contains(email)){
                    criteriaFilters.add(email);
                }
            }
        }
        if(this.criteria6.get()!=null){
            List<Email> criteria6filters =this.criteria5.meetCriteria(emails);
            for (Email email:criteria6filters){
                if(!criteriaFilters.contains(email)){
                    criteriaFilters.add(email);
                }
            }
        }
        return criteriaFilters;
    }
    @Override
    public String get() {
        return null;
    }
}
