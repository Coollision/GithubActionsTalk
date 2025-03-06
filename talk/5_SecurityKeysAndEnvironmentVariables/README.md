# Security Keys and Environment Variables

## Overview

Store sensitive information such as API keys and passwords securely using GitHub Secrets. Use environment variables to pass configuration settings and secrets to your workflows.

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
      - name: Use secret
        run: echo "Using secret ${{ secrets.MY_SECRET }}"
      - name: Use environment variable
        run: echo "Using environment variable $MY_ENV_VAR"
        env:
          MY_ENV_VAR: ${{ secrets.MY_SECRET }}
```
