package com.MailServer.MailServer.controller;

import com.MailServer.MailServer.service.Email.Builder;
import com.MailServer.MailServer.service.Email.Email;
import com.MailServer.MailServer.service.Email.EmailDTO;
import com.MailServer.MailServer.service.FilterContact.ContactFilterDTO;
import com.MailServer.MailServer.service.FilterEmail.FilterDTO;
import com.MailServer.MailServer.service.User.*;
import jakarta.servlet.http.PushBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.MailServer.MailServer.service.User.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

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
            return ResponseEntity.ok(userService.registerUser(request.getName(), request.getEmail(), request.getPassword()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }

    @GetMapping("/folders/{userID}")
    public ResponseEntity<Object> getFolders(@PathVariable Long userID) {
        try {
            return ResponseEntity.ok(userService.getUserFolders(userID));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }
//    @GetMapping("/folder/{folderID}/{page}")
//    public ResponseEntity<Object> getFolder(@PathVariable Long folderID, @PathVariable int page) {
//        try {
//            return ResponseEntity.ok(userService.getUserFolder(folderID, page));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
//        }
//    }
//    @GetMapping("/allMail/{userID}/{page}")
//    public ResponseEntity<Object> getAllMail(@PathVariable Long userID, @PathVariable int page) {
//        try {
//            return ResponseEntity.ok(userService.getUserAllMail(userID, page));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
//        }
//    }
    @PostMapping("/send/{userID}")
    public ResponseEntity<Object> compose(@RequestBody EmailDTO request, @PathVariable Long userID) {
        try {
            return ResponseEntity.ok(userService.send(request,userID));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }
//    @GetMapping("/email/{emailID}")
//    public ResponseEntity<Object> getEmail(@PathVariable Long emailID) {
//        try {
//            return ResponseEntity.ok(userService.getUserEmail(emailID));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
//        }
//    }
    @DeleteMapping("/deleteUser/{userID}")
    public ResponseEntity<Object> deleteUser(@PathVariable Long userID) {
        try {
            return ResponseEntity.ok(userService.deleteUser(userID));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }
    @DeleteMapping("/deleteFolder/{folderID}")
    public ResponseEntity<Object> deleteFolder(@PathVariable Long folderID) {
        try {
            return ResponseEntity.ok(userService.deleteFolder(folderID));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }
    @DeleteMapping("/deleteEmail/{emailID}")
    public ResponseEntity<Object> deleteEmail(@PathVariable Long emailID) {
        try {
            return ResponseEntity.ok(userService.deleteEmail(emailID));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }
    @DeleteMapping("/deleteContact/{contactID}")
    public ResponseEntity<Object> deleteContact(@PathVariable Long contactID) {
        try {
            return ResponseEntity.ok(userService.deleteContact(contactID));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }
    @GetMapping("/user/{userID}")
    public ResponseEntity<Object> getUserDetails(@PathVariable Long userID) {
        try {
            User user = userService.getUserDetails(userID);  // Assuming getUserDetails is implemented in UserService
            UserDTO userDTO = new UserDTO(user.getUsername(), user.getEmail(), ""); // Do not include password for security reasons
            return ResponseEntity.ok(userDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch user details.");
        }
    }

//    @GetMapping("/filterEmails/{folderID}/{criteria}/{page}")
//    public ResponseEntity<Object> filterEmails(@RequestBody FilterDTO request, @PathVariable Long folderID, @PathVariable String criteria, @PathVariable int page) {
//        try {
//            return ResponseEntity.ok(userService.filterEmails(request, folderID, criteria, page));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch user details.");
//        }
//    }
//    @GetMapping("/searchEmails/{folderID}/{criteria}/{page}")
//    public ResponseEntity<Object> searchEmails(@PathVariable Long folderID, @PathVariable String criteria, @PathVariable int page) {
//        try {
//            return ResponseEntity.ok(userService.searchEmails(folderID, criteria, page));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch user details.");
//        }
//    }
//    @GetMapping("/filterContact/{contactID}/{criteria}/{page}")
//    public ResponseEntity<Object> filterContact(@RequestBody ContactFilterDTO request, @PathVariable Long userID, @PathVariable String criteria, @PathVariable int page){
//        try{
//            return ResponseEntity.ok(userService.filterContact(request,userID,criteria,page));
//        }catch (Exception e){
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch user details.");
//        }
//    }
    @PostMapping("/addContact/{userID}/{name}/{addresses}")
    public ResponseEntity<Object> addContact(@PathVariable Long userID, @PathVariable String name, @PathVariable String addresses){
        try{
            return ResponseEntity.ok(userService.addContact(userID,name,addresses));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch user details.");
        }
    }
    @GetMapping("/getContacts/{userID}")
    public ResponseEntity<Object> getContact(@PathVariable Long userID){
        try{
            return ResponseEntity.ok(userService.getContact(userID));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch user details.");
        }
    }
//    @GetMapping("/sort/{request}/{folderID}/{order}/{page}")
//    public ResponseEntity<Object> sortEmails(@PathVariable String request,@PathVariable Long folderID,@PathVariable boolean order, @PathVariable int page) {
//        try {
//            return ResponseEntity.ok(userService.sortEmail(request,folderID,order,page));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to sort emails: " + e.getMessage());
//        }
//    }
//    @GetMapping("/copy/{folderID}")
//    public ResponseEntity<Object> copy(@PathVariable Long folderID) {
//        try {
//            return ResponseEntity.ok(userService.copyEmail(folderID));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to sort emails: " + e.getMessage());
//        }
//    }

    @PostMapping("/uploadAttachment")
    public ResponseEntity<String> handleFileUpload(@RequestParam("attachments") MultipartFile[] files) {
        try {
            //userService.uploadAttachment(files);
            return ResponseEntity.ok("Files uploaded successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload files.");
        }
    }

}