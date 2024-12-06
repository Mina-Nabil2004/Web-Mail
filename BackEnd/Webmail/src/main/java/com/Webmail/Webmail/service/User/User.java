package com.Webmail.Webmail.service.User;

import com.Webmail.Webmail.service.Contact;
import com.Webmail.Webmail.service.Email.Email;
import com.Webmail.Webmail.service.Folder;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;

@Data
@Entity
public class User  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

//    public void addfolder(String name){
//        folders.add(new Folder(new ArrayList<Email>(),name));
//        return;
//    }
//    public void addContact(int id,String name,String email){
//        contacts.add(new Contact(id,name,email));
//        return;
//    }
}
