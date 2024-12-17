package com.MailServer.MailServer.service.Email;

import com.MailServer.MailServer.service.User.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Setter
@Getter
@Data
public class EmailDTO {
    private Long emailID;
    private String sender;
    private List<String> receivers;
    private List<AttachmentDTO> attachments;
    private String subject;
    private String body;
    private String datetime;
    private int priority;
    private List<Long> emailIDs;

    // Constructors
    public EmailDTO() {}



    public String getBodySnippet(String body) {
        if (body == null || body.length() <= 50) {
            return body;
        }
        return body.substring(0, 50);
    }


    public EmailDTO(Long emailID,String sender, List<String> receivers, String subject, String body, String datetime, int priority){
        this.emailID = emailID;
        this.sender=sender;
        this.receivers = receivers;
        this.subject = subject;
        this.body=getBodySnippet(body);
        this.priority = priority;
        this.datetime=datetime;
    }
    public EmailDTO(List<String> receivers,String sender,String subject, String body, String datetime, List<Attachment> attachments, int priority){
        this.receivers=receivers;
        this.sender=sender;
        this.subject = subject;
        this.body = body;
        this.datetime = datetime;
        this.priority = priority;
        this.attachments = attachments.stream()
                .map(attachment -> new AttachmentDTO(attachment.getAttachmentID(), attachment.getName(), attachment.getType(), attachment.getSize()))
                .collect(Collectors.toList());
    }
    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public List<String> getReceivers() {
        return receivers;
    }

    public void setReceivers(List<String> receivers) {
        this.receivers = receivers;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getDatetime() {
        return datetime;
    }

    public void setDatetime(String datetime) {
        this.datetime = datetime;
    }

    public Long getEmailID() {
        return emailID;
    }

    public void setEmailID(Long emailID) {
        this.emailID = emailID;
    }

    public List<AttachmentDTO> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<AttachmentDTO> attachments) {
        this.attachments = attachments;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public List<Long> getEmailIDs() {
        return emailIDs;
    }

    public void setEmailIDs(List<Long> emailIDs) {
        this.emailIDs = emailIDs;
    }
}
