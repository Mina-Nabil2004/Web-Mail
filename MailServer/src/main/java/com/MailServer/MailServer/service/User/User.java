package com.MailServer.MailServer.service.User;

import com.MailServer.MailServer.service.Contact.Contact;
import com.MailServer.MailServer.service.Email.Email;
import com.MailServer.MailServer.service.Folder.Folder;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Getter
@Setter
@Data
@Entity
public class User {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "user_sequence"
    )
    private Long userID;

    private String username;
    private String email;
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Folder> folders;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Contact> contacts;

//    @ManyToMany(mappedBy = "users", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
//    private List<Email> emails;

    public User(){}

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public Long getUserID() {
        return userID;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Folder> getFolders() {
        return folders;
    }

    public void setFolders(List<Folder> folders) {
        this.folders = folders;
    }

    public List<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
    }

//    public List<Email> getEmails() {
//        return emails;
//    }
//
//    public void setEmails(List<Email> emails) {
//        this.emails = emails;
//    }
}
