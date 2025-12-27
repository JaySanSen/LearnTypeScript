# Quick Start: Async/Await Cheat Sheet

## The Three Levels of Understanding

### Level 1: What is Async?
Asynchronous means something that doesn't happen immediately. It takes time.

**Real examples:**
- Downloading a file (takes 5 seconds)
- Getting data from internet (takes 2 seconds)
- Reading from database (takes 1 second)

If JavaScript waits for each of these, the whole app freezes. So we need a way to "start the operation and come back later when it's done."

### Level 2: Promises (The Container)
A Promise is like a **gift box** - you don't know what's inside until you open it later.

```typescript
// Creating a promise (starting the operation)
const myPromise = new Promise((resolve, reject) => {
  // This code runs immediately
  setTimeout(() => {
    resolve("Operation done!"); // Success case
  }, 1000);
});

// Later: opening the gift box
myPromise.then((result) => {
  console.log(result); // "Operation done!"
});
```

**Key points:**
- A promise can be in 3 states: pending, resolved (success), or rejected (failure)
- Once resolved/rejected, it can't change
- Use `.then()` to handle success
- Use `.catch()` to handle errors

### Level 3: Async/Await (The Simple Way)
Instead of `.then()` chains, **async/await** lets you write code that looks normal:

```typescript
// Define an async function
async function doWork(): Promise<void> {
  // await pauses here until the promise resolves
  const result = await myPromise;
  console.log(result);
}

doWork(); // Call it
```

**The magic**: `await` pauses the function and waits for the promise. When it's done, the value is "unwrapped" and assigned to the variable.

---

## Quick Examples You Can Try

### Example 1: Basic Timer

```typescript
async function delay(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

async function main(): Promise<void> {
  console.log("Starting...");
  await delay(2);
  console.log("2 seconds passed!");
}

main();
```

**What happens:**
1. Print "Starting..."
2. Wait 2 seconds
3. Print "2 seconds passed!"

### Example 2: Simulating API Call

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function fetchUserFromServer(userId: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: "John Doe",
        email: "john@example.com"
      });
    }, 1000);
  });
}

async function getUserData(userId: number): Promise<void> {
  console.log("Fetching user...");
  const user = await fetchUserFromServer(userId);
  console.log("User:", user.name);
}

getUserData(1);
```

### Example 3: Error Handling

```typescript
function riskyOperation(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() > 0.5;
      if (shouldFail) {
        reject(new Error("Operation failed!"));
      } else {
        resolve("Success!");
      }
    }, 1000);
  });
}

async function tryIt(): Promise<void> {
  try {
    const result = await riskyOperation();
    console.log(result);
  } catch (error) {
    console.log("Caught error:", error.message);
  }
}

tryIt();
```

**Key points:**
- `try` block runs the code
- If promise rejects, `catch` runs
- It's just like normal error handling!

### Example 4: Multiple Operations (Sequential)

```typescript
async function getFullUserData(userId: number): Promise<void> {
  // These run one after another
  const user = await fetchUserFromServer(userId);
  const posts = await fetchPostsFromServer(user.id);
  const comments = await fetchCommentsFromServer(posts[0].id);
  
  console.log("All data loaded");
}
```

This takes: 1s + 1s + 1s = **3 seconds total**

### Example 5: Multiple Operations (Parallel)

```typescript
async function getFullUserDataFast(userId: number): Promise<void> {
  // These run at the same time
  const [user, posts, comments] = await Promise.all([
    fetchUserFromServer(userId),
    fetchPostsFromServer(userId),
    fetchCommentsFromServer(1)
  ]);
  
  console.log("All data loaded");
}
```

This takes: **1 second total** (all at once!)

---

## Common Patterns

### Pattern 1: Loading Data on App Start

```typescript
async function loadApp(): Promise<void> {
  try {
    console.log("Loading...");
    const user = await fetchUser();
    const settings = await fetchSettings();
    console.log("App ready!", user, settings);
  } catch (error) {
    console.log("Failed to load app:", error);
  }
}

loadApp();
```

### Pattern 2: User Action (Like Button Click)

```typescript
async function handleSubmitClick(data: any): Promise<void> {
  try {
    console.log("Saving...");
    const result = await saveDataToServer(data);
    console.log("Saved successfully!");
  } catch (error) {
    console.log("Save failed:", error);
  }
}

