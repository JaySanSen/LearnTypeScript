# Functions in TypeScript

Functions are reusable blocks of code that perform a specific task. TypeScript adds powerful type annotations to make functions safer and more predictable.

## Function Basics

### Function Declaration

The traditional way to declare a function:

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("John")); // Hello, John!
```

### Function Expression

Assigning a function to a variable:

```typescript
const add = function(a: number, b: number): number {
  return a + b;
};

console.log(add(5, 3)); // 8
```

### Arrow Functions

Concise syntax using the arrow (=>) operator:

```typescript
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Single expression - implicit return
const divide = (a: number, b: number): number => a / b;

// Single parameter - can omit parentheses
const square = (n: number): number => n * n;

// No parameters
const getRandom = (): number => Math.random();
```

## Type Annotations for Functions

### Parameter Type Annotations

Specify the type of each parameter:

```typescript
function calculateAge(birthYear: number): number {
  return new Date().getFullYear() - birthYear;
}

function fullName(first: string, last: string): string {
  return `${first} ${last}`;
}

function isEven(num: number): boolean {
  return num % 2 === 0;
}
```

### Return Type Annotations

Specify what type the function returns:

```typescript
function sum(a: number, b: number): number {
  return a + b;
}

function getName(): string {
  return "John";
}

function isEmpty(arr: any[]): boolean {
  return arr.length === 0;
}
```

### void Return Type

When a function doesn't return a value:

```typescript
function logMessage(message: string): void {
  console.log(message);
}

function saveData(data: object): void {
  // Process data without returning
  console.log("Data saved");
}
```

### Union Return Types

A function can return different types:

```typescript
function getUserById(id: number): { name: string; age: number } | null {
  if (id === 1) {
    return { name: "John", age: 25 };
  }
  return null;
}

function parseValue(value: string): string | number {
  const num = parseInt(value);
  return isNaN(num) ? value : num;
}

function findUser(id: number): string | null | undefined {
  if (id < 0) return undefined;
  if (id === 0) return null;
  return "User found";
}
```

## Optional Parameters

### The ? Syntax

In TypeScript, all parameters are required by default. Use `?` to make a parameter optional:

```typescript
function createUser(name: string, age?: number): void {
  console.log(`Name: ${name}`);
  if (age !== undefined) {
    console.log(`Age: ${age}`);
  }
}

createUser("John"); // Works - age is optional
createUser("Jane", 25); // Also works
```

### Required Parameter Order

**Important**: Optional parameters must come after all required parameters:

```typescript
// Correct
function createProfile(name: string, age?: number, email?: string): void {
  // ...
}

// Error: optional parameters before required
// function createProfile(name?: string, age: number, email: string): void {
//   // ...
// }
```

### Optional Parameters Are Undefined

When not provided, optional parameters are `undefined`:

```typescript
function processData(data: string, format?: string): void {
  console.log(format); // undefined if not provided
}

processData("data"); // format is undefined
processData("data", "json"); // format is "json"
```

## Default Parameters

### Setting Default Values

Provide a default value that's used if the parameter is not provided:

```typescript
function greet(name: string = "Guest"): string {
  return `Hello, ${name}!`;
}

console.log(greet()); // Hello, Guest!
console.log(greet("John")); // Hello, John!
```

### Expression as Default

Default values can be expressions or function calls:

```typescript
function getCurrentYear(): number {
  return new Date().getFullYear();
}

function createUser(name: string, year: number = getCurrentYear()): void {
  console.log(`User ${name} registered in ${year}`);
}

createUser("John"); // Calls getCurrentYear()
createUser("Jane", 2020); // Uses 2020
```

### Default Parameters as Optional

When a parameter has a default value and appears after required parameters, it's automatically treated as optional:

```typescript
function configure(host: string, port: number = 3000): void {
  console.log(`Server at ${host}:${port}`);
}

