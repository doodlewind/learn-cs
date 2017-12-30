#include <stdio.h>
#include <string.h>

typedef struct {
    int len;
    char *data;
} Foo;

int main()
{
    Foo foo;
    char str[10];
    strcpy(str, "demo");
    foo.len = 4;
    foo.data = str;
    printf("%d\n%s\n", foo.len, foo.data);
    return 0;
}
