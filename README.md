<p align="center">
  <a href="https://ibb.co/sjsHcww"><img src="https://i.ibb.co/xhzHwjj/sonic-team.png" alt="sonic-team" border="0"></a>
</p>

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@sonics-team/core">
    CORE: 0.0.1
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@sonics-team/utils">
    UTILS: 0.1.0
  </a>
</p>

## Important Links
<ol>
<li>
<a href="https://turbo.build/repo/docs">
Turborepo Documentation
</a>
</li>
<li>
<a href="https://github.com/vercel/turbo/tree/main/examples">
Turborepo Examples
</a>
</li>
</ol>

## Core Team
<a href="https://github.com/ahmad-aqr">
<p>Ahmad Al-aqraa</p>
</a>
<a href="https://github.com/AousMohammad">
<p>Aous Mohammad</p>
</a>
<a href="https://github.com/dytohan">
<p>Dyaa Tohan</p>
</a>
<a href="https://github.com/mohammedyosef761">
<p>Mohammad Youssef</p>
</a>
<a href="">
<p>Rahaf thiab</p>
</a>
<a href="https://github.com/RiadAlsaqal">
<p>Riad Al-saqal</p>
</a>
<a href="https://github.com/RoulaRohban">
<p>Roula Al-rouhban</p>
</a>
<a href="https://github.com/Shayar-Hassan">
<p>Shayar Hasan</p>
</a>

## Installation:
<ol>
<li>
install pnpm:

```npm install -g pnpm```
</li>
<li>
install all dependencies in root project directory:

```pnpm install```
</li>
</ol>

### Useful Commands

- `pnpm build` - Build all packages, including the Storybook site
- `pnpm dev` - Run all packages locally and preview with Storybook
- `pnpm lint` - Lint all packages
- `pnpm changeset` - Generate a changeset
- `pnpm clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

## Apps & Packages

This Turborepo includes the following packages and applications:

- `apps/docs`: Component documentation site with Storybook
- `apps/web`: React application to use packages and test it
- `packages/@sonics-team/core`: Core React components
- `packages/@sonics-team/utils`: Shared React utilities
- `packages/@sonics-team/tsconfig`: Shared `tsconfig.json`s used throughout the Turborepo
- `packages/@sonics-team/eslint`: ESLint preset

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/). Workspaces enables us to "hoist" dependencies that are shared between packages to the root `package.json`. This means smaller `node_modules` folders and a better local dev experience. To install a dependency for the entire monorepo, use the `-w` workspaces flag with `pnpm add`.

This example sets up your `.gitignore` to exclude all generated files, other folders like `node_modules` used to store your dependencies.

### Compilation

To make the core library code work across all browsers, we need to compile the raw TypeScript and React code to plain JavaScript. We can accomplish this with `tsup`, which uses `esbuild` to greatly improve performance.

Running `pnpm build` from the root of the Turborepo will run the `build` command defined in each package's `package.json` file. Turborepo runs each `build` in parallel and caches & hashes the output to speed up future builds.

For `sonics-core`, the `build` command is the following:

```bash
tsup src/index.tsx --format esm,cjs --dts --external react
```

`tsup` compiles `src/index.tsx`, which exports all of the components in the design system, into both ES Modules and CommonJS formats as well as their TypeScript types. The `package.json` for `sonics-core` then instructs the consumer to select the correct format:

```json:sonics-core/package.json
{
  "name": "@sonics-team/core",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "sideEffects": false,
}
```

Run `pnpm build` to confirm compilation is working correctly. You should see a folder `sonics-core/dist` which contains the compiled output.

```bash
sonics-core
└── dist
    ├── index.d.ts  <-- Types
    ├── index.js    <-- CommonJS version
    └── index.mjs   <-- ES Modules version
```

## Components

Each file inside of `sonics-core/src` is a component inside our design system. For example:

```tsx:sonics-core/src/Button.tsx
import * as React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return <button>{props.children}</button>;
}

Button.displayName = 'Button';
```

When adding a new file, ensure the component is also exported from the entry `index.tsx` file:

```tsx:sonics-core/src/index.tsx
import * as React from "react";
export { Button, type ButtonProps } from "./Button";
// Add new component exports here
```

## Storybook

Storybook provides us with an interactive UI playground for our components. This allows us to preview our components in the browser and instantly see changes when developing locally. This example preconfigures Storybook to:

- Use Vite to bundle stories instantly (in milliseconds)
- Automatically find any stories inside the `stories/` folder
- Support using module path aliases like `@sonics-core` for imports
- Write MDX for component documentation pages

For example, here's the included Story for our `Button` component:

```js:apps/docs/stories/button.stories.mdx
import { Button } from '@sonics-core/src';
import { Meta, Story, Preview, Props } from '@storybook/addon-docs/blocks';

<Meta title="Components/Button" component={Button} />

# Button

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget consectetur tempor, nisl nunc egestas nisi, euismod aliquam nisl nunc euismod.

## Props

<Props of={Box} />

## Examples

<Preview>
  <Story name="Default">
    <Button>Hello</Button>
  </Story>
</Preview>
```

This example includes a few helpful Storybook scripts:

- `pnpm dev`: Starts Storybook in dev mode with hot reloading at `localhost:6006`
- `pnpm build`: Builds the Storybook UI and generates the static HTML files
- `pnpm preview-storybook`: Starts a local server to view the generated Storybook UI

## React application for testing

React app allows us to preview our components in the browser and instantly see changes when developing locally

For example, test button:

```js:apps/web/App.tsx
import { Button } from '@sonics-core/src';

export default function App() {
  return <Button>button from sonics-core</Button>
}
```

## Versioning & Publishing Packages

We uses [Changesets](https://github.com/changesets/changesets) to manage versions, create changelogs, and publish to npm. It's preconfigured so you can start publishing packages immediately.

You'll need to create an `NPM_TOKEN` and `GITHUB_TOKEN` and add it to your GitHub repository settings to enable access to npm. It's also worth installing the [Changesets bot](https://github.com/apps/changeset-bot) on your repository.

### Changesets instructions:

- When we fix a bug in @sonics-team/core as example:
1. `cd packages/sonics-core`
2. `npm version patch`
 
- When we add feature or improve it:
1. `cd packages/sonics-core`
2. `npm version minor`

- When we finish our milestone or reach planned target:
1. `cd packages/sonics-core`
2. `npm version major`

### Generating the Changelog

To generate your changelog, run `pnpm changeset` locally:

1. **Which packages would you like to include?** – This shows which packages and changed and which have remained the same. By default, no packages are included. Press `space` to select the packages you want to include in the `changeset`.
1. **Which packages should have a major bump?** – Press `space` to select the packages you want to bump versions for.
1. If doing the first major version, confirm you want to release.
1. Write a summary for the changes.
1. Confirm the changeset looks as expected.
1. A new Markdown file will be created in the `changeset` folder with the summary and a list of the packages included.

### Releasing

When you push your code to GitHub, the [GitHub Action](https://github.com/changesets/action) will run the `release` script defined in the root `package.json`:

```bash
pnpm release
```

Turborepo runs the `build` script for all publishable packages (excluding docs/web) and publishes the packages to npm. By default, this example includes `sonics` as the npm organization.
