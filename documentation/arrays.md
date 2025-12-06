# Arrays in TypeScript

Arrays are collections of values that can be typed to ensure consistency. TypeScript allows you to specify what type of values an array can contain.

## Array Type Syntax

### Bracket Notation

The most common way to declare an array type:

```typescript
const numbers: number[] = [1, 2, 3, 4, 5];
const strings: string[] = ["apple", "banana", "orange"];
const booleans: boolean[] = [true, false, true];
```

### Generic Syntax

Using the `Array<T>` generic syntax (alternative to bracket notation):

```typescript
const numbers: Array<number> = [1, 2, 3, 4, 5];
const strings: Array<string> = ["apple", "banana", "orange"];
const booleans: Array<boolean> = [true, false, true];
```

Both syntaxes are equivalent. Use whichever you prefer.

## Array Inference

TypeScript can infer array types automatically:

```typescript
const numbers = [1, 2, 3];           // inferred as number[]
const strings = ["a", "b"];          // inferred as string[]
const mixed = [1, "hello", true];    // inferred as (number | string | boolean)[]
```

## Multi-Type Arrays

### Union Types in Arrays

When an array should contain multiple types, use union types:

```typescript
const mixed: (string | number)[] = [1, "hello", 2, "world"];

const data: (string | number | boolean)[] = [
  "name",
  25,
  true,
  "active"
];
```

### Array of Objects

```typescript
interface User {
  name: string;
  age: number;
}

const users: User[] = [
  { name: "John", age: 25 },
  { name: "Jane", age: 28 },
  { name: "Bob", age: 30 }
];
```

### Array of Arrays

```typescript
const matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const stringMatrix: string[][] = [
  ["a", "b"],
  ["c", "d"]
];
```

## Common Array Methods

All JavaScript array methods are available in TypeScript with type safety:

### Iteration Methods

```typescript
const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map((n) => n * 2);
// Result: [2, 4, 6, 8, 10]

// filter - keep elements that match condition
const evens = numbers.filter((n) => n % 2 === 0);
// Result: [2, 4]

// forEach - execute function for each element
numbers.forEach((n) => console.log(n));

// find - get first element matching condition
const found = numbers.find((n) => n > 3);
// Result: 4
```

### Modification Methods

```typescript
const items = ["a", "b", "c"];

// push - add to end
items.push("d");
// Result: ["a", "b", "c", "d"]

// pop - remove from end
const last = items.pop();
// Result: last = "d", items = ["a", "b", "c"]

// unshift - add to beginning
items.unshift("z");
// Result: ["z", "a", "b", "c"]

// shift - remove from beginning
const first = items.shift();
// Result: first = "z", items = ["a", "b", "c"]

// splice - add/remove elements at any position
items.splice(1, 1, "x", "y");
// Removes 1 element at index 1, adds "x" and "y"
```

### Search and Aggregate Methods

```typescript
const numbers = [1, 2, 3, 4, 5];

// includes - check if array contains value
const has3 = numbers.includes(3);
// Result: true

// indexOf - find index of element
const index = numbers.indexOf(3);
// Result: 2

// reduce - combine all elements
const sum = numbers.reduce((acc, n) => acc + n, 0);
// Result: 15

// every - check if all elements match condition
const allPositive = numbers.every((n) => n > 0);
// Result: true

// some - check if any element matches condition
const hasEven = numbers.some((n) => n % 2 === 0);
// Result: true
```

## Readonly Arrays

Prevent modification of array contents:

```typescript
const readonlyNumbers: readonly number[] = [1, 2, 3];

// These will cause TypeScript errors:
// readonlyNumbers.push(4);
// readonlyNumbers[0] = 10;
// readonlyNumbers.pop();
```

## Avoid Using `any[]`

Never use `any[]` as it defeats the purpose of TypeScript's type safety:

