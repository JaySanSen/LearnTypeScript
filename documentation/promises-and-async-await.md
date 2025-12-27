# Promises and Async/Await

## The Problem: Asynchronous Operations

JavaScript is **single-threaded**, meaning it can only do one thing at a time. However, many operations take time to complete:
- Fetching data from the internet
- Reading files from disk
- Database queries
- Timers

If JavaScript waits for these operations to finish before moving on, your entire program would freeze. We need a way to start these operations and continue doing other things while waiting for the result.

### Real-World Analogy

Think of ordering food at a restaurant:
1. You place an order (start async operation)
2. The kitchen starts cooking (happens in the background)
3. You sit down and wait (your code continues)
4. Eventually, the food is ready (promise resolves)
5. The waiter brings it to you (callback is called)

## Callbacks: The Old Way

Before promises, JavaScript used **callbacks** to handle async operations:

```typescript
function fetchUser(id: number, callback: (user: any) => void): void {
  setTimeout(() => {
    const user = { id, name: "John" };
    callback(user); // Call the function when done
  }, 1000);
}

fetchUser(1, (user) => {
  console.log("User:", user);
});

console.log("Fetching..."); // Logs first, then waits
// Output:
// Fetching...
// (after 1 second)
// User: { id: 1, name: 'John' }
```

### The Callback Hell Problem

When you need multiple async operations, callbacks get messy:

```typescript
function getUser(id: number, callback: (user: any) => void): void {
  setTimeout(() => {
    callback({ id, name: "John" });
  }, 1000);
}

function getPosts(userId: number, callback: (posts: any[]) => void): void {
  setTimeout(() => {
    callback([
      { id: 1, title: "First Post" },
      { id: 2, title: "Second Post" }
    ]);
  }, 1000);
}

function getComments(postId: number, callback: (comments: any[]) => void): void {
  setTimeout(() => {
    callback([{ id: 1, text: "Great post!" }]);
  }, 1000);
}

// Nested callbacks - hard to read!
getUser(1, (user) => {
  console.log("User:", user);
  getPosts(user.id, (posts) => {
    console.log("Posts:", posts);
    getComments(posts[0].id, (comments) => {
      console.log("Comments:", comments);
    });
  });
});
```

This is called **"Callback Hell"** or **"Pyramid of Doom"** - the code gets harder to read and maintain.

## Promises: A Better Way

A **Promise** is an object that represents the eventual result of an async operation. It's either:
- **Pending** - waiting for the operation to complete
- **Resolved** - operation succeeded, has a value
- **Rejected** - operation failed, has an error

### Creating a Promise

```typescript
// Basic promise
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!"); // Operation succeeded
  }, 1000);
});

console.log(myPromise); // Promise { <pending> }
```

The promise constructor takes a function with two parameters:
- `resolve(value)` - call this when the operation succeeds
- `reject(error)` - call this when the operation fails

### Using then() and catch()

Once you have a promise, use `.then()` to handle success and `.catch()` for errors:

```typescript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Operation completed!");
  }, 1000);
});

myPromise
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
```

### Promise Chain Example

Using promises is much cleaner than callbacks:

```typescript
function getUser(id: number): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: "John" });
    }, 1000);
  });
}

function getPosts(userId: number): Promise<any[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "First Post" },
        { id: 2, title: "Second Post" }
      ]);
    }, 1000);
  });
}

// Chain promises with .then()
getUser(1)
  .then((user) => {
    console.log("User:", user);
    return getPosts(user.id);
  })
  .then((posts) => {
    console.log("Posts:", posts);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
```

Much more readable! Each `.then()` receives the value from the previous one.

### Promise States

A promise goes through states:

```typescript
const promise = new Promise((resolve, reject) => {
  console.log("Promise created (pending)");
  
  setTimeout(() => {
    resolve("Done!"); // Now fulfilled
  }, 1000);
});

console.log(promise); // Promise { <pending> }

promise.then((result) => {
  console.log("Result:", result); // Logs after 1 second
});
```

**Important**: Once a promise resolves or rejects, it can't change:

```typescript
const promise = new Promise((resolve, reject) => {
  resolve("First");
  resolve("Second"); // This is ignored
  reject("Error"); // This is also ignored
});

promise.then((result) => {
  console.log(result); // "First" (only the first resolve matters)
});
```

## Async/Await: The Modern Way

**Async/Await** is syntactic sugar over promises - it makes async code look like synchronous code, making it much easier to read.

