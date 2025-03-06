# Service Containers

## Overview

Service containers are additional containers that run alongside your job container to provide services like databases or cache servers. Use the `services` keyword to define service containers in your workflow.

## Example Workflow

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:latest
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Wait for PostgreSQL
        run: until pg_isready -h localhost -p 5432; do sleep 1; done
      - name: Run tests
        run: npm test
```
