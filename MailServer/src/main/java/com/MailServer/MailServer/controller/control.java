package com.MailServer.MailServer.controller;

import com.MailServer.MailServer.service.Contact.Contact;
import com.MailServer.MailServer.service.Contact.ContactDTO;
import com.MailServer.MailServer.service.Email.EmailDTO;
import com.MailServer.MailServer.service.FilterContact.ContactFilterDTO;
import com.MailServer.MailServer.service.FilterEmail.FilterDTO;
import com.MailServer.MailServer.service.Folder.Folder;
import com.MailServer.MailServer.service.Folder.FolderDTO;
import com.MailServer.MailServer.service.User.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.MailServer.MailServer.service.User.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

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

    @GetMapping("/folder/{folderID}/{maxPageSize}/{page}")
    public ResponseEntity<Object> getFolder(@PathVariable Long folderID, @PathVariable int page, @PathVariable int maxPageSize) {
        try {
            return ResponseEntity.ok(userService.getUserFolder(folderID, page, maxPageSize));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }

    @GetMapping("/allMail/{userID}/{maxPageSize}/{page}")
    public ResponseEntity<Object> getAllMail(@PathVariable Long userID, @PathVariable int maxPageSize, @PathVariable int page) {
        try {
            return ResponseEntity.ok(userService.getUserAllMail(userID, page, maxPageSize));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }

    @PostMapping("/send/{userID}/{activeFolderID}/{maxPageSize}/{page}")
    public ResponseEntity<Object> compose(@RequestBody EmailDTO request, @PathVariable Long userID,@PathVariable Long activeFolderID, @PathVariable int maxPageSize, @PathVariable int page) {
        try {
            return ResponseEntity.ok(userService.send(request,userID,activeFolderID,maxPageSize,page));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }

    @GetMapping("/email/{emailID}")
    public ResponseEntity<Object> getEmail(@PathVariable Long emailID) {
        try {
            return ResponseEntity.ok(userService.getUserEmail(emailID));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }

    @GetMapping("/attachment/{attachmentID}")
    public ResponseEntity<Object> getAttachment(@PathVariable Long attachmentID) {
        try {
            return ResponseEntity.ok(userService.getUserAttachment(attachmentID));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }

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

    @DeleteMapping("/deleteEmail/{emailID}/{activeFolderID}/{trashID}/{maxPageSize}/{page}")
    public ResponseEntity<Object> deleteEmail(@PathVariable Long emailID, @PathVariable Long activeFolderID, @PathVariable Long trashID, @PathVariable int maxPageSize, @PathVariable int page) {
        try {
            return ResponseEntity.ok(userService.deleteEmail(emailID, activeFolderID, trashID, maxPageSize, page));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }
    @PostMapping("/restoreEmail/{emailID}/{trashID}/{maxPageSize}/{page}")
    public ResponseEntity<Object> restoreEmail(@PathVariable Long emailID, @PathVariable Long trashID, @PathVariable int maxPageSize, @PathVariable int page) {
        try {
            return ResponseEntity.ok(userService.restoreEmail(emailID, trashID, maxPageSize, page));
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

    @PostMapping("/filterEmails/{folderID}/{criteria}/{maxPageSize}/{page}")
    public ResponseEntity<Object> filterEmails(@RequestBody FilterDTO request, @PathVariable Long folderID, @PathVariable String criteria, @PathVariable int page, @PathVariable int maxPageSize) {
        try {
            return ResponseEntity.ok(userService.filterEmails(request, folderID, criteria, page, maxPageSize));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch user details.");
        }
    }

    @PostMapping("/star/{emailID}/{starredID}/{activeFolderID}/{maxPageSize}/{page}")
    public ResponseEntity<Object> emailStar(@PathVariable Long emailID, @PathVariable Long starredID, @PathVariable Long activeFolderID, @PathVariable int page, @PathVariable int maxPageSize) {
        try {
            return ResponseEntity.ok(userService.starredEmail(emailID, starredID, activeFolderID, page, maxPageSize));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch user details.");
        }
    }

    @GetMapping("/searchEmails/{folderID}/{criteria}/{maxPageSize}/{page}")
    public ResponseEntity<Object> searchEmails(@PathVariable Long folderID, @PathVariable String criteria, @PathVariable int page, @PathVariable int maxPageSize) {
        try {
            return ResponseEntity.ok(userService.searchEmails(folderID, criteria, page, maxPageSize));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch user details.");
        }
    }

    @PostMapping("/filterContact/{userID}/{criteria}/{page}")
    public ResponseEntity<Object> filterContact(@RequestBody ContactFilterDTO request, @PathVariable Long userID, @PathVariable String criteria, @PathVariable int page){
        try{
            return ResponseEntity.ok(userService.filterContact(request,userID,criteria,page));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch user details.");
        }
    }

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

    @GetMapping("/sort/{criteria}/{folderID}/{order}/{maxPageSize}/{page}")
    public ResponseEntity<Object> sortEmails(@PathVariable String criteria,@PathVariable Long folderID,@PathVariable boolean order, @PathVariable int page, @PathVariable int maxPageSize) {
        try {
            return ResponseEntity.ok(userService.sortEmail(criteria,folderID,order,page, maxPageSize));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to sort emails: " + e.getMessage());
        }
    }
    @PostMapping("/move/{sourceFolderID}/{destinationFolderID}/{maxPageSize}/{page}")
    public ResponseEntity<Object> moveEmail(@RequestBody EmailDTO dto, @PathVariable Long sourceFolderID, @PathVariable Long destinationFolderID,@PathVariable int page, @PathVariable int maxPageSize) {
        try {
            return ResponseEntity.ok(userService.MoveEmail(dto.getEmailIDs(),sourceFolderID,destinationFolderID,page,maxPageSize));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to sort emails: " + e.getMessage());
        }
    }
    @PostMapping("/editContact/{contactID}/{userID}")
    public ResponseEntity<Object> editContact(@RequestBody ContactDTO dto, @PathVariable Long contactID,@PathVariable Long userID) {
        try {
            Contact editedContact = new Contact();
            editedContact.setName(dto.getName());
            editedContact.setAddresses(dto.getAddresses());
            return ResponseEntity.ok(userService.EditContact(contactID, editedContact,userID));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to edit contact: " + e.getMessage());
        }
    }
    @PostMapping("/movetoTrash/{sourceFolderID}/{TrashFolderID}/{maxPageSize}/{page}")
    public ResponseEntity<Object> movetoTrash(@RequestBody EmailDTO dto,@PathVariable Long sourceFolderID,@PathVariable Long TrashFolderID,@PathVariable int page, @PathVariable int maxPageSize) {
        try {
            return ResponseEntity.ok(userService.moveToTrash(dto.getEmailIDs(),sourceFolderID,TrashFolderID,page,maxPageSize));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to sort emails: " + e.getMessage());
        }
    }
    @PostMapping("/deletetromtrash/{TrashFolderID}/{maxPageSize}/{page}")
    public ResponseEntity<Object> deleteFromTrash(@RequestBody EmailDTO dto,@PathVariable Long TrashFolderID,@PathVariable int page, @PathVariable int maxPageSize) {
        try {
            return ResponseEntity.ok(userService.deleteFromTrash(dto.getEmailIDs(),TrashFolderID,page,maxPageSize));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to sort emails: " + e.getMessage());
        }
    }
    @PostMapping("/draftemail/{emailID}/{draftID}/{activeFolderID}/{maxPageSize}/{page}")
    public ResponseEntity<Object> draftemail(@PathVariable Long emailID,@PathVariable Long draftID,@PathVariable Long activeFolderID,@PathVariable int page, @PathVariable int maxPageSize) {
        try {
            return ResponseEntity.ok(userService.draftedEmail(emailID,draftID,activeFolderID,page,maxPageSize));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to sort emails: " + e.getMessage());
        }
    }
    @PostMapping("/addFolder/{userID}/{name}/{activeFolderID}/{maxPageSize}/{page}")
    public ResponseEntity<Object> addfolder(@PathVariable Long userID,@PathVariable String name,@PathVariable Long activeFolderID,@PathVariable int page, @PathVariable int maxPageSize) {
        try {
            return ResponseEntity.ok(userService.AddFolder(userID,activeFolderID,name,page,maxPageSize));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to sort emails: " + e.getMessage());
        }
    }
    @PostMapping("/editFolder/{activeFolderID}")
    public ResponseEntity<Object> editfolder(@RequestBody FolderDTO dto, @PathVariable Long activeFolderID) {
        try {
            Folder editedFolder =new Folder();
            editedFolder.setName(dto.getName());
            return ResponseEntity.ok(userService.EditFolder(activeFolderID, editedFolder));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to edit contact: " + e.getMessage());
        }
    }

}