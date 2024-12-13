package com.MailServer.MailServer.service.User;

import com.MailServer.MailServer.repository.ContactRepository;
import com.MailServer.MailServer.repository.EmailRepository;
import com.MailServer.MailServer.repository.FolderRepository;
import com.MailServer.MailServer.repository.UserRepository;
import com.MailServer.MailServer.service.Contact.Contact;
import com.MailServer.MailServer.service.Contact.ContactDTO;
import com.MailServer.MailServer.service.Email.Email;
import com.MailServer.MailServer.service.Email.EmailDTO;
import com.MailServer.MailServer.service.FilterContact.ContactFactory;
import com.MailServer.MailServer.service.FilterContact.ContactFilterDTO;
import com.MailServer.MailServer.service.FilterContact.CriteriaContact;
import com.MailServer.MailServer.service.FilterEmail.Criteria;
import com.MailServer.MailServer.service.FilterEmail.CriteriaFactory;
import com.MailServer.MailServer.service.FilterEmail.FilterDTO;
import com.MailServer.MailServer.service.FilterEmail.OrCriteria;
import com.MailServer.MailServer.service.Folder.Folder;
import com.MailServer.MailServer.service.Folder.FolderDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final FolderRepository folderRepository;
    private final EmailRepository emailRepository;
    private final ContactRepository contactRepository;

    @Autowired
    public UserService(UserRepository userRepository, FolderRepository folderRepository, EmailRepository emailRepository, ContactRepository contactRepository) {
        this.userRepository = userRepository;
        this.folderRepository = folderRepository;
        this.emailRepository = emailRepository;
        this.contactRepository = contactRepository;
    }

    @Transactional
    public Object registerUser(String name, String email, String password) {
        if (userRepository.findByEmail(email) != null) {
            return "Registered";
        }
        User user = new User(name, email, password);
        userRepository.save(user);
        folderRepository.save(new Folder("inbox", user));
        folderRepository.save(new Folder("sent", user));
        folderRepository.save(new Folder("draft", user));
        folderRepository.save(new Folder("trash", user));
        folderRepository.save(new Folder("starred", user));
        return user.getUserID();
    }

    public Object getUser(String email, String password){
        User user = userRepository.findByEmail(email);
        if(user == null){return "Not Registered";}
        if(user.getPassword().equals(password)){
            return user.getUserID();
        }
        return "Incorrect Password";
    }

    public Object getUserFolders(Long userID){
        return folderRepository.findByUserUserID(userID).stream()
                .map(folder -> new FolderDTO(folder.getFolderID(), folder.getName()))
                .collect(Collectors.toList());
    }

    public Object getUserFolder(Long folderID, int pageNo){
        Pageable pageable = PageRequest.of(pageNo, 20);
        Page<Email> page = emailRepository.findByFolderFolderID(folderID, pageable);
        return page.map(email -> new EmailDTO(email.getEmailID(), email.getSender(), email.getSubject(), email.getBody(), email.getDatetime())).getContent();
    }
    public Object getUserAllMail(Long userID, int pageNo){
        Pageable pageable = PageRequest.of(pageNo, 20);
        Page<Email> page = emailRepository.findByUserUserID(userID, pageable);
        return page.map(email -> new EmailDTO(email.getEmailID(), email.getSender(), email.getSubject(), email.getBody(), email.getDatetime())).getContent();
    }
    public User getUserDetails(Long userID) {
        return userRepository.findById(userID).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public Object send(EmailDTO dto, Long userID){
        User sender = userRepository.findById(userID).orElseThrow();
        User receiver = userRepository.findByEmail(dto.getReceivers());
        dto.setSender(sender.getEmail());
        Folder sentFolder = folderRepository.findByUserUserIDAndName(sender.getUserID(),"sent");
        Folder inboxFolder = folderRepository.findByUserUserIDAndName(receiver.getUserID(), "inbox");
        Email receivedEmail = new Email(dto, receiver, inboxFolder);
        emailRepository.save(receivedEmail);
        Email sendEmail = new Email(dto, sender, sentFolder);
        emailRepository.save(sendEmail);
        return sendEmail;
    }
//    public Object getUserEmail(Long emailID) {
//        Email email = emailRepository.findById(emailID).orElseThrow();
//        return new EmailDTO(email.getReceivers(), email.getSender(), email.getSubject(), email.getBody(), email.getDatetime());
//    }

    @Transactional
    public Object deleteUser(Long userID) {
        emailRepository.deleteAllByUserUserID(userID);
        folderRepository.deleteAllByUserUserID(userID);
        userRepository.deleteById(userID);
        return "Deleted";
    }
    @Transactional
    public Object deleteFolder(Long folderID) {
        emailRepository.deleteAllByFolderFolderID(folderID);
        folderRepository.deleteById(folderID);
        return "Deleted";
    }
    @Transactional
    public Object deleteEmail(Long emailID) {
        emailRepository.deleteById(emailID);
        return "Deleted";
    }

    public Object filterEmails(FilterDTO request, Long folderID, String criteria, int pageNo) {
        Criteria filter = CriteriaFactory.getCriteria(request, criteria);
        ArrayList<Email> emails =  emailRepository.findByFolderFolderID(folderID);
        ArrayList<Email> filtered = filter.meetCriteria(emails);
        List<EmailDTO> emailDTOs = filtered.stream()
                .map(email -> new EmailDTO(email.getEmailID(), email.getSender(), email.getSubject(), email.getBody(), email.getDatetime()))
                .collect(Collectors.toList());

        Pageable pageable = PageRequest.of(pageNo, 20);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), emailDTOs.size());

        List<EmailDTO> pagedEmailDTOs = emailDTOs.subList(start, end);
        return new PageImpl<>(pagedEmailDTOs, pageable, emailDTOs.size()).getContent();
    }

    public Object searchEmails(Long folderID, String criteria, int pageNo) {
        Criteria filter = new OrCriteria(criteria);
        ArrayList<Email> emails =  emailRepository.findByFolderFolderID(folderID);
        ArrayList<Email> filtered = filter.meetCriteria(emails);
        List<EmailDTO> emailDTOs = filtered.stream()
                .map(email -> new EmailDTO(email.getEmailID(), email.getSender(), email.getSubject(), email.getBody(), email.getDatetime()))
                .collect(Collectors.toList());

        Pageable pageable = PageRequest.of(pageNo, 20);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), emailDTOs.size());

        List<EmailDTO> pagedEmailDTOs = emailDTOs.subList(start, end);
        return new PageImpl<>(pagedEmailDTOs, pageable, emailDTOs.size()).getContent();
    }

    public Object filterContact(ContactFilterDTO request, Long userID, String criteria, int pageNo) {
        CriteriaContact filter = ContactFactory.getCriteria(request,criteria);
        ArrayList<Contact> contacts = contactRepository.findByUserUserID(userID);
        ArrayList<Contact> filtered = filter.meetCriteria(contacts);
        List<ContactDTO> contactDTOs = filtered.stream()
                .map(contact -> new ContactDTO(contact.getName(),contact.getContactID()))
                .collect(Collectors.toList());
        // Create Pageable object
        Pageable pageable = PageRequest.of(pageNo, 20);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), ContactDTO.size());
        List<ContactDTO> pagedEmailDTOs = contactDTOs.subList(start, end);
        return new PageImpl<>(pagedEmailDTOs, pageable, ContactDTO.size()).getContent();
    }
}