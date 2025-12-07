import { Duration, aws_lambda as lambda } from "aws-cdk-lib";
import { Role } from "aws-cdk-lib/aws-iam";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { projectName, projectNamePascal } from "../../../constants";

export const createApiLambdaFunction = (stack: Construct, lambdaRole: Role) => {
  const apiFunction = new NodejsFunction(
    stack,
    `${projectNamePascal}ApiFunction`,
    {
      functionName: `${projectName}---api-function`,
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: "lambdas/api/src/index.ts", // Entry TypeScript file
      handler: "handler", // Exported function name
      memorySize: 256,
      depsLockFilePath: "lambdas/api/package-lock.json",
      timeout: Duration.minutes(15),
      role: lambdaRole,
      environment: {
        PROJECT_NAME: projectName,
      },
    }
  );

  return apiFunction;
};
