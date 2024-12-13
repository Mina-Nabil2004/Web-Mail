package com.MailServer.MailServer.service.Email;

import com.MailServer.MailServer.service.User.User;
import jakarta.persistence.*;

import java.util.Set;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity
public class Receiver {
    @Id
    @SequenceGenerator(
            name = "receiver_sequence",
            sequenceName = "receiver_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "receiver_sequence"
    )
    private Long receiverID;

    private String emailAddress;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "userid", referencedColumnName = "userid")
    private User user;


    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "emailid", referencedColumnName = "emailid")
    private Email email;

    @ManyToMany(mappedBy = "receivers")
    private Set<Email> emails;

    public Set<Email> getEmails() {
        return emails;
    }
    public Receiver(){}

    public void setEmails(Set<Email> emails) {
        this.emails = emails;
    }

    public Email getEmail() {
        return email;
    }

    public void setEmail(Email email) {
        this.email = email;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public Long getReceiverID() {
        return receiverID;
    }

    public void setReceiverID(Long receiverID) {
        this.receiverID = receiverID;
    }
}
