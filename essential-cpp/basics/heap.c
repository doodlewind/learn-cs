#include <stdio.h>
#include <stdlib.h>

typedef struct {
  float height;
  int age;
  char *name;
} Person;

Person *updatePerson(Person *person);

Person *updatePerson(Person *person) {
  Person *newPerson = (Person *)malloc(sizeof(Person));
  newPerson->age = person->age + 1;
  newPerson->height = person->height + 1;
  newPerson->name = person->name;
  return newPerson;
}

int main(int argc, char *argv[]) {
  Person person;
  person.age = 20;
  person.height = 180.0;
  person.name = "Foo";

  Person *newPerson = updatePerson(&person);
  printf("%d %f %s\n", newPerson->age, newPerson->height, newPerson->name);

  free(newPerson);
  newPerson = NULL;

  return 0;
}
