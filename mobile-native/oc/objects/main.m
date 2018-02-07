// gcc -framework Foundation filename.m

#import <Foundation/Foundation.h>

int main(int argc, const char *argv[]) {
  @autoreleasepool {
    NSDate *now = [NSDate date];
    NSLog(@"New date is at %p", now);
  }
  return 0;
}
