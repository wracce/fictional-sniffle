package com.ssau.netlab3;

import com.ssau.netlab3.Mail.Mail;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.stage.FileChooser;

import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.MessagingException;
import java.io.File;
import java.io.UnsupportedEncodingException;

public class HelloController {
    private Mail mail;
    private DataSource file = null;

    @FXML
    Button delButton;
    @FXML
    Button addButton;

    @FXML
    TextArea conText;

    @FXML
    TextField subText;

    @FXML
    TextField adressText;

    @FXML
    TextField port;

    @FXML
    TextField login;

    @FXML
    TextField pass;

    @FXML
    TextField host;

    @FXML
    protected void onStartButtonClick() {
        mail = new Mail();
        //file = new FileDataSource("C:\\Users\\Boss\\Documents\\Книги\\Сборник песен.docx");
        mail.sendSimpleMessage(login.getText(),pass.getText(),login.getText(),adressText.getText(),conText.getText(),subText.getText(), file,port.getText(),host.getText());
        //mail.sendMessage(adressText.getText(),subText.getText(),conText.getText(),file);
    }

    @FXML
    protected void selectFile(){
        FileChooser fileChooser = new FileChooser();
        fileChooser.setTitle("Выберите файл");
        fileChooser.getExtensionFilters().add(new FileChooser.ExtensionFilter("All Files", "*.*"));
        File selectedFile = fileChooser.showOpenDialog(null);
        if (selectedFile != null) {
            file = new FileDataSource(selectedFile.getAbsolutePath());
            addButton.setDisable(true);
            delButton.setDisable(false);
        }

    }
    @FXML
    protected void onConnect(){

    }

    public void delFile() {
        file = null;
        addButton.setDisable(false);
        delButton.setDisable(true);
    }
}