package com.MailServer.MailServer.controller;


//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class UserRegistrationRequest {
    private String name;
    private String email;
    private String password;

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setUsername(String name) {
        this.name = name;
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
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        this.password = passwordEncoder.encode(password);
        this.password = password;
    }
}
