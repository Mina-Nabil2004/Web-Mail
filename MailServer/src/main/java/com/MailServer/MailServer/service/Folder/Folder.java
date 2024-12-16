package com.MailServer.MailServer.service.Folder;

import com.MailServer.MailServer.service.Email.Email;
import com.MailServer.MailServer.service.User.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@Setter
@Getter
@Data
@Entity
public class Folder {
    @Id
    @GeneratedValue
    private Long folderID;

    @ManyToOne
    @JoinColumn(name = "userid", referencedColumnName = "userid")
    private User user;

    @ManyToMany(mappedBy = "folders", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonManagedReference
    private List<Email> emails;

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

    public void setFolderID(Long folderID) {
        this.folderID = folderID;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Email> getEmails() {
        return emails;
    }

    public void setEmails(List<Email> emails) {
        this.emails = emails;
    }

    public void setName(String name) {
        this.name = name;
    }
}
