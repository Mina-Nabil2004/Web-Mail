package com.MailServer.MailServer.service.Sort;

public class SortFactory {
    public static Strategy getSort(String request){
        if(request.toLowerCase()==null){
            return null;
        }
        else if(request.toLowerCase().equals("date")){
            return new SortDate();
        }
        else if(request.toLowerCase().equals("sender")){
            return new SortSender();
        }
        else if(request.toLowerCase().equals("subject")){
            return new SortSubject();
        }
        else if(request.toLowerCase().equals("body")){
            return new SortBody();
        }
        return null;
    }
}
