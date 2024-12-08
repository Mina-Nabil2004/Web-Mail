package com.MailServer.MailServer.service.Proxy;

import com.MailServer.MailServer.service.User.User;
import com.MailServer.MailServer.service.User.UserDTO;

public class Vaildation {
    public Vaildation(){}
    public boolean checkpassword(UserDTO user){
        return true;
    }
    public boolean checkusername(UserDTO user){
        return true;
    }
    public boolean checkemail(UserDTO user){
        return true;
    }
    public User siginup(UserDTO user){
        return null;
    }
    public User login(UserDTO user){
        return null;
    }
}
