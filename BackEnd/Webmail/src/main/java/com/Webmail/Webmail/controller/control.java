package com.Webmail.Webmail.controller;

import com.Webmail.Webmail.service.User.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Webmail.Webmail.service.User.User;
import com.Webmail.Webmail.service.User.UserService;
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

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserRegistrationRequest  request) {
        try {
            // Call the service to register the user
            userService.registerUser(request.getUsername(), request.getEmail(), request.getPassword());
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists with the provided email!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }
}
//    @PostMapping("/login")
//    public ResponseEntity<>login(@ResponseBody ){
//        try{
//
//        }catch(Exception e){
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }

//    @PostMapping("/sendemail")
//    public ResponseEntity<String>sendemail(@ResponseBody ){
//        try{
//
//        }catch(Exception e){
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }
//    }
//}
//    @PostMapping("/getEmails/{folder}")
//    public ResponseEntity<>getEmails(@PathVariable String account, @PathVariable String folder) {
//        try {
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//
//        }


