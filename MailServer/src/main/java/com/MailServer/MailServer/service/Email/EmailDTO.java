package com.MailServer.MailServer.service.Email;

import com.MailServer.MailServer.service.User.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@Data
public class EmailDTO {
    // Getters and Setters
    private String sender;
    private Set<String> receivers;
    private String subject;
    private String body;
    private String datetime;

    // Constructors
    public EmailDTO() {}

    public EmailDTO(String sender, Set<String> receivers, String subject, String body, String datetime) {
        this.sender = sender;
        this.receivers = receivers;
        this.subject = subject;
        this.body = body;
        this.datetime = datetime;
    }

    public String getBodySnippet(String body) {
        if (body == null || body.length() <= 50) {
            return body;
        }
        return body.substring(0, 50);
    }

    public EmailDTO(String sender, String subject, String body, String datetime){
        this.sender=sender;
        this.subject=subject;
        this.body=getBodySnippet(body);
        this.datetime=datetime;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getDatetime() {
        return datetime;
    }

    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Set<String> getReceivers() {
        return receivers;
    }

    public void setReceivers(Set<String> receivers) {
        this.receivers = receivers;
    }
}
