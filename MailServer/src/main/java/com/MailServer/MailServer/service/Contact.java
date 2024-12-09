package com.MailServer.MailServer.service;

import lombok.Data;

@Data
public class Contact {
    private int id;
    private String name;
    private String email;
    public Contact(){}
    public Contact(int id,String name,String email){
        this.id=id;
        this.email=email;
        this.name=name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}
