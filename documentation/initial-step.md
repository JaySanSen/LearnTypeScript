# TypeScript Setup Guide

## Installation

Install TypeScript as a development dependency for this project:

```bash
npm install typescript --save-dev
```

This installs TypeScript locally and saves it as a dev dependency in `package.json`.

## Configuration

Create a TypeScript configuration file:

```bash
npx tsc --init
```

This generates a `tsconfig.json` file where you can configure:
- Output directory for compiled files
- Target JavaScript version
- Other compilation rules

## Compilation

### Single Compilation

Compile TypeScript files to JavaScript:

```bash
npx tsc
```

### Watch Mode

Automatically recompile files when changes are detected:

```bash
npx tsc --watch
```

## Running the Project

Execute the complete build and run sequence:

```bash
npm run build
```

This command:
1. Removes the existing `build/` directory
2. Installs dependencies
3. Compiles TypeScript to JavaScript
4. Runs the compiled `build/app.js` file

## Project Structure

- `app.ts` - Your TypeScript source file
- `tsconfig.json` - TypeScript configuration (created after `tsc --init`)
- `build/` - Output directory for compiled JavaScript files
- `package.json` - Project configuration and scripts

---

**← Back to:** [Documentation Guide](./guide.md) | **Next:** [Variables](./variables.md) →
