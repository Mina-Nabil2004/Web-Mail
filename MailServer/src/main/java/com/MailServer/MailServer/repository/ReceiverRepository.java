package com.MailServer.MailServer.repository;

import com.MailServer.MailServer.service.Email.Receiver;
import com.MailServer.MailServer.service.Email.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface ReceiverRepository extends JpaRepository<Receiver, Long> {

    @Query("SELECT r FROM Receiver r WHERE r.email.emailID = :emailID AND r.user.userID = :userID")
    Set<Receiver> findReceiversByEmailIDAndUserID(Long userID);

}