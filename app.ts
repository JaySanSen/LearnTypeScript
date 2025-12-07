interface Person {
  firstName: string;
  lastName: string;
  sayHello: (name: string) => string;
}

let someUser: Person = {
  firstName: "Test",
  lastName: "User",
  // sayHello: function (name: string): string {
  //   return this.firstName + this.firstName;
  // }
  sayHello: function (name: string): string {
    return this.firstName + this.lastName;
  }
}

let printPerson = (person: Person): string => {
  return person.firstName + person.lastName;
}
console.log(printPerson(someUser));