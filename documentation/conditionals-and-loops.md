# Conditionals and Loops

Control flow structures allow you to make decisions in your code and repeat actions. This document covers if statements, switch statements, and various loop constructs.

## Conditionals

### if Statement

The simplest form of conditional execution. Code runs only if the condition is `true`.

```typescript
const age = 18;

if (age >= 18) {
  console.log("You are an adult");
}
```

#### Truthy and Falsy Values

JavaScript/TypeScript evaluates any value in a boolean context:

**Falsy values:**
- `false`
- `0`
- `-0`
- `0n` (BigInt zero)
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

**Truthy values:**
- Everything else, including:
  - `true`
  - Any non-zero number
  - Any non-empty string
  - Objects and arrays (even empty ones)

```typescript
if (1) {
  console.log("1 is truthy"); // This runs
}

if ("hello") {
  console.log("Non-empty string is truthy"); // This runs
}

if ([]) {
  console.log("Empty array is truthy"); // This runs!
}

if ({}) {
  console.log("Empty object is truthy"); // This runs!
}

if (0) {
  console.log("0 is falsy"); // This doesn't run
}

if ("") {
  console.log("Empty string is falsy"); // This doesn't run
}
```

### if...else Statement

Execute one block if condition is true, another if false.

```typescript
const score = 45;

if (score >= 60) {
  console.log("You passed");
} else {
  console.log("You failed");
}
```

### else if Statement

Check multiple conditions in sequence.

```typescript
const score = 75;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}
```

The conditions are evaluated top to bottom. Once one is true, the rest are skipped:

```typescript
const x = 5;

if (x > 3) {
  console.log("x > 3"); // This runs
} else if (x > 4) {
  console.log("x > 4"); // This doesn't run (previous condition was true)
} else if (x > 0) {
  console.log("x > 0"); // This doesn't run
}
```

### Ternary Operator

A compact conditional expression. Useful for simple true/false decisions.

```typescript
const age = 20;
const status = age >= 18 ? "adult" : "minor";
console.log(status); // "adult"
```

Syntax: `condition ? valueIfTrue : valueIfFalse`

Nested ternary (use sparingly—can reduce readability):

```typescript
const score = 75;
const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
console.log(grade); // "C"
```

Better to use if-else for complex logic:

```typescript
let grade: string;

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else {
  grade = "F";
}
```

### Logical Operators

Use `&&` (AND), `||` (OR), and `!` (NOT) to combine conditions.

#### AND Operator (`&&`)

Both conditions must be true.

```typescript
const age = 25;
const hasLicense = true;

if (age >= 18 && hasLicense) {
  console.log("You can drive");
}
```

Short-circuit evaluation: If the left side is false, the right side is never evaluated.

```typescript
let count = 0;

if (false && ++count) {
  // count++ never executes
}

console.log(count); // 0
```

#### OR Operator (`||`)

At least one condition must be true.

```typescript
const day = "Saturday";

if (day === "Saturday" || day === "Sunday") {
  console.log("It's the weekend");
}
```

Short-circuit evaluation: If the left side is true, the right side is never evaluated.

```typescript
let count = 0;

if (true || ++count) {
  // count++ never executes
}

console.log(count); // 0
```

#### NOT Operator (`!`)

Negates a boolean value.

```typescript
const isRaining = false;

if (!isRaining) {
  console.log("No rain, let's go outside");
}
```

### Switch Statement

Execute different code blocks for different values. More readable than multiple if-else statements when checking one value against many options.

```typescript
const day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the week");
    break;
  case "Friday":
    console.log("Almost weekend");
    break;
  case "Saturday":
  case "Sunday":
    console.log("It's the weekend");
    break;
  default:
    console.log("Midweek day");
}
```

#### Break Statement

The `break` statement exits the switch block. Without it, execution "falls through" to the next case:

```typescript
const number = 1;

switch (number) {
  case 1:
    console.log("One");
    // No break - falls through
  case 2:
    console.log("Two");
    break;
  case 3:
    console.log("Three");
    break;
  default:
    console.log("Other");
}

// Output:
// One
// Two
```

Fall-through can be intentional (like grouping multiple cases above):

```typescript
const color = "red";

switch (color) {
  case "red":
  case "pink":
  case "crimson":
    console.log("Warm color");
    break;
  case "blue":
  case "cyan":
    console.log("Cool color");
    break;
  default:
    console.log("Unknown color");
}
// Output: Warm color
```