// When user clicks: handleSubmitClick(formData);
```

### Pattern 3: Retry Logic

```typescript
async function fetchWithRetry(maxRetries: number = 3): Promise<any> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetchData();
    } catch (error) {
      if (i === maxRetries - 1) throw error; // Last attempt
      console.log(`Retry ${i + 1}...`);
      await delay(1); // Wait 1 second before retry
    }
  }
}
```

### Pattern 4: Timeout

```typescript
function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );
}

async function fetchWithTimeout(
  promise: Promise<any>,
  ms: number
): Promise<any> {
  return Promise.race([promise, timeout(ms)]);
}

// Usage: returns first to complete (either data or timeout error)
const user = await fetchWithTimeout(fetchUser(), 5000);
```

---

## Mistakes to Avoid

### ❌ Mistake 1: Forgetting await

```typescript
async function wrong(): Promise<void> {
  const user = fetchUser(); // Missing await!
  console.log(user); // Logs: Promise { <pending> } - NOT the user!
}

// ✅ Correct
async function correct(): Promise<void> {
  const user = await fetchUser();
  console.log(user); // Logs the actual user object
}
```

### ❌ Mistake 2: No Error Handling

```typescript
async function bad(): Promise<void> {
  const user = await fetchUser(); // If this fails, whole function crashes
}

// ✅ Correct
async function good(): Promise<void> {
  try {
    const user = await fetchUser();
  } catch (error) {
    console.log("Error:", error);
  }
}
```

### ❌ Mistake 3: Sequential Instead of Parallel

```typescript
// SLOW: waits 3 seconds
async function slow(): Promise<void> {
  const user = await fetchUser(1);
  const posts = await fetchPosts(1);
  const comments = await fetchComments(1);
}

// ✅ FAST: waits 1 second
async function fast(): Promise<void> {
  const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
  ]);
}
```

### ❌ Mistake 4: Calling async function without await

```typescript
async function loadData(): Promise<void> {
  const user = await fetchUser();
  console.log(user);
}

// ❌ This starts loadData but doesn't wait
loadData(); // Function runs in background

// ✅ This waits for it
await loadData(); // Function completes before moving on
```

---

## Real-World Example: Todo App

```typescript
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Simulate API calls
function fetchTodos(): Promise<Todo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Buy milk", completed: false },
        { id: 2, title: "Do homework", completed: true }
      ]);
    }, 1000);
  });
}

function saveTodo(todo: Todo): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

// The actual app
async function todoApp(): Promise<void> {
  try {
    // Load todos
    console.log("Loading todos...");
    const todos = await fetchTodos();
    console.log("Loaded:", todos.length, "todos");

    // Mark first as complete
    todos[0].completed = true;
    console.log("Saving...");
    await saveTodo(todos[0]);
    console.log("Saved!");

    // Show all
    console.log("Current todos:", todos);
  } catch (error) {
    console.log("Error:", error);
  }
}

// Run the app
todoApp();
```

---

## When to Use What

| Situation | Solution |
|-----------|----------|
| Single async operation | Use `await` |
| Multiple independent operations | Use `Promise.all()` |
| Multiple dependent operations (wait for first, then use result) | Chain `await` statements |
| Need to wait for any one to complete | Use `Promise.race()` |
| Want all results even if some fail | Use `Promise.allSettled()` |
| Old code with callbacks | Convert to promises/async-await gradually |

---

## Key Takeaways

1. **Async is about time** - operations that take a while to complete
2. **Promises are containers** - they hold the result you'll get in the future
3. **async/await is the easy way** - write async code like it's synchronous
4. **await pauses execution** - waits for the promise to resolve
5. **Always handle errors** - use try/catch
6. **Promise.all() for speed** - run independent operations in parallel
7. **Don't forget await** - it's the most common mistake!

---

## Next Steps

1. **Read the full guide**: [Promises and Async/Await](./promises-and-async-await.md)
2. **Practice in your app.ts file**:
   - Try the examples above
   - Modify them to see how they behave
   - Break them intentionally to understand errors
3. **Real API practice**: Use `fetch()` which returns promises:

```typescript
async function getRealData(): Promise<void> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await response.json();
    console.log(user);
  } catch (error) {
    console.log("Failed to fetch:", error);
  }
}

getRealData();
```

That's it! Async/await is really about understanding that some operations take time, and instead of freezing your app, you wait for them asynchronously. Start simple and build up from there!
