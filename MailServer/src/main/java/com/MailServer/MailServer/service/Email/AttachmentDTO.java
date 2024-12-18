package com.MailServer.MailServer.service.Email;

public class AttachmentDTO {
    private Long attachmentID;
    private String name;
    private String type;
    private int size;
    private String data;

    public AttachmentDTO(){}
    
    public AttachmentDTO(Long attachmentID,String name,String type, int size){
        this.name=name;
        this.type=type;
        this.attachmentID = attachmentID;
        this.size = size;
    }
    public AttachmentDTO(Long attachmentID,String data){
        this.attachmentID = attachmentID;
        this.data = data;
    }
    public Long getAttachmentID() {
        return attachmentID;
    }

    public void setAttachmentID(Long attachmentID) {
        this.attachmentID = attachmentID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
