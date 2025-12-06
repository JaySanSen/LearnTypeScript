# Additional Types

TypeScript provides several special types beyond the basic primitives. These types help you express specific constraints and requirements in your code.

## Void

The `void` type indicates that a function does not return a value.

```typescript
function logMessage(message: string): void {
  console.log(message);
}

function printUser(name: string, age: number): void {
  console.log(`${name} is ${age} years old`);
}

const result = logMessage("Hello"); // result is undefined
```

Use `void` when:
- A function only performs side effects (logging, updating state, etc.)
- You explicitly want to indicate the function returns nothing

```typescript
// Good use of void
function saveToDatabase(data: object): void {
  // Save data, no return value
  console.log("Data saved");
}

// Alternative: omit return type if function doesn't return
function sendEmail(to: string): void {
  // Send email
  console.log(`Email sent to ${to}`);
}
```

## Null

The `null` type represents the intentional absence of any object value.

```typescript
let value: null = null;
value = null; // valid

// In a union type
let data: string | null = "hello";
data = null;    // valid
data = "world"; // valid
// data = 123;  // error
```

Use `null` when:
- A value is intentionally empty or missing
- An operation might not produce a result

```typescript
function findUser(id: number): User | null {
  // Return user if found, null if not found
  if (id === 1) {
    return { id: 1, name: "John" };
  }
  return null;
}

const user = findUser(2); // User | null
```

## Undefined

The `undefined` type represents a variable that has been declared but not assigned a value.

```typescript
let value: undefined = undefined;

function doSomething(): undefined {
  // Function explicitly returns undefined
}

// In a union type
let result: number | undefined;
result = 10;        // valid
result = undefined; // valid
// result = null;   // error (unless null is also in the union)
```

Use `undefined` when:
- A function parameter is optional
- A variable might not have been initialized

```typescript
function greet(name?: string): void {
  if (name === undefined) {
    console.log("Hello, stranger!");
  } else {
    console.log(`Hello, ${name}!`);
  }
}

greet();      // Hello, stranger!
greet("John"); // Hello, John!
```

## Never

The `never` type represents a value that will never occur. It's used for functions that never return normally (they either throw an error or run infinitely).

```typescript
// Function that throws an error
function throwError(message: string): never {
  throw new Error(message);
}

// Function with infinite loop
function infiniteLoop(): never {
  while (true) {
    console.log("Running forever...");
  }
}

// Function that returns never through exhaustion
function assertNever(x: never): never {
  throw new Error("Should not reach here: " + x);
}
```

Common use cases for `never`:

### Type Guards and Exhaustiveness Checking

```typescript
type Status = "active" | "inactive" | "pending";

function handleStatus(status: Status): string {
  switch (status) {
    case "active":
      return "User is active";
    case "inactive":
      return "User is inactive";
    case "pending":
      return "User is pending";
    // If you forget a case, TypeScript will error
    // default:
    //   return assertNever(status); // Catches missing cases
  }
}
```

### Error Handling

```typescript
function processData(data: string): void {
  if (data === "") {
    throwError("Data cannot be empty");
    // Code after throwError is unreachable (never returns)
  }
  console.log(data);
}
```

## Any

The `any` type disables type checking. Avoid it unless absolutely necessary, as it defeats TypeScript's purpose.

```typescript
let value: any = "hello";
value = 123;
value = true;
value.anyMethodAtAll(); // No error, but might fail at runtime
```

Why avoid `any`:
- Loses type safety
- IDE autocomplete becomes less helpful
- Bugs can hide until runtime
- Makes code harder to refactor

```typescript
// BAD - using any
function processData(data: any): any {
  return data.toUpperCase(); // Works if string, fails if not
}

// GOOD - be specific
function processData(data: string): string {
  return data.toUpperCase();
}
```

**Exception**: Sometimes `any` is acceptable for:
- Legacy code integration
- Working with untyped third-party libraries
- Temporary solutions (mark with a TODO)

```typescript
// Acceptable use of any with comment
// TODO: Remove this 'any' type once library is upgraded
const legacyData: any = getLegacyLibraryData();
```

## Union Types

A union type indicates a value can be one of several types. Use the pipe (`|`) operator:

```typescript
let id: string | number;
id = "ABC123"; // valid
id = 123;      // valid
// id = true;  // error
```

### Multiple Types in Union

```typescript
let value: string | number | boolean;
value = "hello";  // valid
value = 42;       // valid
value = true;     // valid
// value = null; // error

// With null/undefined
let optional: string | null;
optional = "text"; // valid
optional = null;   // valid
// optional = 123; // error

let maybe: string | undefined;
maybe = "text";    // valid
maybe = undefined; // valid
```

### Union Types in Functions

```typescript
function formatId(id: string | number): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  } else {
    return id.toString();
  }
}

console.log(formatId("abc"));    // ABC
console.log(formatId(123));      // 123
```

### Union Types with Objects

```typescript
interface Admin {
  role: "admin";
  permissions: string[];
}

interface User {
  role: "user";
  name: string;
}

function getUserInfo(account: Admin | User): string {
  if (account.role === "admin") {
    return `Admin with ${account.permissions.length} permissions`;
  } else {
    return `User ${account.name}`;
  }
}
```

## Type Narrowing

When using union types, TypeScript requires you to narrow the type before using type-specific operations:

```typescript
function process(value: string | number): void {
  // value is string | number here

  if (typeof value === "string") {
    // value is narrowed to string here
    console.log(value.toUpperCase());
  } else {
    // value is narrowed to number here
    console.log(value.toFixed(2));
  }
}
```

## Summary Table

| Type | Example | Use Case |
|------|---------|----------|
| `void` | `function log(): void` | Functions that don't return |
| `null` | `let x: null = null` | Intentional absence |
| `undefined` | `let x: undefined` | Uninitialized variables |
| `never` | `function error(): never` | Functions that never return |
| `any` | `let x: any` | Disable type checking (avoid!) |
| Union | `string \| number` | Multiple possible types |

---

**← Previous:** [Arrays](./arrays.md) | **Next:** [Functions](./functions.md) →