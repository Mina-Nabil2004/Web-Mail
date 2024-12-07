package com.Webmail.Webmail.service.User;

import com.Webmail.Webmail.repository.UserRepository;
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
    @Transactional
    public void registerUser(String username, String email, String password) throws UserAlreadyExistsException {
        if (userRepository.findByEmailOrUsername(email, username) != null) {
            throw new UserAlreadyExistsException("User already exists with email or username: " + email);
        }

        User user = new User(username, email, password);
        userRepository.save(user);
    }

}

