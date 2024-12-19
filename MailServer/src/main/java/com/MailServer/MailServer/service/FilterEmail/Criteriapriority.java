package com.MailServer.MailServer.service.FilterEmail;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;
import java.util.List;

    public class Criteriapriority implements Criteria{
        private final String priority;
        public Criteriapriority(FilterDTO dto){
            this.priority = dto.getBody();
        }
        public Criteriapriority(String criteria){
            this.priority = criteria;
        }
        @Override
        public List<Email> meetCriteria(List<Email> emails) {
            List<Email> body = new ArrayList<Email>();
            for(Email email:emails){
                if(email.getBody().contains(this.priority)){
                    body.add(email);
                }
            }
            return body;
        }
        public String get(){
            return this.priority;
        }
    }

