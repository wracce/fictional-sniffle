//
// Created by Boss on 17.10.2021.
//

#ifndef NETLAB1_PARSER_H
#define NETLAB1_PARSER_H


#include <string>

class Parser {
public:
    static std::string getUrlPath(std::string url);
    static std::vector<std::string> getUrls(std::string html);
    static int getCode(std::string html);
    static bool isHtml(std::string html);
};


#endif //NETLAB1_PARSER_H
