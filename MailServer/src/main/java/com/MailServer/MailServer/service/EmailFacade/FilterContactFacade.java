//package com.MailServer.MailServer.service.EmailFacade;
//
//import com.MailServer.MailServer.service.Contact.Contact;
//import com.MailServer.MailServer.service.Email.Email;
//import com.MailServer.MailServer.service.Email.EmailDTO;
//import com.MailServer.MailServer.service.FilterContact.ContactFactory;
//import com.MailServer.MailServer.service.FilterContact.ContactFilterDTO;
//import com.MailServer.MailServer.service.FilterContact.CriteriaContact;
//import com.MailServer.MailServer.service.FilterEmail.CriteriaFactory;
//import com.MailServer.MailServer.service.FilterEmail.FilterDTO;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//public class FilterContactFacade {
//
//    public static List<Contact> filter(ContactFilterDTO filterOn, List<Contact> emails, String criteria, int pageNo, int maxPageSize){
//        CriteriaContact filter = ContactFactory.getCriteria(filterOn, criteria);
//        List<Contact> filtered = filter.meetCriteria(emails);
//        List<EmailDTO> emailDTOS = filtered.stream()
//                .map(email -> new EmailDTO(email.getEmailID(), email.getSender(), email.getReceivers(), email.getSubject(), email.getBody(), email.getDatetime(), email.getPriority()))
//                .collect(Collectors.toList());
//        return Pager.page(pageNo,maxPageSize,emailDTOS);
//    }
//}
