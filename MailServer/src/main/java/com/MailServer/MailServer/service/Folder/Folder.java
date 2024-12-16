package com.MailServer.MailServer.service.Folder;

import com.MailServer.MailServer.service.User.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
@Entity
public class Folder {
    @Id
    @GeneratedValue
    private Long folderID;

    @ManyToOne
    @JoinColumn(name = "userid", referencedColumnName = "userID")
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

    public User getUser() {
        return user;
    }

    public String getName() {
        return name;
    }
}