### Async Functions

An `async` function always returns a promise:

```typescript
async function greet(): Promise<string> {
  return "Hello!";
}

greet().then((result) => {
  console.log(result); // "Hello!"
});
```

The `async` keyword makes the function return a promise automatically.

### Await Keyword

Inside an async function, use `await` to pause execution until a promise resolves:

```typescript
async function getData(): Promise<void> {
  console.log("Starting...");
  
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data fetched!");
    }, 1000);
  });
  
  console.log(result); // Logs after promise resolves
  console.log("Done!");
}

getData();

// Output:
// Starting...
// (1 second pause)
// Data fetched!
// Done!
```

**Key point**: `await` pauses the function until the promise resolves. The value is unwrapped automatically.

### Async/Await vs Promise Chain

Compare the two approaches:

```typescript
// Promise chain - harder to read
function getDataPromise(): Promise<string> {
  return getUser(1)
    .then((user) => {
      return getPosts(user.id)
        .then((posts) => {
          return `User: ${user.name}, Posts: ${posts.length}`;
        });
    });
}

// Async/await - much cleaner
async function getDataAsync(): Promise<string> {
  const user = await getUser(1);
  const posts = await getPosts(user.id);
  return `User: ${user.name}, Posts: ${posts.length}`;
}
```

The async/await version reads like regular synchronous code - much easier!

### Error Handling with Try/Catch

Use try/catch blocks with async functions (just like synchronous code):

```typescript
async function getUser(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    if (id < 0) {
      reject(new Error("Invalid user ID"));
    } else {
      resolve({ id, name: "John" });
    }
  });
}

async function fetchData(): Promise<void> {
  try {
    const user = await getUser(1);
    console.log("User:", user);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

fetchData();
```

Compare with promise chain:

```typescript
// Promise chain - harder to read error handling
getUser(1)
  .then((user) => {
    console.log("User:", user);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });

// Async/await - looks like regular error handling
async function fetchData(): Promise<void> {
  try {
    const user = await getUser(1);
    console.log("User:", user);
  } catch (error) {
    console.log("Error:", error.message);
  }
}
```

## Practical Examples

### Example 1: Simulating API Call

```typescript
function fetchUserData(userId: number): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "John Doe", email: "john@example.com" });
    }, 2000); // Simulates 2 second API call
  });
}

async function displayUserData(): Promise<void> {
  console.log("Loading user...");
  const user = await fetchUserData(1);
  console.log("User loaded:", user);
}

displayUserData();
```

### Example 2: Multiple Async Operations

```typescript
async function getUserAndPosts(): Promise<void> {
  try {
    // Sequential - waits for each operation
    const user = await getUser(1);
    const posts = await getPosts(user.id);
    console.log("User:", user, "Posts:", posts);
  } catch (error) {
    console.log("Error:", error);
  }
}
```

### Example 3: Parallel Async Operations

Sometimes you want to wait for multiple operations without waiting for each one sequentially:

```typescript
async function getMultipleUsers(): Promise<void> {
  try {
    // Sequential (slow)
    const user1 = await getUser(1);
    const user2 = await getUser(2);
    const user3 = await getUser(3);
    // Total time: ~3 seconds

    // Parallel (fast) - use Promise.all()
    const [user1, user2, user3] = await Promise.all([
      getUser(1),
      getUser(2),
      getUser(3)
    ]);
    // Total time: ~1 second (all requests start at once)
    
    console.log(user1, user2, user3);
  } catch (error) {
    console.log("Error:", error);
  }
}
```

### Example 4: Finally Block

Execute code regardless of success or failure:

```typescript
async function fetchData(): Promise<void> {
  try {
    const user = await getUser(1);
    console.log("User:", user);
  } catch (error) {
    console.log("Error:", error);
  } finally {
    console.log("Request completed"); // Runs always
  }
}
```

## Useful Promise Utilities

### Promise.all() - Wait for All

```typescript
const promises = [
  getUser(1),
  getUser(2),
  getUser(3)
];

Promise.all(promises)
  .then((users) => {
    console.log("All users:", users); // Array of results
  })
  .catch((error) => {
    console.log("At least one failed:", error);
  });
```

If **any** promise rejects, the entire `Promise.all()` rejects.

### Promise.race() - Wait for First

```typescript
const first = await Promise.race([
  getUser(1),
  getUser(2),
  getUser(3)
]);

console.log("First to complete:", first);
```

Resolves as soon as **any** promise resolves.

