package com.ssau.netlab3.Mail;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

public class SmtpAuthenticator extends Authenticator {
    private String username;
    String password;
    public SmtpAuthenticator(String username,String password) {
        super();
        this.password = password;
        this.username = username;
    }

    @Override
    public PasswordAuthentication getPasswordAuthentication() {
        if ((username != null) && (username.length() > 0) && (password != null)
                && (password.length() > 0)) {

            return new PasswordAuthentication(username, password);
        }

        return null;
    }
}