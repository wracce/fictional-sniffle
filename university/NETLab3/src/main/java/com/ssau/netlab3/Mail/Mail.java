package com.ssau.netlab3.Mail;

import javafx.scene.control.Alert;

import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;
import java.io.UnsupportedEncodingException;
import java.util.Properties;

public class Mail {
    public static void sendMessage(String to, String subject, String content, DataSource file)
            throws MessagingException, UnsupportedEncodingException {
        sendSimpleMessage ("wracce@yandex.ru","tqxnavdwfumwezyd","wracce@yandex.ru",to,content,subject, file,"465","smtp.yandex.ru");
    }

    public static void sendSimpleMessage(String login, String password, String from, String to, String content,
                                         String subject,DataSource file, String smtpPort, String smtpHost) {
        Properties props = System.getProperties();
        props.put("mail.smtp.port", smtpPort);
        props.put("mail.smtp.host", smtpHost);
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.debug", "true");
        props.put("mail.mime.charset", "UTF-8");

        SmtpAuthenticator authentication = new SmtpAuthenticator(login, password);
        Session session = Session.getDefaultInstance(props, authentication);


        try {
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress(from));
            msg.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
            msg.setSubject(subject);
            BodyPart messageBodyPart = new MimeBodyPart();
            messageBodyPart.setText(content);
            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(messageBodyPart);
            if (file != null) {
                messageBodyPart = new MimeBodyPart();
                messageBodyPart.setDataHandler(new DataHandler(file));
                messageBodyPart.setFileName(file.getName());
                multipart.addBodyPart(messageBodyPart);
            }
            msg.setContent(multipart);

            Transport.send(msg);
            Alert alert = new Alert(Alert.AlertType.INFORMATION);
            alert.setTitle("Результат");
            alert.setHeaderText("Сообщение успешно отправленно!");
            alert.showAndWait();
        } catch (MessagingException e) {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Результат");
            alert.setHeaderText("Не удалось отпраить сообщение!");
            alert.setContentText("Проверьте введеные данные");
            alert.showAndWait();
        }
    }

}
