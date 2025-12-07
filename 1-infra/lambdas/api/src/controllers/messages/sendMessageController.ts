import { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { getAnthropicClient } from "../../instances/anthropic";
import { Message, Thread } from "../../models/thread";
import { createThreadService } from "../../services/dynamodb/createThreadService";
import { parseClaudeResponse } from "./utils/parseClaudeResponse";
import { bedtimeSystemPrompt } from "./utils/bedtimeSystemPrompt";

export const sendMessageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const decodedIdToken = (req as any).decodedIdToken;
  const fullThreadWithNewUserMessage = req.body;

  const anthropic = await getAnthropicClient();

  let threadId = fullThreadWithNewUserMessage.threadId;
  let createdAtTimeStamp = fullThreadWithNewUserMessage.createdAtTimeStamp;

  if (!threadId) {
    threadId = randomUUID();
    createdAtTimeStamp = new Date().toISOString();
  }

  // Strip citations before sending to Claude
  const claudeCompatibleMessages = fullThreadWithNewUserMessage.discussion.map(
    ({ role, content }: any) => ({
      role,
      content,
    })
  );
  console.log("Started doing anthropic api call");

  const claudeResponse = await anthropic.messages.create({
    model: "claude-3-5-haiku-latest",
    max_tokens: 1024, // 1024, 256
    system: bedtimeSystemPrompt,
    messages: claudeCompatibleMessages,
    //  tools: [ // no need for web search for bed time stories bot
    //       {
    //         type: "web_search_20250305",
    //         name: "web_search",
    //         max_uses: 5,
    //       },
    //     ],
  });

  const parsed = parseClaudeResponse(claudeResponse);

  // Append assistant message to discussion
  const updatedDiscussion: Message[] = [
    ...fullThreadWithNewUserMessage.discussion,
    parsed,
  ];

  console.log("updatedDiscussion");
  console.log(updatedDiscussion);

  // Compose the full thread object to store
  const fullThread: Thread = {
    ...fullThreadWithNewUserMessage,
    createdAtTimeStamp,
    email: decodedIdToken.email,
    threadId,
    discussion: updatedDiscussion,
  };

  await createThreadService(fullThread);

  res.json(fullThread);
};