configure("localhost"); // Works - port uses default
configure("localhost", 8080); // Also works
```

You don't need the `?` when a default is provided:

```typescript
// These are equivalent:
function example1(name: string, age?: number = 18): void {}
// Just use the default:
function example2(name: string, age: number = 18): void {}
```

### Default Parameters with Undefined

If a caller explicitly passes `undefined`, the default value is used:

```typescript
function display(message: string = "No message"): void {
  console.log(message);
}

display(); // "No message" - uses default
display("Hello"); // "Hello"
display(undefined); // "No message" - undefined triggers default
```

## Rest Parameters

### Capturing Remaining Parameters

Use `...` to capture multiple arguments into an array:

```typescript
function sum(first: number, ...rest: number[]): number {
  return first + rest.reduce((acc, num) => acc + num, 0);
}

console.log(sum(1)); // 1
console.log(sum(1, 2, 3, 4, 5)); // 15
```

### Rest Parameter Rules

Rest parameters must be:
1. **Last in the parameter list** - must come after all other parameters
2. **A single array** - only one rest parameter allowed per function

```typescript
// Correct
function concat(separator: string, ...items: string[]): string {
  return items.join(separator);
}

console.log(concat(", ", "a", "b", "c")); // "a, b, c"

// Error: rest parameter must be last
// function badFunction(first: string, ...rest: string[], last: string): void {}

// Error: only one rest parameter
// function badFunction(...items: string[], ...more: string[]): void {}
```

### Rest with Mixed Types

```typescript
function process(id: number, ...args: (string | number)[]): void {
  console.log(`Processing ${id}`);
  args.forEach((arg) => console.log(arg));
}

process(1, "test", 2, "data", 3);
```

### Rest Parameters with Objects

```typescript
interface UserData {
  name: string;
  email: string;
}

function createUsers(...users: UserData[]): void {
  users.forEach((user) => {
    console.log(`Creating user: ${user.name}`);
  });
}

createUsers(
  { name: "John", email: "john@example.com" },
  { name: "Jane", email: "jane@example.com" }
);
```

## Function Type Annotations

### Function Types

Define the type of a function itself:

```typescript
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;

console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2
```

### Function Interfaces

Use interfaces to define function signatures:

```typescript
interface Logger {
  (message: string): void;
}

const consoleLogger: Logger = (message) => {
  console.log(message);
};

const fileLogger: Logger = (message) => {
  // Write to file
};
```

### Callable Objects

Objects that can be called as functions:

```typescript
interface Formatter {
  (input: string): string;
  name: string;
}

const uppercase: Formatter = (input: string) => input.toUpperCase();
uppercase.name = "Uppercase Formatter";

console.log(uppercase("hello")); // HELLO
console.log(uppercase.name); // "Uppercase Formatter"
```

## Advanced Function Features

### Function Overloading

Define multiple signatures for the same function:

```typescript
function process(value: string): string;
function process(value: number): number;
function process(value: string | number): string | number {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value * 2;
}

console.log(process("hello")); // HELLO
console.log(process(5)); // 10
```

### Generic Functions

Functions that work with any type:

```typescript
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("hello")); // "hello"
console.log(identity<number>(42)); // 42
console.log(identity("hi")); // Type inferred as string
```

More complex example:

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "John", age: 25 };
const name = getProperty(user, "name"); // Type is string
const age = getProperty(user, "age"); // Type is number
```

### Callback Functions

Functions that receive other functions as parameters:

```typescript
function process(data: number[], callback: (item: number) => void): void {
  data.forEach(callback);
}

process([1, 2, 3], (item) => {
  console.log(item * 2);
});
```

With return types:

```typescript
function transform<T, U>(
  items: T[],
  transform: (item: T) => U
): U[] {
  return items.map(transform);
}

const numbers = [1, 2, 3];
const strings = transform(numbers, (n) => n.toString());
console.log(strings); // ["1", "2", "3"]
```

## this Binding

### Explicit this Type

Specify what `this` refers to in a function:

