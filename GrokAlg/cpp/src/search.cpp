#include "search.h"

int grok::simpleSearch(int* arr, int N, int a)
{
	for (int i = 0; i < N; i++)
		if (arr[i] == a)
			return i;
	return -1;
}

int grok::binarySearch(int* arr, int N, int a)
{
	int high = N - 1;
	int low = 0;
	int mid;
	while (low <= high)
	{
		mid = (high + low) / 2;
		if (arr[mid] == a)
			return mid;
		else if (arr[mid] > a)
			high = mid - 1;
		else if (arr[mid] < a)
			low = mid + 1;
	}

	return -1;
}
