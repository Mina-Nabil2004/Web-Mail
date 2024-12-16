package com.MailServer.MailServer.service.Email;

import lombok.Data;

import java.util.Set;


@Data
public class Builder {
    private String sender;
    private String receivers;
    private String subject;
    private int id;
    private String body;
    private String datetime;
    private boolean read;

    public Builder(){}
    public Builder(String sender,String receivers,int id,String datetime){
        this.sender=sender;
        this.receivers=receivers;
        this.datetime=datetime;
        this.id=id;
    }


    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceivers() {
        return receivers;
    }

    public void setReceivers(String receivers) {
        this.receivers = receivers;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }
}
