package com.MailServer.MailServer.service.EmailFacade;

import com.MailServer.MailServer.service.Email.Email;
import com.MailServer.MailServer.service.Email.EmailDTO;
import com.MailServer.MailServer.service.FilterEmail.Criteria;
import com.MailServer.MailServer.service.FilterEmail.CriteriaFactory;
import com.MailServer.MailServer.service.FilterEmail.FilterDTO;

import java.util.List;
import java.util.stream.Collectors;

public class FilterFacade {
    public static List<EmailDTO> filter(FilterDTO filterOn, List<Email> emails, String criteria, int pageNo, int maxPageSize){
        Criteria filter = CriteriaFactory.getCriteria(filterOn, criteria);
        List<Email> filtered = filter.meetCriteria(emails);
        List<EmailDTO> emailDTOS = filtered.stream()
                .map(email -> new EmailDTO(email.getEmailID(), email.getSender(), email.getReceivers(), email.getSubject(), email.getBody(), email.getDatetime()))
                .collect(Collectors.toList());
        return Pager.page(pageNo,maxPageSize,emailDTOS);
    }
}
