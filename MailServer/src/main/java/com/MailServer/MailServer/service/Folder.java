package com.MailServer.MailServer.service;

import com.MailServer.MailServer.service.User.User;
import jakarta.persistence.*;

import static jakarta.persistence.GenerationType.SEQUENCE;

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

    public Long getFolderID() {
        return folderID;
    }

    public void setFolderID(Long folderID) {
        this.folderID = folderID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