#### Default Case

Executes if no cases match. Optional but recommended.

```typescript
const fruit = "mango";

switch (fruit) {
  case "apple":
    console.log("Red fruit");
    break;
  case "banana":
    console.log("Yellow fruit");
    break;
  default:
    console.log("Unknown fruit");
}
// Output: Unknown fruit
```

#### Switch vs if-else

**Use switch when:**
- Comparing one variable against many specific values
- Values are exact matches (using `===`)
- Code is more readable with switch

```typescript
const status = "active";

// Switch is cleaner here
switch (status) {
  case "active":
    handleActive();
    break;
  case "inactive":
    handleInactive();
    break;
  case "pending":
    handlePending();
    break;
  case "deleted":
    handleDeleted();
    break;
}
```

**Use if-else when:**
- Checking ranges or complex conditions
- Testing different variables
- Conditions are not simple equality

```typescript
const age = 25;

// if-else is better for ranges
if (age < 13) {
  console.log("Child");
} else if (age < 18) {
  console.log("Teen");
} else if (age < 65) {
  console.log("Adult");
} else {
  console.log("Senior");
}
```

## Loops

### for Loop

Repeat code a specific number of times. Best when you know how many iterations you need.

```typescript
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

Syntax: `for (initialization; condition; increment/decrement)`

#### Breaking Down the for Loop

```typescript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

1. **Initialization** (`let i = 0`): Runs once at the start
2. **Condition** (`i < 5`): Checked before each iteration
3. **Increment** (`i++`): Runs after each iteration
4. **Body**: Code inside the braces

#### Common Patterns

Counting down:

```typescript
for (let i = 5; i > 0; i--) {
  console.log(i); // 5, 4, 3, 2, 1
}
```

Iterating with custom step:

```typescript
for (let i = 0; i < 10; i += 2) {
  console.log(i); // 0, 2, 4, 6, 8
}
```

Accessing array elements:

```typescript
const fruits = ["apple", "banana", "orange"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

### while Loop

Repeat code while a condition is true. Use when you don't know how many iterations you need.

```typescript
let count = 0;

while (count < 5) {
  console.log(count); // 0, 1, 2, 3, 4
  count++;
}
```

#### Infinite Loops

Be careful not to create accidental infinite loops:

```typescript
let count = 0;

// DANGEROUS - will run forever
// while (true) {
//   console.log(count);
//   // Forgot to increment count
// }
```

Use `while (true)` intentionally only with a break condition:

```typescript
let input = "";

while (true) {
  input = getInput();
  if (input === "quit") {
    break;
  }
  processInput(input);
}
```

### do...while Loop

Executes the code block at least once, then repeats while the condition is true.

```typescript
let count = 0;

do {
  console.log(count);
  count++;
} while (count < 5);
```

The key difference from `while`: the body runs at least once even if the condition is false:

```typescript
let count = 10;

do {
  console.log("This runs once"); // Runs once
  count++;
} while (count < 5); // Condition is false
```

### for...of Loop

Iterate over array values directly (not indices).

```typescript
const fruits = ["apple", "banana", "orange"];

for (const fruit of fruits) {
  console.log(fruit); // apple, banana, orange
}
```

Works with any iterable (arrays, strings, sets, maps):

```typescript
const text = "hello";

for (const char of text) {
  console.log(char); // h, e, l, l, o
}
```

### forEach Method

Built-in array method. Cleaner syntax for iterating arrays.

```typescript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num) => {
  console.log(num); // 1, 2, 3, 4, 5
});
```

Access to index and array:

```typescript
const fruits = ["apple", "banana", "orange"];

fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});
// Output:
// 0: apple
// 1: banana
// 2: orange
```

Access to the entire array:

```typescript
const numbers = [1, 2, 3];

numbers.forEach((num, index, array) => {
  console.log(`Element ${num} in array [${array.join(", ")}]`);
});
```

### for...in Loop

Iterate over object keys (and array indices).

```typescript
const user = {
  name: "John",
  age: 25,
  email: "john@example.com"
};

for (const key in user) {
  console.log(`${key}: ${user[key]}`);
}
// Output:
// name: John
// age: 25
// email: john@example.com
```

For arrays, it returns indices:

```typescript
const colors = ["red", "green", "blue"];

