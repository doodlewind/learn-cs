#import "Timer.h"
#import <Foundation/Foundation.h>

@implementation Timer

- (void)startTimer:(float)second {
  [NSTimer scheduledTimerWithTimeInterval:second
                                   target:self.delegate
                                 selector:@selector(timerDidEnd)
                                 userInfo:nil
                                  repeats:NO];
}

@end
