//
// Created by Boss on 17.10.2021.
//

#ifndef NETLAB1_REQHTTP_H
#define NETLAB1_REQHTTP_H


#include <iostream>
#include <QTcpSocket>

class ReqHttp {
public:
    static void sendGet(QTcpSocket *socket, std::string url, std::string path);
    static void sendHead(QTcpSocket *socket, std::string url, std::string path);
};


#endif //NETLAB1_REQHTTP_H
