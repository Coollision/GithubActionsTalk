# Triggers

## Overview

GitHub Actions can be triggered by various events such as push, pull request, release, and more. You can also schedule workflows to run at specific times using cron syntax or trigger them manually using the `workflow_dispatch` event.

## Example Workflow

```yaml
name: CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Run build
        run: echo "Building the project"
```
