import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { projectName, projectNamePascal } from "../../../constants";

export const createThreadsDynamoTable = (stack: Construct) => {
  const tableName = `${projectName}---threads`;
  const table = new dynamodb.Table(stack, `${projectNamePascal}Threads`, {
    tableName,
    partitionKey: {
      name: "email",
      type: dynamodb.AttributeType.STRING,
    },
    sortKey: {
      name: "threadId",
      type: dynamodb.AttributeType.STRING,
    },
    billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  });

  return table;
};
