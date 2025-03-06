# Reusable Workflows

## Overview

Create reusable workflows to avoid duplication and promote consistency across multiple repositories. Reference reusable workflows using the `uses` keyword in your workflow files.

## Example Workflow

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    uses: your-org/your-repo/.github/workflows/build.yml@main
```

## Reusable Workflow Example

```yaml
name: Build

on: workflow_call

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```
