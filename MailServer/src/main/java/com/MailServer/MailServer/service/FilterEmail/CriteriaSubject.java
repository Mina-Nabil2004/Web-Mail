package com.MailServer.MailServer.service.FilterEmail;
import com.MailServer.MailServer.service.Email.Email;
import java.util.ArrayList;

public class CriteriaSubject implements Criteria{
    private final String subject;
    public CriteriaSubject(FilterDTO dto){
        this.subject= dto.getSubject();
    }
    @Override
    public ArrayList<Email> meetCriteria(ArrayList<Email> emails) {
        ArrayList<Email> subject=new ArrayList<Email>();
        for(Email email:emails){
            if(email.getSubject().contains(this.subject)){
                subject.add(email);
            }
        }
        return subject;
    }
    public String get(){

        return this.subject;
    }
}
