#import <Foundation/Foundation.h>

#ifndef Timer_h
#define Timer_h

@protocol TimerDelegate <NSObject>
@required
- (void)timerDidEnd;
@end

@interface Timer : NSObject {
  id<TimerDelegate> _delegate;
}
@property(nonatomic, strong) id delegate;

- (void)startTimer:(float)second;
@end

#endif /* Timer_h */
