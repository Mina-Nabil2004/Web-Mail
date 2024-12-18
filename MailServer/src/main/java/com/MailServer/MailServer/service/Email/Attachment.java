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

    @ManyToOne
    @JoinColumn(name = "emailid", referencedColumnName = "emailid")
    private Email email;

    private String name;
    private String type;
    private int size;

    @Column(columnDefinition = "LONGTEXT")
    private String data;

    public Attachment(AttachmentDTO dto, Email email) {
        this.name = dto.getName();
        this.type = dto.getType();
        this.size = dto.getSize();
        this.data = dto.getData();
        this.email = email;
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

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
