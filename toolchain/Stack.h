#ifndef _StackType_H_
#define _StackType_H_
#define STACK_SIZE 100

extern int stack[];
extern int top;

extern void push(int x);
extern int pop();

#endif
