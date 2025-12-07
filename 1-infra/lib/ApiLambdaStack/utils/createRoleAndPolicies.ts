import { aws_iam as iam } from "aws-cdk-lib";
import { Construct } from "constructs";

export const createRoleAndPolicies = (stack: Construct) => {
  const lambdaRole = new iam.Role(stack, "LambdaExecutionRole", {
    assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
  });

  lambdaRole.addToPolicy(
    new iam.PolicyStatement({
      actions: ["cognito-idp:*", "dynamodb:*", "logs:*", "ssm:*"],
      resources: ["*"],
    })
  );
  return lambdaRole;
};
