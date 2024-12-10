package com.MailServer.MailServer.service.User;

import com.MailServer.MailServer.controller.UserLoginRequest;
import com.MailServer.MailServer.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
        return user;
    }
}

