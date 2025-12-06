# Type Annotations and Type Inference

## Type Annotations

Type annotations explicitly specify what type a variable, parameter, or return value should have. This is a TypeScript feature that helps catch errors at compile time.

### Variable Type Annotations

Specify the type when declaring a variable:

```typescript
const name: string = "John";
const age: number = 25;
const isActive: boolean = true;
```

### Function Parameter Type Annotations

Specify types for function parameters and return values:

```typescript
function add(a: number, b: number): number {
  return a + b;
}

const result = add(5, 10); // 15
```

### Function Return Type Annotations

Explicitly declare what type a function returns:

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}

function getCount(): number {
  return 42;
}

function logMessage(message: string): void {
  console.log(message);
}
```

### Array Type Annotations

```typescript
const numbers: number[] = [1, 2, 3];
const strings: Array<string> = ["a", "b", "c"];
const mixed: (string | number)[] = ["text", 42, "more"];
```

### Union Types

Specify that a variable can be one of several types:

```typescript
let value: string | number;
value = "hello"; // valid
value = 42;      // valid
value = true;    // error
```

### Custom Types with Interfaces

Define the structure of objects:

```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

const user: User = {
  name: "John",
  age: 25,
  email: "john@example.com"
};
```

## Type Inference

TypeScript automatically determines the type of a variable based on the value assigned to it. You don't always need to explicitly write type annotations.

### Basic Inference

```typescript
const name = "John";        // inferred as string
const age = 25;             // inferred as number
const isActive = true;      // inferred as boolean
```

TypeScript looks at the initial value and assigns the type based on it.

### Array Inference

```typescript
const numbers = [1, 2, 3];  // inferred as number[]
const items = ["a", "b"];   // inferred as string[]
const mixed = [1, "a"];     // inferred as (number | string)[]
```

### Function Return Type Inference

```typescript
function add(a: number, b: number) {
  return a + b; // return type inferred as number
}

function greet(name: string) {
  return `Hello, ${name}`; // return type inferred as string
}
```

### When to Use Explicit Annotations

Even though TypeScript can infer types, use explicit annotations for:

- Function parameters (always annotate, inference is limited)
- Function return types (helps clarify intent and catch errors)
- Complex or ambiguous types
- Public APIs and interfaces
- Variables where the intended type may not match the assigned value

```typescript
// Good: explicit annotations for clarity
function processUser(user: User): boolean {
  return user.age >= 18;
}

// Can infer: simple cases
const count = 10; // clearly a number
```

## Combining Annotations and Inference

Use annotations where it adds clarity, and let TypeScript infer the rest:

```typescript
// Explicit parameter types, inferred return type
function multiply(a: number, b: number) {
  return a * b; // return type inferred as number
}

// Explicit for variable, inferred for array elements
const ids: number[] = [1, 2, 3]; // elements are numbers

// Object with mixed explicit and inferred types
interface Config {
  timeout: number;      // explicit
  retries: number;
  enabled: boolean;
}

const config: Config = {
  timeout: 5000,       // inferred as number
  retries: 3,
  enabled: true
};
```

## Benefits of Type Annotations

- Catch errors at compile time before running code
- Improve code readability and documentation
- Enable better IDE autocomplete and suggestions
- Make refactoring safer
- Serve as inline documentation

---

## Edge Cases and Gotchas

### Type Inference Can Be Too Broad

Sometimes TypeScript infers a type that's wider than you expect:

```typescript
let value = true; // Inferred as boolean, not literal true

// You might expect:
const isActive: true = true; // Literal type true
// But if you omit the type:
let value = true; // Type is boolean (can be true or false)

value = false; // This is allowed
```

Be explicit when you want a literal type:

```typescript
const direction: "up" | "down" | "left" | "right" = "up";
// Not just: let direction = "up"; (would be string)
```

### Any Escapes Type Checking

Using `any` anywhere can cause problems downstream:

```typescript
function process(data: any): void {
  // TypeScript doesn't check this
  console.log(data.toUpperCase()); // Might crash if data isn't a string
}

process(123); // No error, but runtime error!
```

`any` is contagious—if a function returns `any`, callers can't use type checking:

```typescript
function getData(): any {
  return { name: "John" };
}

const result = getData();
console.log(result.age.toUpperCase()); // No error, but will crash at runtime
```

### Union Types Need Narrowing

You can't use a property/method that doesn't exist on all union members:

```typescript
function formatValue(value: string | number): void {
  console.log(value.toUpperCase()); // Error: number doesn't have toUpperCase
}

// Must narrow the type first:
function formatValue(value: string | number): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // Now OK
  } else {
    console.log(value.toFixed(2));
  }
}
```

### Function Parameter Defaults

When you use a default parameter, the type is inferred:

```typescript
function greet(name = "Guest"): void {
  console.log(`Hello, ${name}`);
}
// name is inferred as string

