#import <Foundation/Foundation.h>

@interface Person : NSObject {
  float height;
  int weight;
}

- (void)setHeight:(float)h;
- (void)setWeight:(int)w;
- (float)getBMI;

@end
