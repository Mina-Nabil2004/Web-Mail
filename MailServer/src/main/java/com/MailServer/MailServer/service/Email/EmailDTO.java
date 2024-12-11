package com.MailServer.MailServer.service.Email;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class EmailDTO {
    // Getters and Setters
    private String sender;
    private String receiver;
    private String subject;
    private String body;
    private String datetime;

    // Constructors
    public EmailDTO() {}

    public EmailDTO(String sender, String receiver, String subject, String body, String datetime) {
        this.sender = sender;
        this.receiver = receiver;
        this.subject = subject;
        this.body = body;
        this.datetime = datetime;
    }
    public String getBodySnippet(int length) {
        if (body == null || body.length() <= length) {
            return body;
        }
        return body.substring(0, length);
    }
    public EmailDTO(String sender,String receiver,String body,String datetime){
        this.sender=sender;
        this.receiver=receiver;
        this.body=body;
        this.datetime=datetime;
    }
    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
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
}
