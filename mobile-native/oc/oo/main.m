// gcc -framework Foundation Person.m main.m

#import <Foundation/Foundation.h>
#import "Person.h"

int main(int argc, const char *argv[]) {
  @autoreleasepool {
    Person *person = [[Person alloc] init];
    [person setWeight:96];
    [person setHeight:1.8];
    float bmi = [person getBMI];
    NSLog(@"BMI is %f", bmi);
  }
  return 0;
}
