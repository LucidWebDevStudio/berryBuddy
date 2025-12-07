import { GetParameterCommand } from "@aws-sdk/client-ssm";
import { ssmClient } from "../../instances/aws";

export const getApiKeyFromParameterStore = async (parameterName: string) => {
  const params = { Name: parameterName, WithDecryption: true };
  const command = new GetParameterCommand(params);

  return await ssmClient.send(command).then((res: any) => res.Parameter?.Value);
};
