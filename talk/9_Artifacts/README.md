# Artifacts

## Overview

Artifacts are files generated during a workflow run that you may want to save for later use. Use the `actions/upload-artifact` and `actions/download-artifact` actions to manage artifacts.

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
      - name: Build project
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-artifact@v2
        with:
          name: build
          path: build/

  deploy:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Download artifact
        uses: actions/download-artifact@v2
        with:
          name: build
          path: build/
      - name: Deploy
        run: echo "Deploying the project"
```
