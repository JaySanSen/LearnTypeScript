# Variables in JavaScript and TypeScript

## Declaration Keywords

### var

The original JavaScript keyword for declaring variables. Function-scoped rather than block-scoped.

```javascript
var name = "John";
var age = 25;
```

### let

Introduced in ES6. Block-scoped, preferred over `var` in modern JavaScript.

```typescript
let name = "John";
let age = 25;
```

### const

Introduced in ES6. Block-scoped and cannot be reassigned after initialization. Use by default.

```typescript
const name = "John";
const age = 25;
```

## Primitive Data Types

### Boolean

A logical value that is either `true` or `false`.

```typescript
const isActive: boolean = true;
const isComplete: boolean = false;
```

### Number

Represents numeric values including integers and decimals.

```typescript
const count: number = 10;
const price: number = 19.99;
const negative: number = -5;
```

### String

Represents text values.

```typescript
const name: string = "John";
const message: string = "Hello, World!";
const template: string = `Hello, ${name}`;
```

### Array

A collection of elements, typically of the same type.

```typescript
const numbers: number[] = [1, 2, 3, 4];
const names: Array<string> = ["John", "Jane", "Bob"];
const mixed: (string | number)[] = ["John", 25, "Jane", 30];
```

### Tuple

A fixed-length array where each element has a specific type at a specific position.

```typescript
const tuple: [string, number] = ["John", 25];
const coordinates: [number, number, number] = [10, 20, 30];
const response: [string, number, boolean] = ["success", 200, true];
```

### Enum

A way to define a set of named constants. Useful for representing a fixed set of values.

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

const move: Direction = Direction.Up;
```

Numeric enums:

```typescript
enum Status {
  Pending = 0,
  Active = 1,
  Inactive = 2
}

const currentStatus: Status = Status.Active;
```

## Hoisting

### var Hoisting

Variables declared with `var` are hoisted to the top of their function scope. The declaration is moved up, but initialization stays in place.

```javascript
console.log(x); // undefined (hoisted but not initialized)
var x = 5;
console.log(x); // 5
```

This is equivalent to:

```javascript
var x;
console.log(x); // undefined
x = 5;
console.log(x); // 5
```

### let and const Hoisting

Variables declared with `let` and `const` are hoisted but not initialized. They remain in a "temporal dead zone" until the declaration is reached.

```javascript
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;
```

```javascript
console.log(z); // ReferenceError: Cannot access 'z' before initialization
const z = 20;
```

## Edge Cases and Gotchas

### var Redeclaration

Variables declared with `var` can be redeclared in the same scope:

```typescript
var name = "John";
var name = "Jane"; // No error - redeclaration allowed
console.log(name); // "Jane"
```

This is a source of bugs. `let` and `const` prevent redeclaration:

```typescript
let age = 25;
// let age = 30; // Error: Identifier 'age' has already been declared

const score = 95;
// const score = 100; // Error: Identifier 'score' has already been declared
```

### const Does Not Mean Immutable

`const` prevents reassignment but not mutation of objects and arrays:

```typescript
const user = { name: "John", age: 25 };
user.age = 26; // This is allowed - modifying object property
console.log(user.age); // 26

// But reassignment is not allowed:
// user = { name: "Jane", age: 30 }; // Error: cannot reassign
```

Same with arrays:

```typescript
const numbers = [1, 2, 3];
numbers[0] = 10; // Allowed - modifying array element
numbers.push(4); // Allowed - modifying array
console.log(numbers); // [10, 2, 3, 4]

// But reassignment is not allowed:
// numbers = [5, 6]; // Error: cannot reassign
```

To prevent mutation, use `readonly`:

```typescript
const readonlyArray: readonly number[] = [1, 2, 3];
// readonlyArray[0] = 10; // Error: readonly
```

### var Function Scope vs Block Scope

`var` is function-scoped, not block-scoped:

```typescript
function example() {
  if (true) {
    var x = 5;
  }
  console.log(x); // 5 (var leaks out of block)
}

function example2() {
  if (true) {
    let y = 5;
  }
  // console.log(y); // Error: y is not defined (let is block-scoped)
}
```

This can cause unexpected behavior:

```typescript
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 3, 3, 3 (i is 3 after loop ends)
  }, 100);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log(j); // 0, 1, 2 (correct - each iteration has its own j)
  }, 100);
}
```

### Temporal Dead Zone with let and const

Variables declared with `let` and `const` cannot be accessed before they are declared (temporal dead zone):

```typescript
console.log(x); // Error: Cannot access 'x' before initialization
let x = 5;
```

This is different from `var` which is initialized as `undefined`:

```typescript
console.log(y); // undefined (var is hoisted and initialized)
var y = 5;
```

### NaN Comparison

`NaN` is not equal to itself:

```typescript
const value = NaN;
console.log(value === NaN); // false (!)
console.log(Number.isNaN(value)); // true (correct way)
```

Use `Number.isNaN()` instead of `=== NaN`:

```typescript
const result = 0 / 0; // NaN
console.log(Number.isNaN(result)); // true
console.log(result === NaN); // false (incorrect comparison)
```

### Loose Equality with Type Coercion

Using `==` instead of `===` can cause unexpected type coercion:

```typescript
console.log(0 == false); // true (coercion happens)
console.log(0 === false); // false (different types)

console.log("5" == 5); // true (string coerced to number)
console.log("5" === 5); // false (different types)

console.log(null == undefined); // true
console.log(null === undefined); // false
```

Always use `===` for comparison in TypeScript:

```typescript
const x: number = 5;
const y: string = "5";

if (x === y) { // TypeScript error: types don't match
  // ...
}

if (x == y) { // No error but behavior is unexpected
  console.log("Equal by loose equality");
}
```

### let in Loops

Each iteration of a loop with `let` creates a new binding:

```typescript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2

// Compare with var:
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3
```

### Variable Shadowing

A variable in an inner scope can shadow (hide) one from an outer scope:

```typescript
let x = "outer";

{
  let x = "inner"; // Shadows outer x
  console.log(x); // "inner"
}

console.log(x); // "outer"
```

This can lead to confusing code. TypeScript will warn about this:

```typescript
let name = "John";

if (true) {
  let name = "Jane"; // Warning in strict mode
  console.log(name); // "Jane"
}
```

### Declaring Multiple Variables

Avoid declaring multiple variables with one `var` statement:

```typescript
// Confusing - easy to miss types
var a = 1, b = 2, c = 3;

// Better - explicit and clear
const a = 1;
const b = 2;
const c = 3;

// Or if they share a type:
const [a, b, c] = [1, 2, 3];
```

## Best Practices

- Use `const` by default for variables that won't be reassigned
- Use `let` when you need to reassign a variable
- Avoid `var` in modern JavaScript and TypeScript
- Declare variables close to where they are used
- Use meaningful variable names that describe their purpose
- Use `===` instead of `==` for comparison
- Be aware that `const` prevents reassignment but not mutation
- Remember `NaN !== NaN` - use `Number.isNaN()` instead

---

**← Previous:** [Initial Steps](./initial-step.md) | **Next:** [Type Annotations](./type-annotations.md) →
