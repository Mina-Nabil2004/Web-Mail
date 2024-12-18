package com.MailServer.MailServer.service.Email;

import com.MailServer.MailServer.service.User.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Entity
public class UserEmailStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "email_id", referencedColumnName = "emailID")
    private Email email;

    private Long deletedFrom;

    private LocalDateTime movedToTrashDate;

    public UserEmailStatus() {}

    public UserEmailStatus(User user, Email email, LocalDateTime movedToTrashDate, Long deletedFrom) {
        this.user = user;
        this.email = email;
        this.movedToTrashDate = movedToTrashDate;
        this.deletedFrom = deletedFrom;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Email getEmail() {
        return email;
    }

    public void setEmail(Email email) {
        this.email = email;
    }

    public Long getDeletedFrom() {
        return deletedFrom;
    }

    public void setDeletedFrom(Long deletedFrom) {
        this.deletedFrom = deletedFrom;
    }

    public LocalDateTime getMovedToTrashDate() {
        return movedToTrashDate;
    }

    public void setMovedToTrashDate(LocalDateTime movedToTrashDate) {
        this.movedToTrashDate = movedToTrashDate;
    }
}