```typescript
interface User {
  name: string;
  greet(this: User): void;
}

const user: User = {
  name: "John",
  greet(this: User) {
    console.log(`Hello, I'm ${this.name}`);
  }
};

user.greet(); // OK
// const greetFunc = user.greet;
// greetFunc(); // Error: this is not User
```

### Arrow Functions and this

Arrow functions inherit `this` from their context:

```typescript
const obj = {
  name: "John",
  regularFunction: function() {
    console.log(this.name); // "John"
  },
  arrowFunction: () => {
    console.log(this.name); // undefined (this from outer scope)
  }
};

obj.regularFunction();
obj.arrowFunction();
```

## Edge Cases and Gotchas

### Missing Return Statements

TypeScript catches functions that might not return in all paths:

```typescript
// Error with strict mode
function getValue(flag: boolean): string {
  if (flag) {
    return "yes";
  }
  // Missing return for false case
}

// Fix: explicit returns
function getValue(flag: boolean): string {
  return flag ? "yes" : "no";
}
```

### Optional Chaining in Functions

Use optional chaining when calling optional function properties:

```typescript
interface Config {
  onSuccess?: (data: any) => void;
}

function process(config: Config): void {
  config.onSuccess?.(data); // Calls only if function exists
}
```

### Function Hoisting

Function declarations are hoisted, but expressions are not:

```typescript
console.log(declared()); // Works - function is hoisted

function declared(): string {
  return "I'm hoisted";
}

// console.log(expression()); // Error - undefined

const expression = (): string => {
  return "I'm not hoisted";
};
```

### Rest Parameters and Spread Operator

Rest parameters work with spread when calling:

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

const arr = [1, 2, 3, 4];
console.log(sum(...arr)); // Spreads array as arguments
```

### Parameter Shadowing

Parameters shadow outer scope variables:

```typescript
const name = "Global";

function getName(name: string): string {
  return name; // Returns parameter, not global
}

console.log(getName("Local")); // "Local"
console.log(name); // "Global"
```

### Implicit any in Parameters

Without strict mode, parameters default to any:

```typescript
// Without strictMode - allowed but bad
function process(data) {
  // data is any
  return data.toUpperCase(); // Might crash at runtime
}

// With strictMode - error
// function process(data) { // Error: no type
// }
```

Enable strict mode in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true
  }
}
```

### Return Type Inference

TypeScript infers return types but explicit is better:

```typescript
// Inferred - returns number
function add(a: number, b: number) {
  return a + b;
}

// Explicit - clearer intent
function add(a: number, b: number): number {
  return a + b;
}
```

### Async Functions and Promises

```typescript
// Regular function
function getData(): Promise<string> {
  return fetch("/api").then((res) => res.json());
}

// Async function - cleaner
async function getData(): Promise<string> {
  const res = await fetch("/api");
  return res.json();
}

// Error handling
async function safeGetData(): Promise<string | null> {
  try {
    const res = await fetch("/api");
    return res.json();
  } catch {
    return null;
  }
}
```

## Best Practices

- Always annotate function parameters and return types
- Use `void` for functions with no return value
- Make parameters explicit: required vs optional vs default
- Use rest parameters for variable arguments instead of arguments
- Prefer arrow functions unless you need `this` binding
- Use function types or interfaces to define function signatures
- Enable strict mode in `tsconfig.json` to catch errors early
- Use generic functions for reusable, type-safe code
- Document complex functions with JSDoc comments
- Avoid implicit any - always provide types

## Comparison: Parameter Types

| Type | Syntax | Required | Default | Example |
|------|--------|----------|---------|---------|
| Required | `name: string` | Yes | No | `name: string` |
| Optional | `name?: string` | No | undefined | `name?: string` |
| Default | `name: string = "John"` | No | Specified | `name: string = "John"` |
| Rest | `...items: string[]` | No | [] | `...items: string[]` |

---

**← Previous:** [Conditionals and Loops](./conditionals-and-loops.md) | **Next:** [Promises and Async/Await](./promises-and-async-await.md) →