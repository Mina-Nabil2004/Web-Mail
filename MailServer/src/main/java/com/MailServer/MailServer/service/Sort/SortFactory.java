package com.MailServer.MailServer.service.Sort;

public class SortFactory {
    public static Strategy getSort(String request){
        return switch (request.toLowerCase()) {
            case "date" -> new SortDate();
            case "sender" -> new SortSender();
            case "subject" -> new SortSubject();
            case "body" -> new SortBody();
            case  "priority" -> new SortPriority();
            default -> throw new IllegalStateException("Unexpected value: " + request.toLowerCase());
        };
    }
}
