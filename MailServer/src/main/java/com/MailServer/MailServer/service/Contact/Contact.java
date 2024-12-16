package com.MailServer.MailServer.service.Contact;

import com.MailServer.MailServer.service.User.User;
import jakarta.persistence.*;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Entity
public class Contact {
    @Id
    @SequenceGenerator(
            name = "contact_sequence",
            sequenceName = "contact_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "contact_sequence"
    )
    private Long contactID;

    @ManyToOne
    @JoinColumn(name = "userid", referencedColumnName = "userid")
    private User user;

    private String name;
    private String addresses;

    public Contact(){}
    public Contact(String name){
        this.name=name;
    }
    public Contact(String name, User user, String addresses){this.name=name;this.user = user;this.addresses=addresses;}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getContactID() {
        return contactID;
    }

    public void setContactID(Long contactID) {
        this.contactID = contactID;
    }

    public String getAddresses() {
        return addresses;
    }

    public void setAddresses(String addresses) {
        this.addresses = addresses;
    }
}
