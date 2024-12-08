package com.MailServer.MailServer.service;

import lombok.Data;

@Data
public class Attachment {
    private String name;
    private String type;
    private byte[] attachments;

    public Attachment(String name,String type,byte[] attachments){
        this.name=name;
        this.type=type;
        this.attachments=attachments;
    }
    public Attachment(){}

}
