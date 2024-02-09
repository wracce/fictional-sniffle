//
// Created by Boss on 17.10.2021.
//

#ifndef NETLAB1_URL_H
#define NETLAB1_URL_H


#include <string>

class Url {
private:
    std::string url;
    std::string name;
    int size;
    int code;

public:
    Url(std::string url);
    std::string getUrl();
    void setUrl(std::string url);
    std::string getName();
    void setName(std::string name);
    int getSize();
    void setSize(int size);
    int getCode();
    void setCode(int code);
};


#endif //NETLAB1_URL_H
