# BerryBud

Built with React, TypeScript, Vite, Anthropic Claude, and AWS Cognito.

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **AI**: Anthropic Claude
- **Auth**: AWS Cognito
- **Infrastructure**: AWS CDK (Lambda, API Gateway, S3, CloudFront, DynamoDB)

## Screenshots

### Welcome Screen

### Story Generation

### Chat Interface

### Light Theme

### Dark Theme

## Deployment Instructions

### 1. Deploy Infrastructure

Navigate to the infrastructure directory and deploy all CDK stacks:

```bash
cd 1-infra
cdk deploy --all
```

### 2. Configure Frontend Constants

After deployment completes, you need to copy AWS resource IDs to your frontend configuration.

#### 2.1 Get Cognito Credentials

1. Open the [AWS CloudFormation Console](https://console.aws.amazon.com/cloudformation)
2. Find and open the stack: `berry-buddy---cognito-user-pool`
3. Go to the **Outputs** tab
4. Copy the following values:
   - `UserPoolId`
   - `UserPoolClientId`
5. Paste them into `2-ui/src/constants/index.ts`

#### 2.2 Get API Gateway URL

1. In CloudFormation Console, open the stack: `berry-buddy---api-lambda`
2. Go to the **Outputs** tab
3. Copy the `ApiInvokeUrl` value
4. Paste it into `2-ui/src/constants/index.ts`

### 3. Deploy Frontend

Navigate to the UI directory and deploy:

```bash
cd 2-ui
npm run deploy
```

### 4. Access Your App

1. Open the [AWS CloudFormation Console](https://console.aws.amazon.com/cloudformation)
2. Find and open the stack: `berry-buddy---app-s3-and-cf`
3. Go to the **Outputs** tab
4. Click on the `CloudFrontURL` to open your deployed app

🎉 Your BerryBud app is now live!

## Development

To run locally:

```bash
cd 2-ui
npm install
npm run dev
```

## Project Structure

```
├── 1-infra/          # AWS CDK infrastructure code
│   ├── lib/          # CDK stack definitions
│   └── lambdas/      # Lambda function code
└── 2-ui/             # React frontend application
    └── src/          # Source code
```
