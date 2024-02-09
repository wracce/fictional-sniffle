//
// Created by Boss on 15.10.2021.
//

// You may need to build the project (run Qt uic code generator) to get "ui_MainWindow.h" resolved

#include "mainwindow.h"
#include "ui_MainWindow.h"


MainWindow::MainWindow(QWidget *parent) :
        QMainWindow(parent), ui(new Ui::MainWindow) {
    ui->setupUi(this);


    ui->tableWidget->setColumnCount(2);
    ui->tableWidget->setHorizontalHeaderLabels({"URL", "Размер (байт)"});

    socket = new QTcpSocket();
    connect(socket, SIGNAL(errorOccurred(QAbstractSocket::SocketError)),this,SLOT(socketError(QAbstractSocket::SocketError)));

}

MainWindow::~MainWindow() {
    delete ui;
}

void MainWindow::on_pushButton_clicked()
{
    strUrl = ui->lineEdit->text().toStdString();
    QUrl url = QUrl::fromUserInput(QString::fromStdString(strUrl));
    if (url.isValid()) {
        ui->tableWidget->insertRow(ui->tableWidget->rowCount());
        ui->tableWidget->setItem(ui->tableWidget->rowCount() - 1, 0, new QTableWidgetItem(QString::number(123)));
        ui->tableWidget->setItem(ui->tableWidget->rowCount() - 1, 1, new QTableWidgetItem(QString::number(253)));
        ui->textEdit->clear();
        Urls = new ListUrl(socket, strUrl, ui->tableWidget, ui->spinBox->value());
        Urls->run();
        //Urls->setMinMax();
        ui->textEdit->insertPlainText(QString("Min: ")+ QString::fromStdString(Urls->getMinStr())+ QString("(")+QString::number(Urls->getMin())+ QString(")\n"));
        ui->textEdit->insertPlainText(QString("Max: ") + QString::fromStdString(Urls->getMaxStr()) + QString("(") + QString::number(Urls->getMax()) + QString(")\n"));
        ui->textEdit->insertPlainText(QString("Size: ") + QString::number(Urls->getSize()) + QString("(") + QString::number(Urls->getSizeHtmls()) + QString(")\n"));
        //ui->textEdit->insertPlainText(QString::fromStdString(Urls->getMin()->getName()));
        //std::cout << Urls->getMin()->getName();
        //QFuture<void> f2 = QtConcurrent::run(&ListUrl::run, Urls);
        //f2.waitForFinished();
        //Urls->start();
    }
    else {
        std::cout << "\033[1m\033[31m" << "Error! Check URL!" << "\033[0m" << std::endl;
    }
}


void MainWindow::socketError(QAbstractSocket::SocketError error) {
    if (!error == QAbstractSocket::SocketError::RemoteHostClosedError)
        qDebug()<<error;
}

