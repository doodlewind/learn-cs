// gcc -framework Foundation filename.m

#import <Foundation/Foundation.h>

int main(int argc, const char *argv[]) {
  @autoreleasepool {
    NSDateComponents *comps = [[NSDateComponents alloc] init];
    [comps setYear:2000];
    [comps setMonth:1];
    [comps setDay:1];
    [comps setHour:0];
    [comps setMinute:0];
    [comps setSecond:0];
    NSCalendar *g = [[NSCalendar alloc]
        initWithCalendarIdentifier:NSCalendarIdentifierGregorian];
    NSDate *dateOfBirth = [g dateFromComponents:comps];
    double seconds = [dateOfBirth timeIntervalSince1970];
    NSLog(@"%f seconds.", seconds);
  }
  return 0;
}
