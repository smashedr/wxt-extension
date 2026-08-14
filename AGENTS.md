# Agent Guide — Cache Cleaner

Web Extension Template for Chrome and Firefox using the [WXT Framework](https://wxt.dev/), TypeScript, and Vue3.

## Project Structure

- `src/` - Source directory for the web extension, WXT Framework.
- `tests/` - Extension test directory.

## Commands

ALWAYS use the `npm run *` command

| Command              | What it does                   |
| -------------------- | ------------------------------ |
| `npm run build`      | `wxt build`                    |
| `npm run build:ff`   | build Firefox only (faster)    |
| `npm run docs:build` | `vitepress build docs`         |
| `npm run lint`       | `npx eslint src docs`          |
| `npm run prettier`   | ALWAYS RUN AFTER EDITING FILES |
