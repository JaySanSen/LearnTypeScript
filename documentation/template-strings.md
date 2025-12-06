# Template Strings

Template strings (also called template literals) are a way to create strings with embedded expressions. They use backticks (`) instead of quotes and allow you to include variables and expressions directly in the string.

## Basic Syntax

Use backticks to create a template string:

```typescript
const name = "John";
const greeting = `Hello, ${name}!`;
console.log(greeting); // Hello, John!
```

Compare with traditional string concatenation:

```typescript
// Old way
const greeting = "Hello, " + name + "!";

// Template string way
const greeting = `Hello, ${name}!`;
```

## Embedding Expressions

You can embed any JavaScript expression inside `${}`:

```typescript
const a = 5;
const b = 10;
const result = `${a} + ${b} = ${a + b}`;
console.log(result); // 5 + 10 = 15
```

### Function Calls

```typescript
function getAge() {
  return 25;
}

const message = `I am ${getAge()} years old`;
console.log(message); // I am 25 years old
```

### Object Properties

```typescript
const user = {
  name: "Alice",
  age: 28,
  city: "New York"
};

const info = `${user.name} is ${user.age} years old and lives in ${user.city}`;
console.log(info); // Alice is 28 years old and lives in New York
```

### Conditional Expressions

```typescript
const score = 85;
const result = `Your score is ${score}. ${score >= 80 ? "Passed!" : "Failed!"}`;
console.log(result); // Your score is 85. Passed!
```

## Multi-line Strings

Template strings preserve whitespace and newlines, making them perfect for multi-line text:

```typescript
const html = `
  <div>
    <h1>Welcome</h1>
    <p>This is a paragraph</p>
  </div>
`;
console.log(html);
```

Traditional way (more cumbersome):

```typescript
const html = "<div>\n" +
  "  <h1>Welcome</h1>\n" +
  "  <p>This is a paragraph</p>\n" +
</div>";
```

## Examples

### Building URLs

```typescript
const baseUrl = "https://api.example.com";
const endpoint = "users";
const id = 123;

const url = `${baseUrl}/${endpoint}/${id}`;
console.log(url); // https://api.example.com/users/123
```

### Creating HTML

```typescript
const title = "My Website";
const content = "Welcome to my site";

const page = `
  <html>
    <head>
      <title>${title}</title>
    </head>
    <body>
      <h1>${title}</h1>
      <p>${content}</p>
    </body>
  </html>
`;
```

### Formatting Output

```typescript
const name = "John";
const score = 92.5;
const grade = "A";

const report = `
  Student Report
  Name: ${name}
  Score: ${score}%
  Grade: ${grade}
`;
console.log(report);
```

## Tagged Template Literals

You can also use template strings with a function (tag function) to process the string:

```typescript
function highlight(strings: TemplateStringsArray, ...values: any[]): string {
  return strings[0] + values.map(v => `**${v}**`).join(strings[1] || "");
}

const name = "John";
const age = 25;
const result = highlight`${name} is ${age} years old`;
console.log(result); // **John** is **25** years old
```

## Benefits

- More readable than string concatenation with `+`
- Easier to maintain multi-line text
- Better for creating HTML, SQL, or other formatted content
- Prevents common concatenation errors

---

**← Previous:** [Type Annotations](./type-annotations.md) | **Next:** [Functions](./functions.md) →
