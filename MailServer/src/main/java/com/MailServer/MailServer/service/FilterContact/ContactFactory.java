package com.MailServer.MailServer.service.FilterContact;

public class ContactFactory {
    public static CriteriaContact getCriteria(ContactFilterDTO DTO, String criteria) {
        if (criteria == null) {
            throw new IllegalArgumentException("Criteria cannot be null.");
        }
        if (criteria.equals("name")) {
            return new CriteriaName(DTO);
        } else if (criteria.equals("show all")) {
            return new OrCriteria(DTO); // Passing the DTO instance, not the class/interface
        }
        throw new IllegalArgumentException("Invalid criteria: " + criteria);
    }
}