// But you can still pass undefined:
greet(undefined); // Prints "Hello, Guest"
```

To prevent undefined, be explicit:

```typescript
function greet(name: string = "Guest"): void {
  // name is now string (never undefined)
}

// greet(undefined); // Now error
```

### Return Type Inference Can Miss Cases

TypeScript infers return types, but it doesn't always catch all paths:

```typescript
function getValue(flag: boolean): string {
  if (flag) {
    return "yes";
  }
  // Missing return for false case - but TypeScript might not catch it
}

// Better: be explicit
function getValue(flag: boolean): string {
  if (flag) {
    return "yes";
  } else {
    return "no";
  }
}
```

Use strict mode in `tsconfig.json` to catch missing returns:

```json
{
  "compilerOptions": {
    "strictNullChecks": true,
    "noImplicitReturns": true
  }
}
```

### Void Functions Can Return undefined

Functions with `void` return type can still return values (they're just ignored):

```typescript
function log(message: string): void {
  console.log(message);
  return; // OK
}

function log(message: string): void {
  console.log(message);
  return undefined; // Also OK
}

function log(message: string): void {
  console.log(message);
  return "something"; // Technically allowed, but weird
}
```

### Interface vs Type Alias for Objects

Both work, but have subtle differences:

```typescript
// Type alias - can be used for any type
type ID = string | number;
type User = { name: string; age: number };

// Interface - only for objects, but can be merged
interface Animal {
  name: string;
}

interface Animal {
  age: number; // Merges with above
}
// Now Animal has both name and age
```

Prefer interfaces for object shapes, type aliases for other cases.

### Optional Properties vs Undefined

These are different:

```typescript
interface User {
  name: string;
  email?: string; // Optional - can be omitted
}

const user1: User = { name: "John" }; // OK - email omitted

// But if included, it can be a string or undefined:
const user2: User = { name: "Jane", email: undefined }; // Also OK
```

This is different from explicitly allowing undefined:

```typescript
interface User {
  name: string;
  email: string | undefined; // Must be provided (but can be undefined)
}

const user1: User = { name: "John" }; // Error - email is required
const user2: User = { name: "Jane", email: undefined }; // OK
```

### Readonly Properties

Readonly prevents modification:

```typescript
interface Config {
  readonly apiUrl: string;
}

const config: Config = { apiUrl: "https://api.example.com" };
// config.apiUrl = "https://other.com"; // Error: readonly
```

But the referenced object can still be mutated if it's an object:

```typescript
interface User {
  readonly name: string;
  readonly address: { city: string };
}

const user: User = { name: "John", address: { city: "NYC" } };
user.address.city = "LA"; // This is allowed - address object itself can change

// To prevent this, use readonly on nested properties:
interface User {
  readonly name: string;
  readonly address: { readonly city: string };
}
```

### Array Type Syntax Ambiguity

Be careful with complex union types in array syntax:

```typescript
// Confusing - hard to read
type Data = string | number[];

// What's the intention?
const valid1: Data = "hello"; // string
const valid2: Data = [1, 2, 3]; // number[]
// But "hello" | number[] is union of string OR array, not array of union

// Better: be explicit with parentheses
type Data = string | number[]; // string OR array of numbers
type Data2 = (string | number)[]; // array of (string OR number)
```

### Type Inference with Array Operations

Return types from array methods are inferred:

```typescript
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2); // inferred as number[]

const mixed = [1, "two", true];
const result = mixed.map((item) => String(item)); // inferred as string[]
```

But sometimes you need to be explicit:

```typescript
const results: (string | number)[] = [];

for (const item of data) {
  if (typeof item === "string") {
    results.push(item.length); // number
  } else {
    results.push(item); // already a number
  }
}
// results is properly typed without needing explicit annotation
```

### Generic Type Parameters

When using generics, the type is inferred from usage:

```typescript
function identity<T>(value: T): T {
  return value;
}

const num = identity(5); // T inferred as number
const str = identity("hello"); // T inferred as string

// But you can be explicit:
const num2 = identity<number>(5);
```

### Null and Undefined in Type Inference

By default, TypeScript might include null/undefined in inferred types:

```typescript
const value = null; // Type is null (not any value)
const value2 = undefined; // Type is undefined

// With strict null checks enabled:
let x: string | null = "hello";
x = null; // OK
x = undefined; // Error (unless undefined is in union)
```

## Best Practices for Type Annotations

- Always annotate function parameters and return types
- Use explicit return types to prevent accidental type changes
- Avoid `any` - use more specific types instead
- Narrow union types before using type-specific operations
- Use `readonly` for properties that shouldn't change
- Prefer interfaces for object shapes
- Enable strict mode in `tsconfig.json` for better type checking
- Be explicit about optional vs required properties
- Trust inference for local variables, but be explicit for public APIs

---

**← Previous:** [Variables](./variables.md) | **Next:** [Template Strings](./template-strings.md) →