package com.MailServer.MailServer.service.User;

import com.MailServer.MailServer.service.Contact;
import com.MailServer.MailServer.service.Email.Email;
import com.MailServer.MailServer.service.Folder;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;

@Data
@Entity
public class User  {
    @Id
    private String username;
    private String email;
    private String password;
//    @OneToMany(fetch = FetchType.LAZY)
//    private ArrayList<Folder> folders;
//    @OneToMany(fetch = FetchType.LAZY)
//    private ArrayList<Contact> contacts;

    public User(){}

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

//    public void addfolder(String name){
//        folders.add(new Folder(new ArrayList<Email>(),name));
//        return;
//    }
//    public void addContact(int id,String name,String email){
//        contacts.add(new Contact(id,name,email));
//        return;
//    }
}
