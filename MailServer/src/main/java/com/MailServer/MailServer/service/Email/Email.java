package com.MailServer.MailServer.service.Email;

import com.MailServer.MailServer.service.Folder.Folder;
import com.MailServer.MailServer.service.User.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Setter
@Getter
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

    @ManyToMany
    @JoinTable(
            name = "user_email",
            joinColumns = @JoinColumn(name = "emailid"),
            inverseJoinColumns = @JoinColumn(name = "userid")
    )
    private List<User> users;

    @ManyToMany
    @JoinTable(
            name = "folder_email",
            joinColumns = @JoinColumn(name = "emailid"),
            inverseJoinColumns = @JoinColumn(name = "folderid")
    )
    private List<Folder> folders;

    @OneToMany(mappedBy = "email", cascade = CascadeType.ALL)
    private List<Attachment> attachments;

    private String sender;
    private String subject;
    private String body;
    private String datetime;
//    private boolean read;

    public Email() {
    }
    public Email(Builder builder){
        this.sender= builder.getSender();
        this.subject=builder.getSubject();
        this.body=builder.getBody();
        this.datetime=builder.getDatetime();
//        this.read=builder.isRead();
    }

//    public Email(EmailDTO dto, User user, Folder folder){
//        this.sender= dto.getSender();
//        this.subject=dto.getSubject();
//        this.body=dto.getBody();
//        this.datetime= LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm-dd/MM/yy"));
//        this.user = user;
//        this.folder = folder;
////        this.read=builder.isRead();
//    }

    public Email(Email email){
        this.sender= email.getSender();
        this.subject=email.getSubject();
        this.body=email.getBody();
        this.datetime=email.getDatetime();
//        this.read=email.isRead();
    }
    public Email clone(){
        return new Email(this);
    }

    //    public boolean isRead() {
//        return read;
//    }

//    public void setRead(boolean read) {
//        this.read = read;
//    }

    public Long getEmailID() {
        return emailID;
    }

    public void setEmailID(Long emailID) {
        this.emailID = emailID;
    }

    public List<Folder> getFolders() {
        return folders;
    }

    public void setFolders(List<Folder> folders) {
        this.folders= folders;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getDatetime() {
        return datetime;
    }

    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}