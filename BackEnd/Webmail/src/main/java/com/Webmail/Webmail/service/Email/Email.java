package com.Webmail.Webmail.service.Email;
import com.Webmail.Webmail.service.Attachment;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
public class Email implements Cloneable{
    private String sender;
    private ArrayList<String> receivers;
    private String subject;
    private String body;
    private String datetime;
    private List<Attachment> attatchments;
    private int id;
    private boolean read;

    public Email() {
    }
    public Email(Builder builder){
        this.sender= builder.getSender();
        this.receivers=builder.getreceivers();
        this.subject=builder.getSubject();
        this.body=builder.getBody();
        this.datetime=builder.getdatetime();
        this.attatchments=builder.getAttatchments();
        this.read=builder.isRead();

    }
    public Email(Email email){
        this.sender= email.getSender();
        this.receivers=email.getreceivers();
        this.subject=email.getSubject();
        this.body=email.getBody();
        this.datetime=email.getdatetime();
        this.read=email.isRead();
        this.attatchments=attatchments;
    }
    public void getreceivers(ArrayList<String> receivers) {
        this.receivers = receivers;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }
    public void setBody(String body) {
        this.body = body;
    }
    public void getdatetime(String dateTime) {
        this.datetime = dateTime;
    }
    public String getSender() {
        return sender;
    }
    public ArrayList<String> getreceivers() {
        return receivers;
    }
    public int getId() {
        return id;
    }
    public String getSubject() {
        return subject;
    }
    public List<Attachment> getAttatchments() {
        return attatchments;
    }
    public void setAttatchments(List<Attachment> attatchments) {
        this.attatchments = attatchments;
    }
    public String getBody() {
        return body;
    }
    public String getdatetime() {
        return datetime;
    }
    public boolean isRead() {
        return read;
    }
    public void setRead(boolean isread) {
        isread = read;
    }
    public Email clone(){
        return new Email(this);
    }
}