```typescript
// BAD - loses all type safety
const items: any[] = [1, "hello", true, { name: "John" }];
const result = items[0].toUpperCase(); // No error, but will fail at runtime!

// GOOD - use union types instead
const items: (number | string | boolean | { name: string })[] = [
  1,
  "hello",
  true,
  { name: "John" }
];
const result = items[1]; // TypeScript knows this is string | number | ...
```

## Examples

### Working with User Data

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", active: true },
  { id: 2, name: "Bob", email: "bob@example.com", active: false },
  { id: 3, name: "Charlie", email: "charlie@example.com", active: true }
];

// Get all active users
const activeUsers = users.filter((u) => u.active);

// Get user names
const names = users.map((u) => u.name);

// Find specific user
const user = users.find((u) => u.id === 2);

// Check if any user is inactive
const hasInactive = users.some((u) => !u.active);
```

### Processing Numbers

```typescript
const scores = [85, 92, 78, 95, 88];

// Calculate average
const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
// Result: 87.6

// Get top scores
const topScores = scores.filter((s) => s >= 90);
// Result: [92, 95]

// Grade each score
const grades = scores.map((s) => {
  if (s >= 90) return "A";
  if (s >= 80) return "B";
  if (s >= 70) return "C";
  return "F";
});
// Result: ["B", "A", "C", "A", "B"]
```

---

## Edge Cases and Gotchas

### Sparse Arrays

Arrays can have empty slots (uninitialized indices):

```typescript
const arr = [1, , 3]; // Index 1 is empty
console.log(arr.length); // 3
console.log(arr[1]); // undefined
console.log(1 in arr); // false - index 1 doesn't exist
```

Methods behave differently with sparse arrays:

```typescript
const sparse = [1, , 3];

sparse.forEach((item) => console.log(item)); // Logs: 1, 3 (skips empty)
sparse.map((item) => item * 2); // [2, empty, 6] (preserves sparse structure)
```

Avoid creating sparse arrays accidentally:

```typescript
const arr: number[] = [];
arr[5] = 10; // Creates sparse array with indices 0-4 empty
console.log(arr.length); // 6
```

### Negative Indices

JavaScript arrays don't support negative indices like Python:

```typescript
const arr = [1, 2, 3];
console.log(arr[-1]); // undefined (not 3)

// Use at() method for negative indices (newer feature):
console.log(arr.at(-1)); // 3 (last element)
console.log(arr.at(-2)); // 2 (second to last)
```

### Array Type Assumptions

Array methods can have unexpected return types:

```typescript
const numbers = [1, 2, 3];
const found = numbers.find((n) => n > 5); // Type is number | undefined
console.log(found); // undefined

// Must handle undefined:
if (found !== undefined) {
  console.log(found * 2);
}
```

### Array Methods and Type Narrowing

Some methods don't preserve type information:

```typescript
const values: (string | number)[] = ["a", 1, "b", 2];

// Incorrect way:
const strings = values.filter((v) => typeof v === "string"); // Type is still (string | number)[]

// Correct way: use type guard
const strings = values.filter((v): v is string => typeof v === "string"); // Type is string[]
```

### Modifying Arrays During Iteration

Modifying an array while iterating can cause unexpected behavior:

```typescript
const arr = [1, 2, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 3) {
    arr.splice(i, 1); // Removes element
  }
}
console.log(arr); // [1, 2, 4, 5]

// The issue: when you remove an element, indices shift
// It's safer to iterate backwards:
for (let i = arr.length - 1; i >= 0; i--) {
  if (arr[i] === 3) {
    arr.splice(i, 1);
  }
}
```

### Array Methods Return Type Issues

Different array methods have different return behaviors:

```typescript
const numbers = [1, 2, 3];

// map returns an array
const doubled = numbers.map((n) => n * 2); // number[]

// filter returns an array
const evens = numbers.filter((n) => n % 2 === 0); // number[]

// find returns single element or undefined
const first = numbers.find((n) => n > 1); // number | undefined

// forEach returns nothing
const result = numbers.forEach((n) => console.log(n)); // void

