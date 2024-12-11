package com.MailServer.MailServer.service;

import com.MailServer.MailServer.service.User.User;
import jakarta.persistence.*;
import lombok.Data;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Data
@Entity
public class Folder {
    @Id
    @SequenceGenerator(
            name = "folder_sequence",
            sequenceName = "folder_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "folder_sequence"
    )
    private Long folderID;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userid", referencedColumnName = "userid")
    private User user;

    private String name;

    public Folder(){}

    public Folder(String name, User user){
        this.name=name;
        this.user=user;
    }
}
