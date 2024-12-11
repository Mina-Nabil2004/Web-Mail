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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userid", referencedColumnName = "userid")
    private User user;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "folderid", referencedColumnName = "folderid")
    private Folder folder;


    private String sender;
    private String receiver;
    private String subject;
    private String body;
    private String datetime;
    private boolean read;

    public Email() {
    }
    public Email(Builder builder){
        this.sender= builder.getSender();
        this.receiver=builder.getreceiver();
        this.subject=builder.getSubject();
        this.body=builder.getBody();
        this.datetime=builder.getdatetime();
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

}