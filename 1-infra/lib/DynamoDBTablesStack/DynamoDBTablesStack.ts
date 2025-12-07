import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { createThreadsDynamoTable } from "./utils/createThreadsDynamoTable";

export class DynamoDBTablesStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    createThreadsDynamoTable(this);
  }
}
