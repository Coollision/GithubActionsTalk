# Jobs

## Overview

A workflow can have multiple jobs that run in parallel or sequentially. Jobs can depend on each other, allowing you to create complex workflows with conditional execution. You can also run jobs with different configurations using matrix builds.

## Example Workflow

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [10, 12, 14]
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test

  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Deploy
        run: echo "Deploying the project"
```
