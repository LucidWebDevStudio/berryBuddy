#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { projectName, projectNamePascal } from "../constants";
import { AppStack } from "./AppStack/AppStack";
import { CognitoUserPoolStack } from "./CognitoUserPoolStack/CognitoUserPoolStack";
import { DynamoDBTablesStack } from "./DynamoDBTablesStack/DynamoDBTablesStack";
import { ApiLambdaStack } from "./ApiLambdaStack/ApiLambdaStack";

// Create CDK app
const app = new cdk.App();

const envConfig = {
  account: "171623197112",
  region: "eu-north-1",
};

const currentAccount = process.env.CDK_DEFAULT_ACCOUNT;

// JUST TO MAKE SURE I ALWAYS DEPLOY TO CORRECT AWS ACCOUNT
if (currentAccount && currentAccount !== envConfig.account) {
  throw new Error(
    `AWS Account mismatch: Expects account ${envConfig.account}, but your credentials are using ${currentAccount}`
  );
}

// --------------------------
// START OF STACKS

const cognitoStack = new CognitoUserPoolStack(
  app,
  `${projectNamePascal}CognitoUserPoolStack`,
  {
    stackName: `${projectName}---cognito-user-pool`,
    env: envConfig,
  }
);

new AppStack(app, `${projectNamePascal}AppStack`, {
  stackName: `${projectName}---app-s3-and-cf`,
  env: envConfig,
});

new DynamoDBTablesStack(app, `${projectNamePascal}DynamoDBTablesStack`, {
  stackName: `${projectName}---dynamodb-tables`,
  env: envConfig,
});

new ApiLambdaStack(app, `${projectNamePascal}ApiLambdaStack`, {
  stackName: `${projectName}---api-lambda`,
  userPoolClient: cognitoStack.userPoolClient, // these are needed for cognito api auth integration
  userPool: cognitoStack.userPool,
  env: envConfig,
});