### Promise.allSettled() - Get All Results

```typescript
const results = await Promise.allSettled([
  getUser(1),
  getUser(999), // This might fail
  getUser(2)
]);

results.forEach((result) => {
  if (result.status === "fulfilled") {
    console.log("Success:", result.value);
  } else {
    console.log("Failed:", result.reason);
  }
});
```

Gets results **whether they succeed or fail**.

## Real-World Scenario: Fetching Data from API

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

async function loadUserProfile(userId: number): Promise<void> {
  try {
    // Show loading state
    console.log("Loading...");

    // Fetch user data (simulated API call)
    const response = new Promise<User>((resolve) => {
      setTimeout(() => {
        resolve({
          id: userId,
          name: "John Doe",
          email: "john@example.com"
        });
      }, 1000);
    });

    const user = await response;

    // Display the data
    console.log("User loaded successfully:");
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
  } catch (error) {
    console.log("Failed to load user:", error);
  } finally {
    console.log("Loading complete");
  }
}

loadUserProfile(1);
```

## Edge Cases and Common Mistakes

### Mistake 1: Forgetting await

```typescript
async function getData(): Promise<void> {
  const user = getUser(1); // Missing await!
  console.log(user); // Logs Promise { <pending> }
}

// Correct
async function getData(): Promise<void> {
  const user = await getUser(1);
  console.log(user); // Logs the actual user object
}
```

### Mistake 2: Not Handling Errors

```typescript
// Bad - error is silently ignored
async function getData(): Promise<void> {
  const user = await getUser(1); // If this fails, the function crashes
}

// Good - handle errors
async function getData(): Promise<void> {
  try {
    const user = await getUser(1);
  } catch (error) {
    console.log("Error:", error);
  }
}
```

### Mistake 3: Sequential When Parallel Would Be Faster

```typescript
// Slow - waits 3 seconds
async function getDataSlow(): Promise<void> {
  const user1 = await getUser(1);
  const user2 = await getUser(2);
  const user3 = await getUser(3);
}

// Fast - waits 1 second
async function getDataFast(): Promise<void> {
  const [user1, user2, user3] = await Promise.all([
    getUser(1),
    getUser(2),
    getUser(3)
  ]);
}
```

### Mistake 4: Calling Async Function Without await

```typescript
async function process(): Promise<void> {
  const result = await loadData(); // Correct - wait for it
  console.log(result);
}

function getResult(): Promise<string> {
  // This async function needs to be awaited
  process(); // Missing await - function starts but we don't wait
  // Missing return statement
}

// Correct
async function getResult(): Promise<void> {
  await process(); // Wait for it
}
```

### Mistake 5: Throwing in Promise Constructor

```typescript
// This error is hard to catch
const promise = new Promise((resolve, reject) => {
  throw new Error("Oops!"); // Better to use reject()
});

// Better
const promise = new Promise((resolve, reject) => {
  reject(new Error("Oops!"));
});
```

## TypeScript with Promises

Always specify the type:

```typescript
interface User {
  id: number;
  name: string;
}

// Good - clear return type
async function getUser(id: number): Promise<User> {
  return { id, name: "John" };
}

// The data type is known
const user = await getUser(1); // Type is User
console.log(user.name); // TypeScript knows 'name' exists

// Bad - missing return type
async function getUserBad(id: number) {
  return { id, name: "John" };
}

const user = await getUserBad(1); // Type is unknown (any)
```

## Quick Comparison

| Approach | Syntax | Readability | Error Handling |
|----------|--------|-------------|----------------|
| Callbacks | Nested functions | Hard (pyramid of doom) | Inconsistent |
| Promises | `.then().catch()` | Medium | `.catch()` block |
| Async/Await | Like synchronous | Easy (best) | try/catch |

## Summary

1. **Promises** represent future values from async operations
2. **Async/await** makes promises easier to write and read
3. Use `async` to declare async functions
4. Use `await` to wait for promises inside async functions
5. Use `try/catch` for error handling
6. Use `Promise.all()` for parallel operations
7. **Always specify types** with TypeScript

## Best Practices

- Always use `async/await` over promise chains (more readable)
- Always handle errors with try/catch
- Always specify return types for async functions
- Use `Promise.all()` when operations are independent
- Avoid mixing callbacks with promises or async/await
- Use `finally` to clean up resources
- Don't forget `await` - it's easy to miss!

---

**← Previous:** [Functions](./functions.md) | **Next:** [Objects](./objects.md) →
