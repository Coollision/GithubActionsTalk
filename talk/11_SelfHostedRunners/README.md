# Self-Hosted Runners

## Overview

Self-hosted runners allow you to run workflows on your own infrastructure. This can be useful for running workflows on specialized hardware or in environments with specific requirements.

## Example Workflow

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: self-hosted
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Run build
        run: echo "Building the project"
```

## Setting Up a Self-Hosted Runner

1. Go to your repository on GitHub.
2. Click on "Settings" > "Actions" > "Runners".
3. Click "New self-hosted runner" and follow the instructions to set up the runner on your machine.
