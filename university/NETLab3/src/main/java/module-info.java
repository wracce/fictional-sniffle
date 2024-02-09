module com.ssau.netlab3 {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.mail;
    requires activation;
    opens com.ssau.netlab3 to javafx.fxml;
    exports com.ssau.netlab3;
}