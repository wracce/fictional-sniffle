//
// Created by Boss on 17.10.2021.
//

#include "ListUrl.h"


ListUrl::ListUrl(QTcpSocket* socket, std::string baseUrl, QTableWidget* qTable, int max) {
    this->socket = socket;
    this->baseUrl = Parser::getUrlPath(baseUrl);
    this->qTable = qTable;
    this->max = max;
    queueTmpUrls.push(Url("/"));
}


void ListUrl::run() {
    MAX = INT_MIN;
    MIN = INT_MAX;
    sizeHtmls = 0;
    qTable->clearContents();
    qTable->setRowCount(0);
    std::string html;
    int code;
    while (!queueTmpUrls.empty() && queuehtmlUrls.size() < max) {
        html = "";
        code = -1;
        std::string path = queueTmpUrls.front().getUrl();
        socket->connectToHost(QString::fromStdString(baseUrl), 80);
        std::cout << "connected to " << path;
        if (socket->waitForConnected(500)) {
            ReqHttp::sendGet(socket, baseUrl, path);
            while (socket->waitForReadyRead())
                html.append(socket->readAll());
            code = Parser::getCode(html);
            if ((path[0] == '/') || path.find(baseUrl) != std::string::npos) {
                if (code == 200) {
                    if (Parser::isHtml(html)) {
                        queuehtmlUrls.push(queueTmpUrls.front());
                        int size = html.length();
                        sizeHtmls += size;

                        qTable->insertRow(qTable->rowCount());
                        qTable->setItem(qTable->rowCount() - 1, 0, new QTableWidgetItem(QString::fromStdString(queueTmpUrls.front().getUrl())));
                        qTable->setItem(qTable->rowCount() - 1, 1, new QTableWidgetItem(QString::number(html.length())));
                    
                        if (size < MIN) {
                            MIN = size;
                            strMin = queueTmpUrls.front().getUrl();
                        }
                        if (size > MAX) {
                            MAX = size;
                            strMax = queueTmpUrls.front().getUrl();
                        }
                    }
                    else { std::cout << "\033[1m\033[31m" << "(not html)" << "\033[0m"; }
                }
                else { std::cout << "\033[1m\033[31m(" << code << ")\033[0m"; }
                queueUrls.push(queueTmpUrls.front());
                std::vector<std::string> urls = Parser::getUrls(html);
                for (std::string str : urls)
                    if (!findUrl(str, queueUrls) && !findUrl(str, queueTmpUrls))
                        queueTmpUrls.push(Url(str));
            }
            else { std::cout << "\033[1m\033[31m(" << "Other" << ")\033[0m"; }
        }
        else { std::cout << "\033[1m\033[31m(" << "Close" << ")\033[0m"; }
        queueTmpUrls.pop();
        std::cout << std::endl;
    }
}

bool ListUrl::findUrl(std::string url, std::queue<Url> qu) {
    bool answ = false;
    while (!qu.empty() && !answ) {
        if (qu.front().getUrl() == url) {
            answ = true;
        }
        qu.pop();
    }
    return answ;
}
void ListUrl::setMinMax() {
    std::queue<Url> queueTmp = queueUrls;
    MAX = INT_MIN;
    MIN = INT_MAX;
    size = queueUrls.size();
    int sizeTmp = 0;
    for (int i = 1; i <= size; i++) {
        sizeTmp = queueTmp.front().getSize();
        sizeHtmls +=sizeTmp;
        if (sizeTmp < MIN) {
            MIN = sizeTmp;
            strMin = queueTmp.front().getName();
            std::cout << MIN;
        }
        if (sizeTmp > MAX) {
            MAX = sizeTmp;
            strMax = queueTmp.front().getName();
        }
        queueTmp.pop();
    }
    
}