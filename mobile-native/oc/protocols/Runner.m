#import "Runner.h"
#import <Foundation/Foundation.h>

@implementation Runner

- (id)init {
  Timer *timer = [[Timer alloc] init];
  timer.delegate = self;
  [timer startTimer:1.0];
  NSLog(@"Begin timer...");
  return [super init];
}

- (void)timerDidEnd {
  NSLog(@"Done!");
}

@end
