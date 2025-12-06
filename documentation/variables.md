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

## Best Practices

- Use `const` by default for variables that won't be reassigned
- Use `let` when you need to reassign a variable
- Avoid `var` in modern JavaScript and TypeScript
- Declare variables close to where they are used
- Use meaningful variable names that describe their purpose

---

**← Previous:** [Initial Steps](./initial-step.md) | **Next:** [Type Annotations](./type-annotations.md) →
