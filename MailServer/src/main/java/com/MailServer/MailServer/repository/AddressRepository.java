package com.MailServer.MailServer.repository;


import com.MailServer.MailServer.service.Contact.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository <Address,Long> {
}