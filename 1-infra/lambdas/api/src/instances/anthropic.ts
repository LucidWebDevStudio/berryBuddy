import Anthropic from "@anthropic-ai/sdk";
import { getApiKeyFromParameterStore } from "../services/parameter-store/get-api-key-from-parameter-store.service";

let anthropicClient: Anthropic | null = null;

export const getAnthropicClient = async (): Promise<Anthropic> => {
  if (!anthropicClient) {
    const parameterName = "ANTHROPIC_API_KEY";
    const apiKey = await getApiKeyFromParameterStore(parameterName);

    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY not found in Parameter Store");
    }

    anthropicClient = new Anthropic({ apiKey });
  }

  return anthropicClient;
};
