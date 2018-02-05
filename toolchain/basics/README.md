# GNU Toolchain

Practicing [GNU linker](http://sp1.wikidot.com/gnulinker).

```
gcc -I . -c StackType.c -o StackType.o
gcc -I . -c StackFunc.c -o StackFunc.o
gcc -I . -c StackMain.c -o StackMain.o
gcc StackMain.o StackFunc.o StackType.o -o a.out
./a.out
```
