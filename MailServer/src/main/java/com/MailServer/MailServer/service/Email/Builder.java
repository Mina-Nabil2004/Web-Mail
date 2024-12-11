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
}
