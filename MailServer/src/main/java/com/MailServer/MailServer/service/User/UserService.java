package com.MailServer.MailServer.service.User;

import com.MailServer.MailServer.repository.*;
import com.MailServer.MailServer.service.Contact.*;
import com.MailServer.MailServer.service.Email.*;
import com.MailServer.MailServer.service.EmailFacade.FilterFacade;
import com.MailServer.MailServer.service.EmailFacade.SortFacade;
import com.MailServer.MailServer.service.FilterContact.ContactFactory;
import com.MailServer.MailServer.service.FilterContact.ContactFilterDTO;
import com.MailServer.MailServer.service.FilterContact.CriteriaContact;
import com.MailServer.MailServer.service.FilterEmail.Criteria;
import com.MailServer.MailServer.service.FilterEmail.FilterDTO;
import com.MailServer.MailServer.service.FilterEmail.OrCriteria;
import com.MailServer.MailServer.service.Folder.Folder;
import com.MailServer.MailServer.service.Folder.FolderDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
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

    public Object getUserFolder(Long folderID, int pageNo, int maxPageSize){
        Folder folder =folderRepository.findById(folderID).orElseThrow();
        return SortFacade.sort(folder.getEmails(), "date", false, pageNo, maxPageSize);
    }

    public Object getUserAllMail(Long userID, int pageNo, int maxPageSize){
        List<Folder> folders = userRepository.findById(userID).orElseThrow().getFolders();
        List<Email> emails = new ArrayList<>();
        for(int i=0;i<3;i++){
            emails.addAll(folders.get(i).getEmails());
        }
        return SortFacade.sort(emails, "date", false, pageNo, maxPageSize);
    }

    public User getUserDetails(Long userID) {
        return userRepository.findById(userID).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public Object addContact(Long userID, String name, String addresses) {
        User user = userRepository.findById(userID).orElseThrow();
        user.getContacts().add(new Contact(name, user, addresses));
        userRepository.save(user);
        return getContact(user.getUserID());
    }

    public Object getContact(Long userID) {
        User user = userRepository.findById(userID).orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getContacts().isEmpty()) {
            throw new RuntimeException("No contacts available for this user");
        }
        return user.getContacts().stream()
                .map(contact -> new ContactDTO(contact.getName(), contact.getAddresses(),contact.getContactID()))
                .collect(Collectors.toList());
    }

    @Transactional
    public Object send(EmailDTO emailDTO, Long userID, Long folderID, int maxPageSize, int pageNo){
        List<Folder> folders = new ArrayList<>();
        User sender = userRepository.findById(userID).orElseThrow();
        emailDTO.setSender(sender.getEmail());
        folders.add(sender.getFolders().get(1));
        for (String receiverEmail : emailDTO.getReceivers()) {
            User receiver = userRepository.findByEmail(receiverEmail);
            folders.add(receiver.getFolders().getFirst());
        }
        List<Attachment> attachments = new ArrayList<>();
        for(AttachmentDTO attachment : emailDTO.getAttachments()){
            attachments.add(new Attachment(attachment));
        }
        Email email = new Email(emailDTO, attachments, folders);
        emailRepository.save(email);
        return getUserFolder(folderID,pageNo,maxPageSize);
    }

    public Object getUserEmail(Long emailID) {
        Email email = emailRepository.findById(emailID).orElseThrow();
        return new EmailDTO(email.getReceivers(), email.getSender(), email.getSubject(), email.getBody(), email.getDatetime(), email.getAttachments(), email.getPriority());
    }

    @Transactional
    public Object deleteUser(Long userID) {
        User user = userRepository.findById(userID).orElseThrow();
        for (Folder folder : user.getFolders()) {
            for (Email email : folder.getEmails()) {
                email.getFolders().remove(folder);
                if(email.getFolders().isEmpty()){
                    emailRepository.delete(email);
                }
            }
            folder.getEmails().clear();
        }
        userRepository.deleteById(userID);
        return "Deleted";
    }

    @Transactional
    public Object deleteFolder(Long folderID) {
        Folder folder = folderRepository.findById(folderID).orElseThrow();
        folder.getEmails().clear();
        folderRepository.delete(folder);
        return "Deleted";
    }

    @Transactional
    public Object deleteEmail(Long emailID, Long activeFolderID, Long trashID, int maxPageSize, int pageNo) {
        Email email = emailRepository.findById(emailID).orElseThrow();
        Folder activeFolder = folderRepository.findById(activeFolderID).orElseThrow();

        if (activeFolderID.equals(trashID)) {
            email.getFolders().remove(activeFolder);
            if (email.getFolders().isEmpty()) {
                emailRepository.delete(email);
            } else {
                emailRepository.save(email);
            }
            activeFolder.getEmails().remove(email);
            folderRepository.save(activeFolder);
        } else {
            Folder trash = folderRepository.findById(trashID).orElseThrow();
            email.getFolders().remove(activeFolder);
            email.getFolders().add(trash);
            activeFolder.getEmails().remove(email);
            trash.getEmails().add(email);
            emailRepository.save(email);
            folderRepository.save(activeFolder);
            folderRepository.save(trash);
        }
        return getUserFolder(activeFolderID,pageNo,maxPageSize);
    }

    @Transactional
    public Object deleteContact(Long contactID) {
        contactRepository.deleteById(contactID);
        return "Deleted";
    }

    @Transactional
    public Object starredEmail(Long emailID, Long starredID, Long activeFolderID, int pageNo, int maxPageSize) {
        Email email = emailRepository.findById(emailID).orElseThrow();
        Folder activeFolder = folderRepository.findById(activeFolderID).orElseThrow();
        if (activeFolderID.equals(starredID)) {
            email.getFolders().remove(activeFolder);
            emailRepository.save(email);
            activeFolder.getEmails().remove(email);
            folderRepository.save(activeFolder);
        } else {
            Folder starredFolder = folderRepository.findById(starredID).orElseThrow();
            if(!email.getFolders().contains(starredFolder)){
                email.getFolders().add(starredFolder);
                starredFolder.getEmails().add(email);
                emailRepository.save(email);
                folderRepository.save(starredFolder);
            }
        }
        return getUserFolder(activeFolderID,pageNo,maxPageSize);
    }

    public Object filterEmails(FilterDTO request, Long folderID, String criteria, int pageNo, int maxPageSize) {
        List<Email> emails =  folderRepository.findById(folderID).orElseThrow().getEmails();
        return FilterFacade.filter(request, emails, criteria, pageNo, maxPageSize);
    }

    public Object searchEmails(Long folderID, String criteria, int pageNo, int maxPageSize) {
        Criteria filter = new OrCriteria(criteria);
        List<Email> emails =  folderRepository.findById(folderID).orElseThrow().getEmails();
        return FilterFacade.filter(new FilterDTO() ,emails, criteria, pageNo, maxPageSize);
    }

    public Object filterContact(ContactFilterDTO request, Long userID, String criteria, int pageNo) {
        CriteriaContact filter = ContactFactory.getCriteria(request,criteria);
        List<Contact> contacts = userRepository.findById(userID).orElseThrow().getContacts();
        List<Contact> filtered = filter.meetCriteria(contacts);
        List<ContactDTO> contactDTOs = filtered.stream()
                .map(contact -> new ContactDTO(contact.getName(), contact.getAddresses(), contact.getContactID()))
                .collect(Collectors.toList());
        Pageable pageable = PageRequest.of(pageNo, 20);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), contactDTOs.size());
        List<ContactDTO> pagedEmailDTOs = contactDTOs.subList(start, end);
        return new PageImpl<>(pagedEmailDTOs, pageable, contactDTOs.size()).getContent();
    }

    public  Object sortEmail(String criteria, Long folderID, boolean order, int pageNo, int maxPageSize) {
        Folder folder =folderRepository.findById(folderID).orElseThrow();
        return SortFacade.sort(folder.getEmails(), criteria, order, pageNo, maxPageSize);
    }
    public Object MoveEmail(List<Long>emailIDs,Long sourceFolderID,Long destinationFolderID,int pageNo,int maxPageSize) {
        Folder sourceFolder = folderRepository.findById(sourceFolderID).orElseThrow();
        Folder destinationFolder = folderRepository.findById(destinationFolderID).orElseThrow();
        for (Long emailID : emailIDs) {
            Email email = emailRepository.findById(emailID).orElseThrow();
            sourceFolder.getEmails().remove(email);
            email.getFolders().remove(sourceFolder);
            email.getFolders().add(destinationFolder);
            destinationFolder.getEmails().add(email);
            emailRepository.save(email);
        }
        folderRepository.save(destinationFolder);
        folderRepository.save(sourceFolder);
        return getUserFolder(sourceFolderID,pageNo,maxPageSize);
    }
    public Object EditContact(Long contactID,Contact EditedContact){
        Contact contact = contactRepository.findById(contactID).orElseThrow();
        contact.setName(EditedContact.getName());
        contact.setAddresses(EditedContact.getAddresses());
        contactRepository.save(contact);
        return contact;
    }
    public Object moveToTrash(List<Long>emailIDs,Long sourceFolderID,Long TrashFolderID,int pageNo,int maxPageSize) {
        Folder sourceFolder = folderRepository.findById(sourceFolderID).orElseThrow();
        Folder TrashFolder = folderRepository.findById(TrashFolderID).orElseThrow();
        for (Long emailID : emailIDs) {
            Email email = emailRepository.findById(emailID).orElseThrow();
            sourceFolder.getEmails().remove(email);
            email.getFolders().remove(sourceFolder);
            email.getFolders().add(TrashFolder);
            TrashFolder.getEmails().add(email);
            emailRepository.save(email);
        }
        folderRepository.save(TrashFolder);
        folderRepository.save(sourceFolder);
        return getUserFolder(sourceFolderID,pageNo,maxPageSize);
    }
    public Object deleteFromTrash(List<Long>emailIDs,Long TrashFolderID,int pageNo,int maxPageSize){
        Folder TrashFolder = folderRepository.findById(TrashFolderID).orElseThrow();
        for (Long emailID : emailIDs) {
            Email email = emailRepository.findById(emailID).orElseThrow();
            TrashFolder.getEmails().remove(email);
            email.getFolders().remove(TrashFolder);
            emailRepository.save(email);
        }
        folderRepository.save(TrashFolder);
        return getUserFolder(TrashFolderID,pageNo,maxPageSize);
    }
    @Transactional
    public Object draftedEmail(Long emailID,Long draftID,Long activeFolderID,int pageNo,int maxPageSize){
        Email email = emailRepository.findById(emailID).orElseThrow();
        Folder draftfolder=folderRepository.findById(draftID).orElseThrow();
        email.getFolders().add(draftfolder);
        draftfolder.getEmails().add(email);
        emailRepository.save(email);
        folderRepository.save(draftfolder);
        return getUserFolder(activeFolderID,pageNo,maxPageSize);
    }
}