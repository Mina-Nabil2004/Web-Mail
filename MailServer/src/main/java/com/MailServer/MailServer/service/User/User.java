package com.MailServer.MailServer.service.User;

import com.MailServer.MailServer.service.Contact;
import com.MailServer.MailServer.service.Email.Email;
import com.MailServer.MailServer.service.Folder;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Data
@Entity
public class User  {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "user_sequence"
    )
    private Long userID;

    private String username;
    private String email;
    private String password;

    public User(){}

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
