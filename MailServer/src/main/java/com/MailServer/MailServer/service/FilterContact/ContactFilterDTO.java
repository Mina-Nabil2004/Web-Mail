package com.MailServer.MailServer.service.FilterContact;

public class ContactFilterDTO {
    private String name;
    private Long contactID;

    public Long getContactID() {
        return contactID;
    }

    public void setContactID(Long contactID) {
        this.contactID = contactID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
