#pragma once
#include "arrays.h"

namespace grok
{
	void insertSort(int* arr, int N);
	void quickSort(int* arr, int N);
	std::vector<int> quickSort(std::vector<int> vec);
}