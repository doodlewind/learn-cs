#include <stdio.h>

int sum(int x, int y)
{
  int t = x + y;
  return t;
}

int main()
{
  int x;
  x = sum(2, 3);
  printf("%d\n", x);
  return 0;
}
