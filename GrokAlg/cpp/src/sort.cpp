#include "sort.h"

void grok::insertSort(int* arr, int N)
{
	int idMin;
	for (int i = 0; i < N; i++)
	{
		idMin = grok::getIdMin(arr, i, N - 1);
		if (i != idMin)
			grok::swap(arr, i, idMin);
	}
}

void grok::quickSort(int* arr, int N)
{
	std::vector<int> vec;
	for (int i = 0; i < N; i++)
	{
		vec.push_back(arr[i]);
	}
	vec = quickSort(vec);
	for (int i = 0; i < N; i++)
	{
		arr[i] = vec[i];
	}

}

std::vector<int> grok::quickSort(std::vector<int> vec)
{
	int N = vec.size();
	int O = N / 2;
	std::vector<int> arrA;
	std::vector<int> arrB;
	std::vector<int> arrC;

	if (N <= 1)
		return vec;
	else
		for (int i = 0; i < N; i++)
			if (vec[i] < vec[O])
				arrA.push_back(vec[i]);
			else if (vec[i] > vec[O])
				arrB.push_back(vec[i]);

	grok::unite(&arrC, &quickSort(arrA));
	arrC.push_back(vec[O]);
	grok::unite(&arrC, &quickSort(arrB));
	return arrC;
}
