package com.MailServer.MailServer.service.Email;

import lombok.Data;


@Data
public class Builder {
    private String sender;
    private String receiver;
    private String subject;
    private int id;
    private String body;
    private String datetime;
    private boolean read;
    public Builder(){}
    public Builder(String sender,String receiver,int id,String datetime){
        this.sender=sender;
        this.receiver=receiver;
        this.datetime=datetime;
        this.id=id;
    }
    public Email build(){
        return new Email(this);
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }
}
