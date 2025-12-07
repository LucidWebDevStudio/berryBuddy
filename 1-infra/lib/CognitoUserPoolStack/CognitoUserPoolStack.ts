import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { createUserPool } from "./utils/createUserPool";
import { createUserPoolClient } from "./utils/createUserPoolClient";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";

export class CognitoUserPoolStack extends Stack {
  public userPool: UserPool = {} as UserPool;
  public userPoolClient: UserPoolClient = {} as UserPoolClient;

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    this.userPool = createUserPool(this);
    this.userPoolClient = createUserPoolClient(this, this.userPool);
  }
}
