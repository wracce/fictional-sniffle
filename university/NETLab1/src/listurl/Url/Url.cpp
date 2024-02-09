//
// Created by Boss on 17.10.2021.
//

#include "Url.h"

std::string Url::getUrl() {
    return url;
}

void Url::setUrl(std::string url) {
    this->url = url;
}

std::string Url::getName() {
    return name;
}

void Url::setName(std::string name) {
    this->name = name;
}

int Url::getSize() {
    return size;
}

void Url::setSize(int size) {
    this->size = size;
}

int Url::getCode() {
    return code;
}

void Url::setCode(int code) {
    this->code = code;
}

Url::Url(std::string url) {
    this->url = url;
}
