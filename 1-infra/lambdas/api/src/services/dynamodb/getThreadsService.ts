import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { THREADS_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const getThreadsService = async (email: string) => {
  const command = {
    TableName: THREADS_TABLE,
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };
  const response = await docClient.send(new QueryCommand(command));
  return response.Items;
};
