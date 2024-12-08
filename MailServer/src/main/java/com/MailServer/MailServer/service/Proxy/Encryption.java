package com.MailServer.MailServer.service.Proxy;

import java.math.BigInteger;

public class Encryption {
    private String hashing(byte[] hash){
        BigInteger number = new BigInteger(1, hash);
        StringBuilder  hashtext = new StringBuilder(number.toString(16));
        while (hashtext.length() < 32) {
            hashtext.insert(0,"0");
        }
        return hashtext.toString();
    }
}
