# Managing Multiple Environments

## Overview

Different environments such as development, staging, and production require different configurations and workflows. Use environment variables to manage different settings for each environment. Set up rules to protect critical environments like production.

## Example Workflow

```yaml
name: Deploy

on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Deploy to ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
        run: echo "Deploying to ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}"
```
