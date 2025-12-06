console.log("Hello World");

function Hello(name: string): string {
  return `Hello ${name}`;
}

let checkNumber: number = 10;

switch (checkNumber) {
  case 1:
    console.log("1");
    break;
  case 2:
    console.log("2");
    break;
  case 3:
    console.log("3");
    break;
  case 1:
    console.log("4");
    break;
  case 10:
    console.log("10");
    break;
  default:
    break;
}