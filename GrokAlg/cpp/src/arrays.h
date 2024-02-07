#pragma once
#include <iostream>
#include <vector>

namespace grok
{
	int getIdMin(int* arr, int a, int b);
	void swap(int* arr, int a, int b);
	void print(int* arr, int N);
	void unite(std::vector<int>* vec1, std::vector<int>* vec2);
}