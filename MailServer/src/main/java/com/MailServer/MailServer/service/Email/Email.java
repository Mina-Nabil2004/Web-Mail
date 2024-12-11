package com.MailServer.MailServer.service.Email;
import com.MailServer.MailServer.service.Attachment;
import com.MailServer.MailServer.service.Folder;
import com.MailServer.MailServer.service.User.User;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Data
@Entity
public class Email implements Cloneable{
    @Id
    @SequenceGenerator(
            name = "email_sequence",
            sequenceName = "email_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "email_sequence"
    )
    private Long emailID;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "userid", referencedColumnName = "userid")
    private User user;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "folderid", referencedColumnName = "folderid")
    private Folder folder;


    private String sender;
    private String receiver;
    private String subject;
    private String body;
    private String datetime;
    private boolean read;

    public Email() {}
    public Email(Builder builder){
        this.sender= builder.getSender();
        this.receiver=builder.getReceiver();
        this.subject=builder.getSubject();
        this.body=builder.getBody();
        this.datetime=builder.getDatetime();
        this.read=builder.isRead();

    }
    public Email(Email email){
        this.sender= email.getSender();
        this.receiver=email.getReceiver();
        this.subject=email.getSubject();
        this.body=email.getBody();
        this.datetime=email.getDatetime();
        this.read=email.isRead();
    }
    public Email clone(){
        return new Email(this);
    }

    public Long getEmailID() {
        return emailID;
    }

    public void setEmailID(Long emailID) {
        this.emailID = emailID;
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

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public Folder getFolder() {
        return folder;
    }

    public void setFolder(Folder folder) {
        this.folder = folder;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}