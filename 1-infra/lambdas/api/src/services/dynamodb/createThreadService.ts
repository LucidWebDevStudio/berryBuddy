import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { THREADS_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const createThreadService = async (thread: any) => {
  const sizeInBytes = Buffer.byteLength(JSON.stringify(thread), "utf8");
  const sizeInKB = Math.round(sizeInBytes / 1024);
  const maxKB = 400;
  const warningThresholdKB = 350;

  console.log(`🧵 THREAD SIZE: ${sizeInKB} KB (${sizeInBytes} bytes)`);
  console.log(`📏 MAX SIZE: ${maxKB} KB`);

  if (sizeInKB > warningThresholdKB) {
    throw new Error(
      `❌ Thread item too large (${sizeInKB} KB) — DynamoDB max is ${maxKB} KB. Consider splitting.`
    );
  }

  const command = {
    TableName: THREADS_TABLE,
    Item: thread,
  };

  await docClient.send(new PutCommand(command));
};
