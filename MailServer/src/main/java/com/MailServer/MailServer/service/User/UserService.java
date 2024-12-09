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

    public User getUser(String email, String password){
        return userRepository.findByEmailAndPassword(email, password);
    }

    @Transactional
    public void registerUser(String name, String email, String password) throws UserAlreadyExistsException {
        if (userRepository.findByEmailOrUsername(email, name) != null) {
            throw new UserAlreadyExistsException("User already exists with email or username: " + email);
        }

        User user = new User(name, email, password);
        userRepository.save(user);
    }

}

