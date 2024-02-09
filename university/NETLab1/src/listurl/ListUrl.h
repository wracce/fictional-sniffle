//
// Created by Boss on 17.10.2021.
//

#ifndef NETLAB1_LISTURL_H
#define NETLAB1_LISTURL_H


#include <queue>
#include <iostream>
#include <QTcpSocket>
#include "../reqhttp/reqhttp.h"
#include "../parser/Parser.h"
#include "Url/Url.h"
#include <QtWidgets/qtablewidget.h>
#include <QThread>
#include <regex>

class ListUrl {
private:

    QTcpSocket *socket;
    std::string baseUrl;
    std::queue<Url> queueTmpUrls;
    std::queue<Url> queueUrls;
    std::queue<Url> queuehtmlUrls;
    Url *qMin;
    Url *qMax;
    int MIN;
    std::string strMin;
    std::string strMax;
    int MAX;
    int size;
    int sizeHtmls;
    QTableWidget *qTable;
    int max;

    bool findUrl (std::string url, std::queue<Url> qu);

public:
    ListUrl(QTcpSocket *socket, std::string baseUrl, QTableWidget* qTable, int max);
    void run();
    void setMinMax();
    std::string getMinStr() { return strMin; }
    std::string getMaxStr() { return strMax; }
    int getMin() { return MIN; }
    int getMax() { return MAX; }
    int getSize() { return queuehtmlUrls.size(); }
    int getSizeHtmls() { return sizeHtmls; }
    
};


#endif //NETLAB1_LISTURL_H
