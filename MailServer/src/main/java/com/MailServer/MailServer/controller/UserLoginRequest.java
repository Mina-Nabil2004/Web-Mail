package com.MailServer.MailServer.controller;

//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class UserLoginRequest {
    private String email;
    private String password;

    public UserLoginRequest(String email, String password){
        this.email = email;
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        this.password = passwordEncoder.encode(password);
        this.password = password;
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
