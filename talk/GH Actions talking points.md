# Introduction to GitHub Actions

(see https://docs.github.com/en/actions for more information)

## 1. What is GitHub Actions?

GitHub Actions is a CI/CD (Continuous Integration and Continuous Deployment) platform that allows you to automate your software workflows directly from your GitHub repository. It enables you to build, test, and deploy your code right from GitHub.

## 2. Pipeline Basics

### 2.1 Triggers

- **Events**: GitHub Actions can be triggered by various events such as push, pull request, release, and more.
- **Schedules**: You can also schedule workflows to run at specific times using cron syntax.
- **Manual Triggers**: Workflows can be triggered manually using the `workflow_dispatch` event.

### 2.2 Jobs

- **Jobs**: A workflow can have multiple jobs that run in parallel or sequentially.
- **Dependencies**: Jobs can depend on each other, allowing you to create complex workflows with conditional execution.
- **Matrix Builds**: You can run jobs with different configurations (e.g., different versions of a language or OS) using matrix builds.

### 2.3 Passing Variables Between Jobs

- **Usage**: Use outputs to pass variables from one job to another.
- **Example**: Demonstrate how to set an output in one job and use it in a subsequent job.

### 2.4 Matrix Deployments

- **Definition**: Matrix deployments allow you to deploy to multiple environments or configurations in parallel.
- **Usage**: Use the `matrix` keyword to define different deployment configurations.
- **Example**: Show how to set up a matrix deployment to deploy to multiple cloud providers or regions.

## 3. Security Keys and Environment Variables

- **Secrets**: Store sensitive information such as API keys and passwords securely using GitHub Secrets.
- **Environment Variables**: Use environment variables to pass configuration settings and secrets to your workflows.

## 4. Caching Dependencies

- **Purpose**: Speed up your workflows by caching dependencies and other commonly used files.
- **Implementation**: Use the `actions/cache` action to cache dependencies between workflow runs.

## 5. Reusable Workflows

- **Definition**: Create reusable workflows to avoid duplication and promote consistency across multiple repositories.
- **Usage**: Reference reusable workflows using the `uses` keyword in your workflow files.

## 6. Service Containers

- **Definition**: Service containers are additional containers that run alongside your job container to provide services like databases or cache servers.
- **Usage**: Use the `services` keyword to define service containers in your workflow.
- **Example**: Demonstrate how to set up a PostgreSQL service container for a job that requires a database.

## 7. Artifacts

- **Definition**: Artifacts are files generated during a workflow run that you may want to save for later use.
- **Usage**: Use the `actions/upload-artifact` and `actions/download-artifact` actions to manage artifacts.

## 8. Marketplace Actions and DIY Actions

- **Marketplace Actions**: Use pre-built actions from the GitHub Marketplace to simplify your workflows.
- **DIY Actions**: Create your own custom actions to meet specific needs not covered by existing actions.

## 9. Testing Pipelines Locally

- **Why Test Locally?**: Testing pipelines locally can save time and resources by catching issues before pushing to GitHub.
- **Tools**: Use tools like `act` to run GitHub Actions workflows locally.
- **Setup**: Install `act` and configure it to simulate the GitHub Actions environment on your local machine.
- **Example Workflow**: Demonstrate a simple workflow and how to test it locally using `act`.

## 10. Managing Multiple Environments

- **Definition**: Different environments such as development, staging, and production require different configurations and workflows.
- **Environment Variables**: Use environment variables to manage different settings for each environment.
- **Environment Protection Rules**: Set up rules to protect critical environments like production, such as requiring manual approvals or passing specific checks before deployment.
- **Example**: Demonstrate how to configure a workflow to deploy to different environments based on branch or tag.

## 11. Self-Hosted Runners

- **Mention**: Self-hosted runners allow you to run workflows on your own infrastructure, but this is out of scope for this talk.

## Conclusion

- **Recap**: Summarize the key points covered: pipeline basics, service containers, and testing pipelines locally.
- **Q&A**: Open the floor for questions from the audience.
- **Resources**: Provide links to GitHub Actions documentation and other helpful resources.
