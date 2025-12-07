import { Stack } from "aws-cdk-lib";
import { UserPool, VerificationEmailStyle } from "aws-cdk-lib/aws-cognito";
import { projectName, projectNamePascal } from "../../../constants";

export const createUserPool = (stack: Stack) => {
  const userPool = new UserPool(stack, `${projectNamePascal}UserPool`, {
    userPoolName: `${projectName}---user-pool`,
    selfSignUpEnabled: true,
    signInAliases: {
      email: true,
    },
    autoVerify: {
      email: true,
    },
    userVerification: {
      emailStyle: VerificationEmailStyle.CODE,
    },
    passwordPolicy: {
      minLength: 6,
      requireUppercase: false,
      requireLowercase: false,
      requireDigits: false,
      requireSymbols: false,
    },
  });

  return userPool;
};
