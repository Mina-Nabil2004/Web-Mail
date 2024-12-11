package com.MailServer.MailServer.controller;

import com.MailServer.MailServer.service.Email.Builder;
import com.MailServer.MailServer.service.Email.Email;
import com.MailServer.MailServer.service.Email.EmailDTO;
import com.MailServer.MailServer.service.User.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.MailServer.MailServer.service.User.User;
import com.MailServer.MailServer.service.User.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin("*")
@RequestMapping("/email")
public class control {
    private final UserService userService;


    @Autowired
    public control(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody UserLoginRequest request) {
        try {
            return ResponseEntity.ok(userService.getUser(request.getEmail(), request.getPassword()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody UserRegistrationRequest request) {
        try {
            // Call the service to register the user
            return ResponseEntity.ok(userService.registerUser(request.getName(), request.getEmail(), request.getPassword()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }

    @GetMapping("/folders/{userID}")
    public ResponseEntity<Object> getFolders(@PathVariable Long userID) {
        try {
            // Call the service to register the user
            return ResponseEntity.ok(userService.getUserFolders(userID));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }

    @PostMapping("/send/{userID}")
    public ResponseEntity<Object> compose(@RequestBody EmailDTO request, @PathVariable Long userID) {
        try {
            return ResponseEntity.ok(userService.send(request,userID));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }
}