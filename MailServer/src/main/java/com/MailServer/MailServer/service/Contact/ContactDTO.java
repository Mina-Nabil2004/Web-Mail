package com.MailServer.MailServer.service.Contact;

public class ContactDTO {
   private String name;
   private String email;

   public ContactDTO(String name, String email) {
	   this.name = name;
	   this.email = email;
   }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
