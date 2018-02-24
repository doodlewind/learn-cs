// gcc -framework Foundation Timer.m Runner.m main.m

#import "Runner.h"
#import <Foundation/Foundation.h>

int main(int argc, const char *argv[]) {
  @autoreleasepool {
    [[Runner alloc] init];
    [[NSRunLoop currentRunLoop] run];
  }
  return 0;
}
