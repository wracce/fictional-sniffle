//
// Created by Boss on 17.10.2021.
//

#include <regex>
#include <iostream>
#include "Parser.h"

std::string Parser::getUrlPath(std::string url) {
    std::string tmp;
    std::regex reg("(.*)//");
    std::regex reg2("www.");
    tmp = std::regex_replace(url, reg, "");
    tmp = std::regex_replace(tmp, reg2, "");
    std::cout << tmp;
    return tmp;
}
std::vector<std::string> Parser::getUrls(std::string html) {
    std::vector<std::string> tmp;
    std::regex reg("href=\"(.*?)\"");
    //std::regex reg2("\"/([/\\w]+)\"");
    std::regex reg2("\"(.*?)\"");
    std::smatch match;

    for (std::sregex_iterator it(html.begin(), html.end(), reg), end; it != end; ++it) {
        std::string str2(it->str());
        if ( std::regex_search(str2, match, reg2) ) {
            std::string str3(match.str());
            str3.erase(remove( str3.begin(), str3.end(), '\"' ),str3.end());
            tmp.push_back(str3);
        }
    }
    return  tmp;
}


int Parser::getCode(std::string html)
{
    int tmp = -1;
    std::regex reg("^HTTP/(.*)");
    std::regex reg2("\\d{3}");
    std::smatch match;
    if (std::regex_search(html, match, reg)) {
        std::string str = match.str();
        if (std::regex_search(str, match, reg2))
            tmp = std::stoi(match.str());
    }
    return tmp;
}

bool Parser::isHtml(std::string html)
{
    bool tmp = false;
    std::regex reg("^Content-Type: text/html");
    std::smatch match;
    if (std::regex_search(html, match, reg)) {
        tmp = true;
    }
    return tmp;
}
