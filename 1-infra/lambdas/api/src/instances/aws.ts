import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { SSMClient } from "@aws-sdk/client-ssm";

// Systems manager, used for getting keys from parameter store
export const ssmClient = new SSMClient({
  region: "eu-north-1",
});

export const docClient = new DynamoDBClient({ region: "eu-north-1" });
