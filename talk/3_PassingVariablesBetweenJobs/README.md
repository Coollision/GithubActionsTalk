# Passing Variables Between Jobs

## Overview

You can use outputs to pass variables from one job to another. This allows you to share data between jobs in a workflow.

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
      - name: Run build
        run: echo "Build number: $GITHUB_RUN_NUMBER" > build_number.txt
      - name: Set output
        id: build
        run: echo "::set-output name=build_number::$(cat build_number.txt)"

  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Deploy
        run: echo "Deploying build number ${{ needs.build.outputs.build_number }}"
```
