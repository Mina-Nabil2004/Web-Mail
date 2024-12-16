package com.MailServer.MailServer.service.Contact;

public class ContactDTO {
   private String name;
   private String addresses;
   private Long contactID;

   public ContactDTO(String name,String addresses,Long contactID) {
	   this.name = name;
       this.addresses=addresses;
       this.contactID=contactID;
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

    public String getAddresses() {
        return addresses;
    }

    public void setAddresses(String addresses) {
        this.addresses = addresses;
    }
}
