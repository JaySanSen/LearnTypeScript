# TypeScript and JavaScript Learning Guide

Welcome! This guide will help you learn TypeScript and JavaScript from the basics to more advanced concepts. Follow the learning path in order, or jump to any topic that interests you.

## Getting Started

Before diving into the language concepts, make sure your project is set up correctly.

1. **[Initial Steps](./initial-step.md)** - Set up TypeScript, configure your project, and learn how to run it.

## Fundamentals

These are the core concepts you need to understand to write TypeScript and JavaScript code.

2. **[Variables](./variables.md)** - Learn about variable declarations (`var`, `let`, `const`), data types, and hoisting. Includes edge cases and gotchas.

3. **[Type Annotations](./type-annotations.md)** - Understand how to add types to your variables and functions, and how TypeScript infers types automatically.

4. **[Template Strings](./template-strings.md)** - Master string interpolation and multi-line strings using backticks.

5. **[Arrays](./arrays.md)** - Work with typed arrays, array methods, and multi-type arrays. Covers sparse arrays, negative indices, and edge cases.

6. **[Additional Types](./additional-types.md)** - Learn about special types: `void`, `null`, `undefined`, `never`, `any`, and union types. Includes type narrowing and edge cases.

7. **[Conditionals and Loops](./conditionals-and-loops.md)** - Master control flow with if statements, switch, and various loop constructs. Covers all loop types with detailed examples and edge cases.

8. **[Functions](./functions.md)** - Learn function declarations, parameters (optional, default, rest), return types, and advanced features like overloading and generics.

9. **[Promises and Async/Await](./promises-and-async-await.md)** - Master asynchronous programming from callbacks to modern async/await syntax. Understand how to handle operations that take time.

## Learning Path

Follow this order for the best learning experience:

```
1. Initial Steps (Setup)
   ↓
2. Variables (Declaration & Data Types)
   ↓
3. Type Annotations (Adding Types)
   ↓
4. Template Strings (String Manipulation)
   ↓
5. Arrays (Collections & Methods)
   ↓
6. Additional Types (Special Types & Unions)
   ↓
7. Conditionals and Loops (Control Flow)
   ↓
8. Functions (Reusable Code Blocks)
   ↓
9. Promises and Async/Await (Asynchronous Operations)
   ↓
   (More topics coming soon...)
```

## Quick Reference

| Topic | Description |
|-------|-------------|
| [Initial Steps](./initial-step.md) | Project setup, TypeScript compilation, running your code |
| [Variables](./variables.md) | Variable declarations, primitive types, hoisting, edge cases |
| [Type Annotations](./type-annotations.md) | Type syntax, inference, interfaces, unions, return types |
| [Template Strings](./template-strings.md) | String interpolation, expressions, multi-line strings |
| [Arrays](./arrays.md) | Array typing, methods, sparse arrays, edge cases |
| [Additional Types](./additional-types.md) | Void, null, undefined, never, any, unions, type narrowing, edge cases |
| [Conditionals and Loops](./conditionals-and-loops.md) | if/else, switch, for, while, forEach, edge cases |
| [Functions](./functions.md) | Declarations, parameters, return types, generics, overloading |
| [Promises and Async/Await](./promises-and-async-await.md) | Callbacks, promises, async/await, error handling, parallel operations |

## Tips for Learning

- Read each topic completely before moving to the next
- Pay special attention to "Edge Cases and Gotchas" sections
- Practice the examples by typing them into your `app.ts` file
- Run `npm run build` to compile and execute your code
- Experiment by modifying the examples and seeing what happens
- Use the navigation links at the bottom of each page to move between topics
- Test the edge cases mentioned—understanding gotchas is crucial

## Project Structure

```
LearnTypeScript/
├── documentation/
│   ├── guide.md (you are here)
│   ├── initial-step.md
│   ├── variables.md
│   ├── type-annotations.md
│   ├── template-strings.md
│   ├── arrays.md
│   ├── additional-types.md
│   ├── conditionals-and-loops.md
│   ├── functions.md
│   └── promises-and-async-await.md
├── app.ts (your TypeScript code goes here)
├── tsconfig.json (TypeScript configuration)
├── package.json (project configuration)
└── build/ (compiled JavaScript files)
```

---

Ready to get started? Head to **[Initial Steps](./initial-step.md)** →
