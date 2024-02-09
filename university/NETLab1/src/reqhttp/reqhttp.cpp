//
// Created by Boss on 17.10.2021.
//

#include "reqhttp.h"

void ReqHttp::sendGet(QTcpSocket *socket, std::string url, std::string path) {
    QByteArray req;
    req.append("GET " + path + " HTTP/1.1\r\n");
    req.append("Host:" + url + "\r\n");
    req.append("Connection: close\r\n\r\n");
    socket->write(req);
}

void ReqHttp::sendHead(QTcpSocket *socket, std::string url, std::string path) {
    QByteArray req;
    req.append("HEAD " + path + " HTTP/1.1\r\n");
    req.append("Host:" + url + "\r\n");
    req.append("Connection: close\r\n\r\n");
    socket->write(req);

}
