package com.MailServer.MailServer.service.FilterEmail;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;

public class AndCriteria implements Criteria {
    private Criteria criteria1;
    private Criteria criteria2;
    private Criteria criteria3;
    private Criteria criteria4;
    private Criteria criteria5;

    public AndCriteria(Criteria criteria1, Criteria criteria2, Criteria criteria3, Criteria criteria4, Criteria criteria5) {
        this.criteria1 = criteria1;
        this.criteria2 = criteria2;
        this.criteria3 = criteria3;
        this.criteria4 = criteria4;
        this.criteria5 = criteria5;
    }
    public AndCriteria(Criteria criteria1, Criteria criteria2, Criteria criteria3, Criteria criteria4) {
        this.criteria1 = criteria1;
        this.criteria2 = criteria2;
        this.criteria3 = criteria3;
        this.criteria4 = criteria4;
    }
    public AndCriteria(Criteria criteria1, Criteria criteria2, Criteria criteria3) {
        this.criteria1 = criteria1;
        this.criteria2 = criteria2;
        this.criteria3 = criteria3;
    }
    public AndCriteria(Criteria criteria1, Criteria criteria2) {
        this.criteria1 = criteria1;
        this.criteria2 = criteria2;
    }

    @Override
    public ArrayList<Email> meetCriteria(ArrayList<Email> emails) {
        ArrayList<Email> criteria1filters =this.criteria1.meetCriteria(emails);
        ArrayList<Email> finalizer =this.criteria2.meetCriteria(criteria1filters);
        if(this.criteria3!=null){
            finalizer=this.criteria3.meetCriteria(finalizer);
        }
        if(this.criteria4!=null){
            finalizer=this.criteria4.meetCriteria(finalizer);
        }
        if(this.criteria5!=null){
            finalizer=this.criteria5.meetCriteria(finalizer);
        }
        return finalizer;
    }
}
