package com.MailServer.MailServer.service.Contact;

import com.MailServer.MailServer.service.User.User;
import jakarta.persistence.*;
import lombok.Data;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Data
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
    private int contactID;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userid", referencedColumnName = "userid")
    private User user;

    private String name;

    public Contact(){}
    public Contact(String name){
        this.name=name;
    }
}
