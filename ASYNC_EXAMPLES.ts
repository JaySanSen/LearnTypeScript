// ===== ASYNC/AWAIT LEARNING EXAMPLES =====
// Copy these examples into app.ts and run with: npm run build

// ===== EXAMPLE 1: Basic Promise Creation =====
// Uncomment to try:

/*
const myPromise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved!");
  }, 2000);
});

myPromise.then((result) => {
  console.log(result);
});
*/

// ===== EXAMPLE 2: Basic Async/Await =====
// Uncomment to try:

/*
async function simpleExample(): Promise<void> {
  console.log("Starting...");

  const result = await new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Done!");
    }, 2000);
  });

  console.log(result);
  console.log("Finished!");
}

simpleExample();
*/

// ===== EXAMPLE 3: Simulating API Call =====
// Uncomment to try:

/*
interface User {
  id: number;
  name: string;
  email: string;
}

function fetchUser(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: "John Doe",
        email: "john@example.com"
      });
    }, 1000);
  });
}

async function getUserData(): Promise<void> {
  console.log("Fetching user...");
  const user = await fetchUser(1);
  console.log("User:", user.name, "-", user.email);
}

getUserData();
*/

// ===== EXAMPLE 4: Error Handling =====
// Uncomment to try:

/*
function riskyOperation(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Randomly succeed or fail
      if (Math.random() > 0.5) {
        resolve("Success!");
      } else {
        reject(new Error("Operation failed"));
      }
    }, 1000);
  });
}

async function handleErrors(): Promise<void> {
  try {
    console.log("Starting operation...");
    const result = await riskyOperation();
    console.log(result);
  } catch (error) {
    console.log("Caught error:", error instanceof Error ? error.message : error);
  } finally {
    console.log("Operation complete");
  }
}

handleErrors();
*/

// ===== EXAMPLE 5: Sequential Operations =====
// Uncomment to try:

/*
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function sequential(): Promise<void> {
  console.log("Step 1");
  await delay(1000);

  console.log("Step 2 (after 1 second)");
  await delay(1000);

  console.log("Step 3 (after 2 seconds total)");
}

sequential();
*/

// ===== EXAMPLE 6: Parallel Operations =====
// Uncomment to try:

/*
async function getNumber(n: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Number ${n} ready`);
      resolve(n);
    }, 1000);
  });
}

async function parallel(): Promise<void> {
  console.log("Starting all operations at once...");

  // All 3 run at the same time
  const [a, b, c] = await Promise.all([
    getNumber(1),
    getNumber(2),
    getNumber(3)
  ]);

  console.log("All done! Results:", a, b, c);
}

parallel();
*/

// ===== EXAMPLE 7: Promise.all vs Sequential =====
// Uncomment to try:

/*
function fetchData(id: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data ${id}`);
    }, 1000);
  });
}

async function testSequential(): Promise<void> {
  console.time("Sequential");

  const d1 = await fetchData(1);
  const d2 = await fetchData(2);
  const d3 = await fetchData(3);

  console.log(d1, d2, d3);
  console.timeEnd("Sequential");
}

async function testParallel(): Promise<void> {
  console.time("Parallel");

  const [d1, d2, d3] = await Promise.all([
    fetchData(1),
    fetchData(2),
    fetchData(3)
  ]);

  console.log(d1, d2, d3);
  console.timeEnd("Parallel");
}

// Sequential: ~3 seconds
testSequential();

// Parallel: ~1 second
// await testParallel();
*/

// ===== EXAMPLE 8: Finally Block =====
// Uncomment to try:

/*
async function withFinally(): Promise<void> {
  try {
    console.log("Trying to do something...");
    const result = await new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Something went wrong"));
      }, 1000);
    });
    console.log(result);
  } catch (error) {
    console.log("Caught:", error instanceof Error ? error.message : error);
  } finally {
    console.log("Cleanup: This always runs");
  }
}

withFinally();
*/

// ===== EXAMPLE 9: Real Fetch API =====
// Uncomment to try:

/*
interface JsonPlaceholderUser {
  id: number;
  name: string;
  email: string;
}

async function getRealData(): Promise<void> {
  try {
    console.log("Fetching from API...");
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await response.json() as JsonPlaceholderUser;
    console.log("API Response:", user.name, user.email);
  } catch (error) {
    console.log("Failed to fetch:", error);
  }
}

getRealData();
*/

// ===== EXAMPLE 10: Async in a Loop =====
// Uncomment to try:

/*
async function getNumber(n: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Got number: ${n}`);
      resolve(n);
    }, 500);
  });
}

async function loopSequential(): Promise<void> {
  console.log("Processing numbers one by one...");
  for (let i = 1; i <= 3; i++) {
    const num = await getNumber(i);
    console.log("Processing:", num);
  }
  console.log("Done!");
}

async function loopParallel(): Promise<void> {
  console.log("Processing numbers all at once...");
  const promises = [getNumber(1), getNumber(2), getNumber(3)];
  const nums = await Promise.all(promises);
  nums.forEach(num => console.log("Processing:", num));
  console.log("Done!");
}

loopSequential();
// await loopParallel();
*/

// ===== START HERE =====
// Try Example 1 first to see basic promises
// Then try Example 2 to see async/await
// Then try Example 3 to simulate a real API call
// Work your way through the examples

console.log("Async/Await examples loaded. Uncomment examples to try them!");
console.log("Hello")
