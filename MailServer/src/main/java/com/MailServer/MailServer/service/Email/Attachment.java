package com.MailServer.MailServer.service.Email;

import jakarta.persistence.*;
import lombok.Data;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Data
@Entity
public class Attachment {
    @Id
    @SequenceGenerator(
            name = "attachment_sequence",
            sequenceName = "attachment_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "attachment_sequence"
    )
    private Long attachmentID;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "emailid",referencedColumnName = "emailid" , nullable = false)
    private Email email;
    private String name;
    private String type;
    private int size;
    private byte[] data;

    public Attachment(String name,String type,byte[] data){
        this.name=name;
        this.type=type;
        this.data=data;
    }
    public Attachment(){}

    public Long getAttachmentID() {
        return attachmentID;
    }

    public void setAttachmentID(Long attachmentID) {
        this.attachmentID = attachmentID;
    }

    public Email getEmail() {
        return email;
    }

    public void setEmail(Email email) {
        this.email = email;
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

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}
