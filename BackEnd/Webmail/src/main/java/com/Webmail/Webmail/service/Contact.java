package com.Webmail.Webmail.service;

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
}
