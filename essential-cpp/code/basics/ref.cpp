#include <iostream>

using namespace std;

int main() {
  int ival = 1024;
  int *pi = &ival;
  int &rval = ival;

  cout << *pi;
  cout << rval;
  return 0;
}