for (const index in colors) {
  console.log(`${index}: ${colors[index]}`);
}
// Output:
// 0: red
// 1: green
// 2: blue
```

**⚠️ Warning**: `for...in` can include inherited properties. For arrays, prefer `for...of` or `forEach`:

```typescript
const arr = [1, 2, 3];
arr.customProperty = "extra"; // Adding custom property

for (const key in arr) {
  console.log(key); // 0, 1, 2, customProperty (unexpected!)
}
```

### break and continue

#### break

Exit the loop immediately.

```typescript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // Exit loop when i equals 5
  }
  console.log(i); // 0, 1, 2, 3, 4
}
```

#### continue

Skip to the next iteration.

```typescript
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue; // Skip when i equals 2
  }
  console.log(i); // 0, 1, 3, 4
}
```

Used with conditions to skip certain iterations:

```typescript
const numbers = [1, 2, 3, 4, 5, 6];

for (const num of numbers) {
  if (num % 2 === 0) {
    continue; // Skip even numbers
  }
  console.log(num); // 1, 3, 5
}
```

## Edge Cases and Gotchas

### Floating Point in Loops

Be careful with floating point arithmetic:

```typescript
let sum = 0;

for (let i = 0; i < 0.3; i += 0.1) {
  sum += 0.1;
}

console.log(sum); // 0.30000000000000004 (not 0.3!)
```

Prefer integers when possible, or use safer comparison:

```typescript
let i = 0;

while (i < 0.3 - 0.0001) { // Small tolerance
  i += 0.1;
}
```

### Condition Evaluation

Conditions in loops are re-evaluated each iteration:

```typescript
const arr = [1, 2, 3];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

If you modify the array, it affects the loop:

```typescript
const arr = [1, 2, 3];

for (let i = 0; i < arr.length; i++) {
  if (i === 1) {
    arr.push(4); // Adds to array
  }
  console.log(arr[i]); // Will iterate over the new element too!
}
```

### forEach and this

Arrow functions don't have their own `this`:

```typescript
const obj = {
  name: "John",
  greet: function() {
    [1, 2, 3].forEach(function(num) {
      console.log(this.name); // undefined (this is global/window)
    });
  }
};

// Better: use arrow function
obj.greet = function() {
  [1, 2, 3].forEach((num) => {
    console.log(this.name); // "John" (correct this)
  });
};
```

### Switch Type Coercion

Switch uses strict equality (`===`), not loose equality (`==`):

```typescript
const value = "5";

switch (value) {
  case 5: // This doesn't match "5" (string vs number)
    console.log("Number 5");
    break;
  case "5": // This matches
    console.log("String 5");
    break;
}
// Output: String 5
```

### Variable Scope in Loops

`var` is function-scoped, so it leaks out of the loop:

```typescript
for (var i = 0; i < 3; i++) {
  // ...
}
console.log(i); // 3 (i is still accessible!)
```

`let` is block-scoped, so it doesn't leak:

```typescript
for (let i = 0; i < 3; i++) {
  // ...
}
// console.log(i); // Error: i is not defined
```

### Empty Switch Cases

Cases without break fall through to the next case:

```typescript
const value = 1;

switch (value) {
  case 1:
  case 2:
  case 3:
    console.log("1, 2, or 3");
    break;
  default:
    console.log("something else");
}
// Output: 1, 2, or 3
```

## Comparison: When to Use What

| Structure | Best For | Example |
|-----------|----------|---------|
| `if` | Single condition | `if (age >= 18)` |
| `if...else` | True/false branch | `if (score >= 60) { pass } else { fail }` |
| `else if` | Multiple conditions | Grading system (A, B, C, etc.) |
| `switch` | One variable, many values | `switch (status)` |
| `for` | Known iteration count | `for (let i = 0; i < 10; i++)` |
| `while` | Unknown iteration count | User input loop |
| `do...while` | Loop at least once | Input validation |
| `for...of` | Array values | `for (const item of array)` |
| `forEach` | Array iteration with callback | `array.forEach(item => ...)` |
| `for...in` | Object keys | `for (const key in object)` |

---

**← Previous:** [Additional Types](./additional-types.md) | **Next:** [Functions](./functions.md) →
