package com.MailServer.MailServer.service.User;

import com.MailServer.MailServer.repository.*;
import com.MailServer.MailServer.service.Contact.*;
import com.MailServer.MailServer.service.Email.*;
import com.MailServer.MailServer.service.FilterContact.ContactFactory;
import com.MailServer.MailServer.service.FilterContact.ContactFilterDTO;
import com.MailServer.MailServer.service.FilterContact.CriteriaContact;
import com.MailServer.MailServer.service.FilterEmail.Criteria;
import com.MailServer.MailServer.service.FilterEmail.CriteriaFactory;
import com.MailServer.MailServer.service.FilterEmail.FilterDTO;
import com.MailServer.MailServer.service.FilterEmail.OrCriteria;
import com.MailServer.MailServer.service.Folder.Folder;
import com.MailServer.MailServer.service.Folder.FolderDTO;
import com.MailServer.MailServer.service.Sort.SortDTO;
import com.MailServer.MailServer.service.Sort.SortFactory;
import com.MailServer.MailServer.service.Sort.Strategy;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final FolderRepository folderRepository;
    private final EmailRepository emailRepository;
    private final ContactRepository contactRepository;
//    private final AddressRepository addressRepository;
    private final ReceiverRepository receiverRepository;

    @Autowired
    public UserService(UserRepository userRepository, FolderRepository folderRepository, EmailRepository emailRepository, ContactRepository contactRepository, ReceiverRepository receiverRepository) {
        this.userRepository = userRepository;
        this.folderRepository = folderRepository;
        this.emailRepository = emailRepository;
        this.contactRepository = contactRepository;
//        this.addressRepository = addressRepository;
        this.receiverRepository=receiverRepository;
    }

    @Transactional
    public Object registerUser(String name, String email, String password) {
        if (userRepository.findByEmail(email) != null) {
            return "Registered";
        }
        User user = new User(name, email, password);
        List<Folder> folders = Arrays.asList(
                new Folder("inbox", user),
                new Folder("sent", user),
                new Folder("draft", user),
                new Folder("trash", user),
                new Folder("starred", user)
        );
        user.setFolders(folders);
        userRepository.save(user);
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
        return userRepository.findById(userID).orElseThrow().getFolders().stream()
                .map(folder -> new FolderDTO(folder.getFolderID(), folder.getName()))
                .collect(Collectors.toList());
    }

//    ============================================================================================

//    public Object getUserFolder(Long folderID, int pageNo){
//        Pageable pageable = PageRequest.of(pageNo, 20);
//        Page<Email> page = emailRepository.findByFolderFolderID(folderID, pageable);
//        return page.map(email -> new EmailDTO(email.getEmailID(), email.getSender(), email.getSubject(), email.getBody(), email.getDatetime())).getContent();
//    }
//    public Object getUserAllMail(Long userID, int pageNo){
//        Pageable pageable = PageRequest.of(pageNo, 20);
//        Page<Email> page = emailRepository.findByUserUserID(userID, pageable);
//        return page.map(email -> new EmailDTO(email.getEmailID(), email.getSender(), email.getSubject(), email.getBody(), email.getDatetime())).getContent();
//    }
//    ==========================================================================================
    public User getUserDetails(Long userID) {
        return userRepository.findById(userID).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public Object addContact(Long userID, String name, String addresses) {
        User user = userRepository.findById(userID).orElseThrow();
        user.getContacts().add(new Contact(name, user, addresses));
        userRepository.save(user);
        return user.getContacts();
    }

    public Object getContact(Long userID) {
        User user = userRepository.findById(userID).orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getContacts().isEmpty()) {
            throw new RuntimeException("No contacts available for this user");
        }
        return user.getContacts().get(0);
    }


//    @Transactional
//    public Object send(EmailDTO dto, Long userID){
//        User sender = userRepository.findById(userID).orElseThrow();
//        dto.setSender(sender.getEmail());
//        Folder sentFolder = folderRepository.findByUserUserIDAndName(sender.getUserID(),"sent");
//        for (String receiverEmail : dto.getReceivers()) {
//            User receiver = userRepository.findByEmail(receiverEmail);
//            Folder inboxFolder = folderRepository.findByUserUserIDAndName(receiver.getUserID(), "inbox");
//            Email receivedEmail = new Email(dto, receiver, inboxFolder);
//            emailRepository.save(receivedEmail);
//            Receiver received = new Receiver(receivedEmail, receiverEmail);
//            receiverRepository.save(received);
//        }
//        Email sendEmail = new Email(dto, sender, sentFolder);
//        emailRepository.save(sendEmail);
//        return sendEmail;
//    }

//    public Object getUserEmail(Long emailID) {
//        Email email = emailRepository.findById(emailID).orElseThrow();
//        return new EmailDTO(email.getReceivers(), email.getSender(), email.getSubject(), email.getBody(), email.getDatetime());
//    }
    @Transactional
    public Object deleteUser(Long userID) {
        userRepository.deleteById(userID);
        return "Deleted";
    }
    @Transactional
    public Object deleteFolder(Long folderID) {
        folderRepository.deleteById(folderID);
        return "Deleted";
    }
    @Transactional
    public Object deleteEmail(Long emailID) {
        emailRepository.deleteById(emailID);
        return "Deleted";
    }

