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

**← Previous:** [Template Strings](./template-strings.md) | **Next:** [Additional Types](./additional-types.md) →