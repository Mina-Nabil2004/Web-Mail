package com.MailServer.MailServer.service.User;

import com.MailServer.MailServer.controller.UserLoginRequest;
import com.MailServer.MailServer.repository.FolderRepository;
import com.MailServer.MailServer.repository.UserRepository;
import com.MailServer.MailServer.service.Email.Builder;
import com.MailServer.MailServer.service.Email.Email;
import com.MailServer.MailServer.service.Folder;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final FolderRepository folderRepo;

    @Autowired
    public UserService(UserRepository userRepository, FolderRepository folderRepo) {
        this.userRepository = userRepository;
        this.folderRepo = folderRepo;
    }

    public Object getUser(String email, String password){
        if(userRepository.findByEmailAndPassword(email, password) == null){
            if(userRepository.findByEmail(email) != null){return "Incorrect Password";}
            return "Not Registered";
        }
        return userRepository.findByEmailAndPassword(email, password);
    }

    @Transactional
    public Object registerUser(String name, String email, String password){
        if (userRepository.findByEmail(email) != null) {
            return "Registered";
        }
        User user = new User(name, email, password);
        userRepository.save(user);
        folderRepo.save(new Folder("inbox", user));
        folderRepo.save(new Folder("sent", user));
        folderRepo.save(new Folder("draft", user));
        folderRepo.save(new Folder("trash", user));
        folderRepo.save(new Folder("stared", user));
        return user;
    }

    @Transactional
    public Object compose(Builder request){
        Email email = request.build();
        //send to reciever
        return email;
    }
}