//    @Transactional
//    public Object deleteAddress(Long addressID) {
//        addressRepository.deleteById(addressID);
//        return "Deleted";
//    }
    @Transactional
    public Object deleteContact(Long contactID) {
        contactRepository.deleteById(contactID);
        return "Deleted";
    }

//    public Object filterEmails(FilterDTO request, Long folderID, String criteria, int pageNo) {
//        Criteria filter = CriteriaFactory.getCriteria(request, criteria);
//        List<Email> emails =  folderRepository.findById(folderID).orElseThrow().getEmails();
//        ArrayList<Email> filtered = filter.meetCriteria(emails);
//        List<EmailDTO> emailDTOs = filtered.stream()
//                .map(email -> new EmailDTO(email.getEmailID(), email.getSender(), email.getSubject(), email.getBody(), email.getDatetime()))
//                .collect(Collectors.toList());
//
//        Pageable pageable = PageRequest.of(pageNo, 20);
//        int start = (int) pageable.getOffset();
//        int end = Math.min((start + pageable.getPageSize()), emailDTOs.size());
//
//        List<EmailDTO> pagedEmailDTOs = emailDTOs.subList(start, end);
//        return new PageImpl<>(pagedEmailDTOs, pageable, emailDTOs.size()).getContent();
//    }
//
//    public Object searchEmails(Long folderID, String criteria, int pageNo) {
//        Criteria filter = new OrCriteria(criteria);
//        ArrayList<Email> emails =  emailRepository.findByFolderFolderID(folderID);
//        ArrayList<Email> filtered = filter.meetCriteria(emails);
//        List<EmailDTO> emailDTOs = filtered.stream()
//                .map(email -> new EmailDTO(email.getEmailID(), email.getSender(), email.getSubject(), email.getBody(), email.getDatetime()))
//                .collect(Collectors.toList());
//
//        Pageable pageable = PageRequest.of(pageNo, 20);
//        int start = (int) pageable.getOffset();
//        int end = Math.min((start + pageable.getPageSize()), emailDTOs.size());
//
//        List<EmailDTO> pagedEmailDTOs = emailDTOs.subList(start, end);
//        return new PageImpl<>(pagedEmailDTOs, pageable, emailDTOs.size()).getContent();
//    }
//
//    public Object filterContact(ContactFilterDTO request, Long userID, String criteria, int pageNo) {
//        CriteriaContact filter = ContactFactory.getCriteria(request,criteria);
//        ArrayList<Contact> contacts = contactRepository.findByUserUserID(userID);
//        ArrayList<Contact> filtered = filter.meetCriteria(contacts);
//        List<ContactDTO> contactDTOs = filtered.stream()
//                .map(contact -> new ContactDTO(contact.getName(),contact.getContactID()))
//                .collect(Collectors.toList());
//        Pageable pageable = PageRequest.of(pageNo, 20);
//        int start = (int) pageable.getOffset();
//        int end = Math.min((start + pageable.getPageSize()), ContactDTO.size());
//        List<ContactDTO> pagedEmailDTOs = contactDTOs.subList(start, end);
//        return new PageImpl<>(pagedEmailDTOs, pageable, ContactDTO.size()).getContent();
//    }
//    public  Object sortEmail(String request, Long folderID, boolean order, int pageNo) {
//        Strategy sort = SortFactory.getSort(request);
//        if (sort == null) {
//            throw new IllegalArgumentException("Invalid sort type: " + request);
//        }
//        ArrayList<Email> emails =emailRepository.findByFolderFolderID(folderID);
//        ArrayList<Email> Sorted = sort.doOperation(emails,order);
//        List<EmailDTO> emailDTOs = Sorted.stream()
//                .map(email -> new EmailDTO(email.getEmailID(), email.getSender(), email.getSubject(), email.getBody(), email.getDatetime()))
//                .collect(Collectors.toList());
//        Pageable pageable = PageRequest.of(pageNo, 20);
//        int start = (int) pageable.getOffset();
//        int end = Math.min((start + pageable.getPageSize()), emailDTOs.size());
//        List<EmailDTO> pagedEmailDTOs = emailDTOs.subList(start, end);
//        return new PageImpl<>(pagedEmailDTOs, pageable, emailDTOs.size()).getContent();
//    }
//
//    public Object copyEmail(Long folderID) {
//        ArrayList<Email> emails = emailRepository.findByFolderFolderID(folderID);
//        List<Email> clonedEmails = new ArrayList<>();
//        for(Email email : emails){
//            clonedEmails.add(email.clone());
//        }
//        return clonedEmails;
//    }


//    public void uploadAttachment(MultipartFile[] files) {
//        for (MultipartFile file : files) {
//            // Process each file (e.g., save to database or file system)
//        }
//    }

}