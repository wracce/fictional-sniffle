#include "other.h"

int grok::factorial(int a)
{
	if (a == 0 || a == 1) {
		return 1;
	} else
	{
		return a * grok::factorial(a - 1);
	}
}

int grok::gsd(int a, int b)
{
	if (a == 0)
		return b;
	else if (b == 0)
		return a;
	else if (a == b)
		return a;
	else if (a > b)
		return grok::gsd(b, a % b);
	else if (a < b)
		return grok::gsd(b % a, a);
}