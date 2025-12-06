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

**← Previous:** [Variables](./variables.md) | **Next:** [Template Strings](./template-strings.md) →