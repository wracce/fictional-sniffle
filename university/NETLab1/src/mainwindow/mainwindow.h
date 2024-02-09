//
// Created by Boss on 15.10.2021.
//

#ifndef NETLAB1_MAINWINDOW_H
#define NETLAB1_MAINWINDOW_H

#include <QMainWindow>
#include <iostream>
#include <QTcpSocket>
#include <QTime>
#include <string>
#include <regex>

#include "../listurl/ListUrl.h"


QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow {
    Q_OBJECT
public:
    explicit MainWindow(QWidget *parent = nullptr);

    ~MainWindow() override;

private slots:
    void on_pushButton_clicked();
    //void socketReadyRead();
    void socketError(QAbstractSocket::SocketError);
    //void socketConnected();

private:
    Ui::MainWindow *ui;
    QTcpSocket *socket;
    std::string strUrl;
    ListUrl* Urls;

};


#endif //NETLAB1_MAINWINDOW_H
