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

## Edge Cases and Gotchas

### null vs undefined

They're different but often used interchangeably:

```typescript
let x = null; // Intentional absence
let y = undefined; // Uninitialized

console.log(x === y); // false (different types)
console.log(x == y); // true (loose equality)
```

Function parameters with `undefined`:

```typescript
function greet(name?: string): void {
  // name can be undefined if omitted
  console.log(name); // undefined if not provided
}

greet(); // OK - name is undefined
```

Return `undefined` vs `null` from functions:

```typescript
function findUser(id: number): User | undefined {
  // Return undefined if not found
  return null; // This works but inconsistent
}

// Better: choose one convention
function findUser(id: number): User | null {
  return null; // Consistent
}
```

### Falsy Comparisons

Different falsy values behave differently:

```typescript
const zero = 0;
const empty = "";
const nothing = null;
const notSet = undefined;
const impossible = NaN;

// All falsy, but not equal to each other:
console.log(zero == nothing); // true (loose equality)
console.log(zero === nothing); // false

console.log(empty == nothing); // true (loose equality)
console.log(empty === nothing); // false

console.log(NaN === NaN); // false (special case!)
console.log(Number.isNaN(NaN)); // true (correct way)
```

### Void Return Type Issues

`void` functions can return values (but they're ignored):

```typescript
function doSomething(): void {
  return; // OK
}

function doSomething(): void {
  return undefined; // Also OK
}

function doSomething(): void {
  return "value"; // Technically OK but strange
}

// Calling void function
const result = doSomething(); // result is undefined (return value ignored)
```

Variables of type `void` are rare and mostly unused:

```typescript
let x: void;
x = undefined; // OK
// x = null; // Error if strict null checks enabled
```

### Never Type Confusion

`never` is easy to confuse with `void`:

```typescript
// void = function returns nothing useful
function log(): void {
  console.log("hello");
}

// never = function never returns (throws or infinite loop)
function throwError(): never {
  throw new Error("error");
}

function infiniteLoop(): never {
  while (true) {}
}
```

`never` is useful for exhaustiveness checking:

```typescript
type Status = "active" | "inactive";

function handleStatus(status: Status): void {
  switch (status) {
    case "active":
      console.log("Active");
      break;
    case "inactive":
      console.log("Inactive");
      break;
    // If you add a new status without handling it:
    // default:
    //   const exhaustive: never = status; // Error: not handled
  }
}
```

### Any Propagates Everywhere

Once you use `any`, it spreads:

```typescript
const data: any = getData();

// All of these become any:
const name = data.name; // any
const age = data.age; // any
const result = name.toUpperCase(); // any (no error check!)
```

`any` in function parameters:

```typescript
function process(x: any): void {
  x.unknownMethod(); // No error, but might crash
}

function process(x: unknown): void {
  // x.unknownMethod(); // Error - must narrow type first
  if (typeof x === "object" && x !== null && "unknownMethod" in x) {
    (x as any).unknownMethod(); // Still explicit about the danger
  }
}
```

### Union Type Narrowing

You must narrow union types before using type-specific operations:

```typescript
function process(value: string | number): void {
  // console.log(value.toUpperCase()); // Error: number doesn't have toUpperCase

  if (typeof value === "string") {
    console.log(value.toUpperCase()); // OK - narrowed to string
  } else {
    console.log(value.toFixed(2)); // OK - narrowed to number
  }
}
```

With objects, narrowing is different:

```typescript
type Admin = { role: "admin"; permissions: string[] };
type User = { role: "user"; name: string };

function getInfo(account: Admin | User): string {
  if (account.role === "admin") {
    return `Admin: ${account.permissions.join(", ")}`;
  } else {
    return `User: ${account.name}`;
  }
}
```

### Type Coercion in Comparisons

Using `==` instead of `===` causes unexpected coercion:

```typescript
const value: string | null = "5";

if (value == 5) {
  // This is true due to type coercion!
  console.log("Equal"); // Runs
}

// Always use ===
if (value === 5) {
  // False - different types
  console.log("Equal"); // Doesn't run
}
```

With null and undefined:

```typescript
const x: null | undefined = null;

if (x == null) {
  console.log("Is null or undefined"); // true
}

if (x === null) {
  console.log("Definitely null"); // true
}

if (x === undefined) {
  console.log("Definitely undefined"); // false
}
```

### Strict Null Checks

Enable `strictNullChecks` in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

Without it, `null` and `undefined` are assignable to all types:

```typescript
let x: string = null; // Error with strictNullChecks, OK without
let y: number = undefined; // Error with strictNullChecks, OK without
```

With strict checks, you must be explicit:

```typescript
let x: string | null = null; // Required for null
let y: string | undefined = undefined; // Required for undefined
```

### Type Guards for Union Narrowing

Different types require different guards:

```typescript
type Input = string | number | boolean;

function process(input: Input): void {
  // Type guards
  if (typeof input === "string") {
    console.log(input.toUpperCase());
  } else if (typeof input === "number") {
    console.log(input.toFixed(2));
  } else if (typeof input === "boolean") {
    console.log(!input);
  }
}

// For objects, use custom type guards:
interface Dog { bark(): void }
interface Cat { meow(): void }

function isCat(pet: Cat | Dog): pet is Cat {
  return "meow" in pet;
}

function play(pet: Cat | Dog): void {
  if (isCat(pet)) {
    pet.meow();
  } else {
    pet.bark();
  }
}
```

### Literal Types vs Union

Be careful with literal type inference:

```typescript
const direction = "up"; // Inferred as string, not literal "up"

// Explicit literal type:
const direction: "up" = "up"; // Type is exactly "up"

// Union of literals:
const direction: "up" | "down" | "left" | "right" = "up";

// Can cause issues:
const direction = "up";
function move(dir: "up" | "down"): void {}
// move(direction); // Error: string is not assignable to "up" | "down"

// Fix:
move(direction as "up"); // Type assertion
```

### Never in Array Filtering

`never` can appear in filtered arrays:

```typescript
const values: (string | number)[] = ["a", 1, "b", 2];

// Without proper type guard:
const strings = values.filter((v) => typeof v === "string"); // Type is (string | number)[]

// With type guard:
const strings = values.filter((v): v is string => typeof v === "string"); // Type is string[]

// Without the type guard, the type system thinks anything could pass through
```

### Optional Chaining vs Null Coalescing

Different operators for different purposes:

```typescript
const user = { profile: null };

// Optional chaining (?.) - access property safely
const name = user.profile?.name; // undefined (doesn't crash)

// Nullish coalescing (??) - default for null/undefined
const displayName = name ?? "Unknown"; // "Unknown"

// Different from || which treats falsy values:
const x = 0 || 10; // 10 (0 is falsy)
const y = 0 ?? 10; // 0 (only null/undefined trigger default)
```

## Best Practices for Special Types

- Always use `===` instead of `==` for comparisons
- Distinguish between `null` and `undefined` in your code
- Use union types instead of `any` when possible
- Always narrow union types before using type-specific operations
- Enable `strictNullChecks` in `tsconfig.json` for better safety
- Use `void` for functions that don't return values
- Use `never` for functions that never return or for exhaustiveness checking
- Prefer `unknown` over `any` when the type is truly unknown
- Use `as never` or explicit type guards for difficult cases
- Document when functions can return `null` vs `undefined`

---

**← Previous:** [Arrays](./arrays.md) | **Next:** [Conditionals and Loops](./conditionals-and-loops.md) →