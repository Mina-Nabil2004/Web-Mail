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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getAttachments() {
        return attachments;
    }

    public void setAttachments(byte[] attachments) {
        this.attachments = attachments;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
