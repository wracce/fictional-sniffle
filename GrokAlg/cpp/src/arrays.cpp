#include "arrays.h"

int grok::getIdMin(int* arr, int a, int b)
{
	int idMin = a;
	for (int i = a + 1; i <= b; i++)
		if (arr[i] < arr[idMin])
			idMin = i;
	return idMin;
}

void grok::swap(int* arr, int a, int b)
{
	int tmp = arr[a];
	arr[a] = arr[b];
	arr[b] = tmp;
}

void grok::print(int* arr, int N)
{
	std::cout << arr[0];
	for (int i = 1; i < N; i++)
		std::cout << " " << arr[i];
}

void grok::unite(std::vector<int> *vec1, std::vector<int> *vec2)
{
	vec1->insert(vec1->end(), vec2->begin(), vec2->end());
}