// reduce requires you to specify accumulator type
const sum = numbers.reduce((acc, n) => acc + n, 0); // number
```

### Array.isArray() for Type Checking

You can't always rely on `instanceof Array`:

```typescript
const arr = [1, 2, 3];
console.log(arr instanceof Array); // true
console.log(Array.isArray(arr)); // true (preferred)

// Use Array.isArray() for type safety:
function processArray(data: unknown): void {
  if (Array.isArray(data)) {
    console.log(data.length); // Safe
  }
}
```

### Empty Array Type Inference

An empty array literal is inferred as `any[]`:

```typescript
const arr = []; // Type is any[]

// Push elements:
arr.push(1); // Still any[]
arr.push("text"); // Still any[]

// To fix: be explicit
const arr2: number[] = []; // Type is number[]
```

### Array of Array Edge Cases

Nested arrays can be confusing with type inference:

```typescript
const matrix = [
  [1, 2],
  [3, 4]
]; // Type is number[][]

// But what if rows have different lengths?
const jagged = [
  [1, 2, 3],
  [4, 5],
  [6]
]; // Still number[][]

// And mixed types?
const mixed = [
  [1, "a"],
  [2, "b"]
]; // Type is (number | string)[][]
```

### Array Equality

Arrays are compared by reference, not by value:

```typescript
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];

console.log(arr1 === arr2); // false (different references)
console.log(arr1 == arr2); // false (even with loose equality)

// To compare contents, use methods:
console.log(arr1.toString() === arr2.toString()); // true
console.log(JSON.stringify(arr1) === JSON.stringify(arr2)); // true

// Or write a comparison function:
function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
}
```

### Readonly Array Mutation

`readonly` prevents direct mutation but doesn't prevent object mutation:

```typescript
const arr: readonly { name: string }[] = [{ name: "John" }];

// arr[0] = { name: "Jane" }; // Error - can't reassign

arr[0].name = "Jane"; // This works - object is still mutable
```

### Array Methods and this Binding

Arrow functions vs regular functions behave differently:

```typescript
const obj = {
  multiplier: 2,
  multiply(arr: number[]): number[] {
    return arr.map(function(n) {
      return n * this.multiplier; // 'this' is wrong (undefined)
    });
  }
};

// Fix 1: Use arrow function
multiply(arr: number[]): number[] {
  return arr.map((n) => n * this.multiplier); // 'this' is correct
}

// Fix 2: Use bind
multiply(arr: number[]): number[] {
  return arr.map(function(n) {
    return n * this.multiplier;
  }.bind(this));
}
```

### Array Constructor vs Literal

The `Array()` constructor can behave unexpectedly:

```typescript
const arr1 = [5]; // Array with one element: [5]
const arr2 = new Array(5); // Array with 5 empty slots: [empty × 5]

console.log(arr1.length); // 1
console.log(arr2.length); // 5
console.log(arr2[0]); // undefined
```

Always use array literals `[]`:

```typescript
const arr = [1, 2, 3]; // Clear intent
```

### Destructuring and Rest Elements

Be careful with rest elements in destructuring:

```typescript
const [first, ...rest] = [1, 2, 3, 4];
console.log(first); // 1
console.log(rest); // [2, 3, 4]

// Multiple rest elements not allowed:
// const [a, ...b, ...c] = arr; // Error

// Rest must be last:
// const [a, ...b, c] = arr; // Error
```

## Best Practices for Arrays

- Use specific array types: `number[]` not `any[]`
- Check if element exists before accessing: `if (arr.length > 0)`
- Use `Array.isArray()` for runtime type checking
- Be explicit about array element types in unions
- Use `readonly` for arrays that shouldn't be modified
- Avoid modifying arrays while iterating
- Use arrow functions in array methods to preserve `this`
- Handle undefined returns from `find()` and similar methods
- Be explicit about empty array types to avoid `any[]`

---

**← Previous:** [Template Strings](./template-strings.md) | **Next:** [Additional Types](./additional-types.md) →