package com.MailServer.MailServer.service.EmailFacade;

import com.MailServer.MailServer.service.Email.Email;
import com.MailServer.MailServer.service.Email.EmailDTO;
import com.MailServer.MailServer.service.Sort.SortFactory;
import com.MailServer.MailServer.service.Sort.Strategy;
import java.util.List;
import java.util.stream.Collectors;

public class SortFacade {
    public static List<EmailDTO> sort(List<Email> emails, String criteria, boolean order, int pageNo, int maxPageSize){
        Strategy sorter = SortFactory.getSort(criteria);
        List<Email> sortedEmails = sorter.doOperation(emails, order);
        List<EmailDTO> emailDTOS=sortedEmails.stream()
                .map(email -> new EmailDTO(email.getEmailID(), email.getSender(), email.getReceivers(), email.getSubject(), email.getBody(), email.getDatetime(), email.getPriority()))
                .collect(Collectors.toList());
        return Pager.page(pageNo,maxPageSize,emailDTOS);
    }
}