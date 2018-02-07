// gcc -framework Foundation filename.m

#import <Foundation/Foundation.h>

int main(int argc, const char *argv[]) {
  @autoreleasepool {
    NSDateComponents *comps = [[NSDateComponents alloc] init];
    [comps setYear:1969];
    [comps setMonth:4];
    [comps setDay:30];
    [comps setHour:13];
    [comps setMinute:10];
    [comps setSecond:0];
    NSCalendar *g =
        [[NSCalendar alloc] initWithCalendarIdentifier:NSGregorianCalendar];
    NSDate *dateOfBirth = [g dateFromComponents:comps];
    double d = (double)[[NSDate date] timeIntervalSinceDate:dateOfBirth];
    NSLog(@"%f", d);
  }
  return 0;
}
