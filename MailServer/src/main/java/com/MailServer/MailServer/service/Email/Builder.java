package com.MailServer.MailServer.service.Email;

import com.MailServer.MailServer.service.Attachment;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Builder {
    private String sender;
    private String receiver;
    private String subject;
    private int id;
    private String body;
    private String datetime;
    private List<Attachment> attatchments;
    private boolean read;
    public Builder(){}
    public Builder(String sender,String receiver,int id,String datetime){
        this.sender=sender;
        this.receiver=receiver;
        this.datetime=datetime;
        this.id=id;
    }
    public String getSender() {
        return sender;
    }
    public String getreceiver() {
        return receiver;
    }

    public int getId() {
        return id;
    }

    public String getSubject() {
        return subject;
    }

    public String getBody() {
        return body;
    }

    public List<Attachment> getAttatchments() {
        return attatchments;
    }

    public String getdatetime() {
        return datetime;
    }
    public Builder setSubject(String subject) {
        this.subject = subject;
        return this;
    }

    public Builder setBody(String body) {
        this.body = body;
        return  this;
    }

    public Builder setAttatchments(ArrayList<Attachment>attatchments) {
        this.attatchments = attatchments;
        return this;
    }
    public boolean isRead() {
        return read;
    }
    public void setRead(boolean isread) {
        isread = read;
    }
    public Email build(){
        return new Email(this);
    }
}
