package com.MailServer.MailServer.service.EmailFacade;

import com.MailServer.MailServer.service.Email.Email;
import com.MailServer.MailServer.service.Email.EmailDTO;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class Pager {
    public static List<EmailDTO> page(int pageNo, int maxPageSize, List<EmailDTO> emails){
        Pageable pageable = PageRequest.of(pageNo, maxPageSize);
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), emails.size());

        List<EmailDTO> pagedEmails = emails.subList(start, end);
        return new PageImpl<>(pagedEmails, pageable, emails.size()).getContent();
    }
}