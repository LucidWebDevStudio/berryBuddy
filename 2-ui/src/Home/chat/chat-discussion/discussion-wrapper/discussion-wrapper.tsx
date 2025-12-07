import { Message } from "../../../../models/thread";
import { useMyStore } from "../../../../store/state";
import { AiResponse } from "./ai-response/ai-response";
import { UserMessage } from "./user-message/user-message";

export const DiscussionWrapper = () => {
  const { selectedThread } = useMyStore().chat;

  return (
    <main>
      {selectedThread?.discussion.map((chatBubble: Message, i: number) =>
        chatBubble.role === "assistant" ? (
          <AiResponse
            key={i}
            content={chatBubble.content}
            citations={chatBubble.citations}
          />
        ) : (
          <UserMessage key={i} content={chatBubble.content} />
        )
      )}
    </main>
  );
};
