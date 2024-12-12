package com.MailServer.MailServer.service.User;

import com.MailServer.MailServer.repository.EmailRepository;
import com.MailServer.MailServer.repository.FolderRepository;
import com.MailServer.MailServer.repository.UserRepository;
import com.MailServer.MailServer.service.Email.Builder;
import com.MailServer.MailServer.service.Email.Email;
import com.MailServer.MailServer.service.Email.EmailDTO;
import com.MailServer.MailServer.service.Folder.Folder;
import com.MailServer.MailServer.service.Folder.FolderDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final FolderRepository folderRepository;
    private final EmailRepository emailRepository;

    @Autowired
    public UserService(UserRepository userRepository, FolderRepository folderRepository, EmailRepository emailRepository) {
        this.userRepository = userRepository;
        this.folderRepository = folderRepository;
        this.emailRepository = emailRepository;
    }

    @Transactional
    public Object registerUser(String name, String email, String password) {
        if (userRepository.findByEmail(email) != null) {
            return "Registered";
        }
        User user = new User(name, email, password);
        userRepository.save(user);
        folderRepository.save(new Folder("inbox", user));
        folderRepository.save(new Folder("sent", user));
        folderRepository.save(new Folder("draft", user));
        folderRepository.save(new Folder("trash", user));
        folderRepository.save(new Folder("starred", user));
        return user.getUserID();
    }

    public Object getUser(String email, String password){
        User user = userRepository.findByEmail(email);
        if(user == null){return "Not Registered";}
        if(user.getPassword().equals(password)){
            return user.getUserID();
        }
        return "Incorrect Password";
    }

    public Object getUserFolders(Long userID){
        return folderRepository.findByUserUserID(userID).stream()
                .map(folder -> new FolderDTO(folder.getFolderID(), folder.getName()))
                .collect(Collectors.toList());
    }

    public Object getUserFolder(Long folderID, int pageNo){
        Pageable pageable = PageRequest.of(pageNo, 20);
        Page<Email> page = emailRepository.findByFolderFolderID(folderID, pageable);
        return page.map(email -> new EmailDTO(email.getSender(), email.getSubject(), email.getBody(), email.getDatetime())).getContent();
    }
    public Object getUserAllMail(Long userID, int pageNo){
        Pageable pageable = PageRequest.of(pageNo, 20);
        Page<Email> page = emailRepository.findByUserUserID(userID, pageable);
        return page.map(email -> new EmailDTO(email.getSender(), email.getSubject(), email.getBody(), email.getDatetime())).getContent();
    }
    public User getUserDetails(Long userID) {
        return userRepository.findById(userID).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public Object send(EmailDTO dto, Long userID){
        User sender = userRepository.findById(userID).orElseThrow();
        User receiver = userRepository.findByEmail(dto.getReceivers());
        dto.setSender(sender.getEmail());
        Folder sentFolder = folderRepository.findByUserUserIDAndName(sender.getUserID(),"sent");
        Folder inboxFolder = folderRepository.findByUserUserIDAndName(receiver.getUserID(), "inbox");
        Email receivedEmail = new Email(dto, receiver, inboxFolder);
        emailRepository.save(receivedEmail);
        Email sendEmail = new Email(dto, sender, sentFolder);
        emailRepository.save(sendEmail);
        return sendEmail;
    }
//    public Object getUserEmail(Long emailID) {
//        Email email = emailRepository.findById(emailID).orElseThrow();
//        return new EmailDTO(email.getReceivers(), email.getSender(), email.getSubject(), email.getBody(), email.getDatetime());
//    }
    @Transactional
    public Object deleteUser(Long userID) {
        emailRepository.deleteAllByUserUserID(userID);
        folderRepository.deleteAllByUserUserID(userID);
        userRepository.deleteById(userID);
        return "Deleted";
    }
    @Transactional
    public Object deleteFolder(Long folderID) {
        emailRepository.deleteAllByFolderFolderID(folderID);
        folderRepository.deleteById(folderID);
        return "Deleted";
    }
    @Transactional
    public Object deleteEmail(Long emailID) {
        emailRepository.deleteById(emailID);
        return "Deleted";
    }
}