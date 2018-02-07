#import "Person.h"

@implementation Person

- (void)setHeight:(float)h {
  height = h;
}
- (void)setWeight:(int)w {
  weight = w;
}
- (float)getBMI {
  return weight / (height * height);
}

@end
