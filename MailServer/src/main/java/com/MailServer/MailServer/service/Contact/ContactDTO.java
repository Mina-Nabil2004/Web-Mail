package com.MailServer.MailServer.service.Contact;

public class ContactDTO {
   private String name;
   private Long contactID;

   public ContactDTO(String name,Long contactID) {
	   this.name = name;
       this.contactID=contactID;
   }

    public static int size() {
       return size();
    }

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
