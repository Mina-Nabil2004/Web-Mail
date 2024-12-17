package com.MailServer.MailServer.service.Sort;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

public class SortPriority implements Strategy{
    @Override
    public List<Email> doOperation(List<Email> emails, boolean order) {
        Comparator<Email> comparator;
        if (order) {
            comparator = Comparator.comparingInt(Email::getPriority);
        } else {
            comparator = Comparator.comparingInt(Email::getPriority).reversed();
        }
        PriorityQueue<Email> priorityQueue =new PriorityQueue<>(comparator);
        priorityQueue.addAll(emails);
        List<Email> emailsorted =new ArrayList<>();
        while(!priorityQueue.isEmpty()){
            emailsorted.add(priorityQueue.poll());
        }
        return  emailsorted;
    }
}
