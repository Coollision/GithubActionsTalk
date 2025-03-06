# Caching Dependencies

## Overview

Speed up your workflows by caching dependencies and other commonly used files. Use the `actions/cache` action to cache dependencies between workflow runs.

## Example Workflow

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Cache dependencies
        uses: actions/cache@v2
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```
