# Github actions techtalk

<!-- set width of image -->
![alt text](./readme-assets/image.png =800x)

## the useless pipeline

## where to put the pipeline and what to put in the file?

`.github/workflows` directory in the root of your repository. there you can put multiple yaml files for different pipelines.

```yaml
name: dummy pipeline
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Run a one-line script
        run: echo Hello, world!
```

(`act -W '.github/workflows/dummy.yml'`)

### what is what?

- `name`: the name of the pipeline => not required but good for readability
- `on`: when to trigger the pipeline => required and very mush so
- `jobs`: the jobs to run in the pipeline => required
- `runs-on`: the environment to run the job on => required
- `steps`: the steps to run in the job => required, and needs to have at least one step
- `name`: the name of the step => not required but good for readability
- `run`: the command to run => depends on the step, but required for a run step

### how to trigger the pipeline? with triggers offcourse

kinds of triggers:

- github events like `push` , `pull_request`, `fork`, even on `issue_comment`
- `schedule`: on a schedule
- `workflow_dispatch`: manually => can also request user information
- `workflow_call` : when a workflow is triggered by another workflow => can also need more input

```yaml

you can even filter them

```yaml
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
    paths:
      - 'docs/**'
      - 'test/**'
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:
```

### what is a job?

a job is a set of steps that run on the same runner. a job can have multiple steps, and all steps in a job run on the same runner, allowing them to share information using the filesystem.

=> each job is a new container with a fresh environment

each job runs on a runner:
[runners](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#standard-github-hosted-runners-for-public-repositories)

### what is a step then?

a step is a set of tasks that execute commands. a job can have multiple steps, and each step runs commands on the same runner. steps can run commands in a variety of programming languages, shells, and tools.

=> each step is a new process in the same container can share information using the filesystem, but not the environment

### the power of actions and the marketplace cause its not called github steps

actions are reusable units of code that can be used in multiple workflows. you can create your own actions, use actions created by the GitHub community, or use actions from GitHub's [marketplace](https://github.com/marketplace?type=actions).

```yaml
steps:
  - name: Checkout code
    uses: actions/checkout@v2
  - name: Set up Node.js
    uses: actions/setup-node@v3
   ...

```

### other options

- `env`: environment variables to set for the job
- `defaults`: default values for jobs
- `services`: services to run alongside the job
- `strategy`: matrix of values to run the job with
- `permissions`: permissions for the job
- `outputs`: outputs of the job
- `needs`: dependencies for the job
- ... => probably more but these are the most important

## the fancy pipeline

see the `fancy-pipeline.yml` file



## Running GitHub Actions Locally with  [act](https://nektosact.com/introduction.html)

1. Install `act`:
   - Follow the instructions on the [act GitHub repository](https://github.com/nektos/act#installation).

      => brew install act
2. additional 'act' setup: (`code ~/.actrc`)

   ```text
   --container-architecture linux/arm64
   # set the architecture to arm64 so act does not complain about it 

   --env GITHUB_RUN_ID="$(date '+%s')"  
   # set a unique run id, as does github

   --reuse
   # make sure to reuse containers, speeds up builds

   --artifact-server-path $PWD/.artifacts
   # start artifact server and set the artifact server path to the current working directory

   -s SomeSecret=secret
   # set a secret for the act run

   --env SomePredefinedEnv=env
   # set a predefined environment variable for the act run

   ```

## demo todo-app

yarn db:start
yarn db:migrate
yarn db:seed

yarn test

yarn build

node dist/build/todo-app/index.mjs

yarn db:stop => otherwise act wont be able to start (port reuse)

### build GitHub Action pipeline with local testing

note local testing don't do docker login, cause not possible to login to github registry locally without doing gh token black magic

run act with `act push`

```yaml
name: CI

on:
  push:
    branches:
      - master

env:
  REGISTERY_BASE: ghcr.io/coollision/

jobs:
  install_and_lint_test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: postgres
        ports:
          - 5432:5432
        options: >-
          --health-cmd="pg_isready -U postgres"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=5

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'
          cache: 'yarn'
      
      - name: Run install
        uses: borales/actions-yarn@v5
        with:
          cmd: install # will run `yarn install` command

      - name: Run lint
        uses: borales/actions-yarn@v5
        with:
          cmd: lint # will run `yarn lint` command

      - name: Run db:migrate
        uses: borales/actions-yarn@v5
        with:
          cmd: db:migrate

      - name: Run test
        uses: borales/actions-yarn@v5
        with:
          cmd: test 


  build:
    runs-on: ubuntu-latest
    needs: install_and_lint_test
    outputs:
      list-apps: ${{ steps.list-apps.outputs.apps }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'
          cache: 'yarn'
      
      - name: Run install
        uses: borales/actions-yarn@v5
        with:
          cmd: install --immutable

      - name: Run build
        uses: borales/actions-yarn@v5
        with:
          cmd: build

      - name: Upload artifacts
        uses: actions/upload-artifact@v4
        with:
          name: build artefacts
          path: dist/*
          if-no-files-found: 'error'

      - name: List apps in dist/build
        id: list-apps
        run: |
          echo "apps=$(ls -d dist/build/*/ | xargs -n 1 basename | jq -R -s -c 'split("\n")[:-1]')" >> $GITHUB_OUTPUT

  build_docker_and_push:
    needs: build
    runs-on: ubuntu-latest
    strategy:
      matrix:
        app: ${{ fromJson(needs.build.outputs.list-apps) }}
    name: build and push docker for ${{ matrix.app }}

    permissions:
      contents: read
      packages: write
   
    steps:
      - name: Download artefact
        uses: actions/download-artifact@v4
        with:
          name: build artefacts
          path: dist/

      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: dist/build/${{ matrix.app }}
          file: dist/build/${{ matrix.app }}/Dockerfile
          push: true
          tags: ${{ env.REGISTERY_BASE }}${{ matrix.app }}:latest
```

### push this to github and check the actions

if not working compare with this file

#### demo docker images with docker compose

note dont forget db:migrate and db:seed, not automated in this demo
