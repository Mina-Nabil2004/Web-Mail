package com.MailServer.MailServer.service.Contact;

import com.MailServer.MailServer.service.User.User;
import jakarta.persistence.*;
import lombok.Data;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Data
@Entity
public class Address {
    @Id
    @SequenceGenerator(
            name = "address_sequence",
            sequenceName = "address_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "address_sequence"
    )
    private Long addressID;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "contactid", referencedColumnName = "contactid")
    private Contact contact;

    private String address;

    public Address() {
    }

    public Address(String address, Contact contact) {
        this.address = address;
        this.contact = contact;
    }

    public Long getEmailAddressID() {
        return addressID;
    }

    public void setEmailAddressID(Long emailAddressID) {
        this.addressID = emailAddressID;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    public Long getAddressID() {
        return addressID;
    }

    public void setAddressID(Long addressID) {
        this.addressID = addressID;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
