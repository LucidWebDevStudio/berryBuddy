import { Stack } from "aws-cdk-lib";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { projectName, projectNamePascal } from "../../../constants";

export const createUserPoolClient = (stack: Stack, userPool: UserPool) => {
  const userPoolClient = new UserPoolClient(
    stack,
    `${projectNamePascal}UserPoolClient`,
    {
      userPool,
      userPoolClientName: `${projectName}---user-pool-client`,
      generateSecret: false,
      authFlows: {
        userSrp: true,
        userPassword: true,
      },
    }
  );

  return userPoolClient;
};
