package com.MailServer.MailServer.service.Proxychache;

import org.apache.logging.log4j.message.Message;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Encryption {
    private static String hashing(byte[] hash){
        BigInteger number = new BigInteger(1, hash);
        StringBuilder  hashtext = new StringBuilder(number.toString(16));
        while (hashtext.length() < 32) {
            hashtext.insert(0,"0");
        }
        return hashtext.toString();
    }
    public static String getSHA(String input) throws NoSuchAlgorithmException {
        MessageDigest md =MessageDigest.getInstance("SHA-256");
        byte[] encodedhash = md.digest(input.getBytes(StandardCharsets.UTF_8));
        return hashing(encodedhash);
    }
}
