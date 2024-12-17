package com.MailServer.MailServer.service.Email;

import com.MailServer.MailServer.service.User.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Setter
@Getter
@Data
public class EmailDTO {
    // Getters and Setters
    private Long emailID;
    private String sender;
    private List<String> receivers;
    private List<String> attachment;
    private String subject;
    private String body;
    private String datetime;
    private boolean read;

    // Constructors
    public EmailDTO() {}



    public String getBodySnippet(String body) {
        if (body == null || body.length() <= 50) {
            return body;
        }
        return body.substring(0, 50);
    }


    public EmailDTO(Long emailID,String sender, List<String> receivers, String subject, String body, String datetime){
        this.emailID = emailID;
        this.sender=sender;
        this.receivers = receivers;
        this.subject = subject;
        this.body=getBodySnippet(body);
        this.datetime=datetime;
//        this.read = read;
    }
    public EmailDTO(List<String> receivers,String sender,String subject, String body, String datetime){
        this.receivers=receivers;
        this.sender=sender;
        this.subject = subject;
        this.body=getBodySnippet(body);
        this.datetime=datetime;
    }
    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public List<String> getReceivers() {
        return receivers;
    }

    public void setReceivers(List<String> receivers) {
        this.receivers = receivers;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getDatetime() {
        return datetime;
    }

    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }
    public Long getEmailID() {
        return emailID;
    }

    public void setEmailID(Long emailID) {
        this.emailID = emailID;
    }
}
