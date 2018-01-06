#include <iostream>
#include <vector>

using namespace std;

int main()
{
    vector<int> fib = { 1, 1, 2, 3, 5, 8, 13, 21 };
    vector<int> luc = { 1, 3, 4, 7, 11, 18, 29, 47 };
    vector<int> pel = { 1, 2, 5, 12, 29, 70, 169, 408 };
    vector<int> tri = { 1, 3, 6, 10, 15, 21, 28, 36 };
    vector<int> squ = { 1, 4, 9, 16, 25, 36, 49, 64 };
    vector<int> pen = { 1, 5, 12, 22, 35, 51, 70, 92 };

    vector<int> *seq_addr[6] = {
        &fib, &luc, &pel, &tri, &squ, &pen
    };
    vector<int> *curr_vec = seq_addr[0];
    int x = curr_vec->at(0);
    cout << x;
}
