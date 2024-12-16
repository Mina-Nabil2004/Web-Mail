package com.MailServer.MailServer.service.Contact;

public class ContactDTO {
   private String name;
   private String addresses;

   public ContactDTO(String name,String addresses) {
	   this.name = name;
       this.addresses=addresses;
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
