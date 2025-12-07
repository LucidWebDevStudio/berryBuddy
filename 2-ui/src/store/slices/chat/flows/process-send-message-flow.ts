import { StoreApi } from "zustand";
import { State } from "../../../state";
import { sendSendMessageService } from "../../../../services/chat.service";
import { Message, Thread } from "../../../../models/thread";
import { fetchAuthSession } from "@aws-amplify/auth";

export const processSendMessageFlow = async (
  set: StoreApi<State>["setState"],
  get: StoreApi<State>["getState"],
  message: string
) => {
  set((state) => ({
    chat: {
      ...state.chat,
      isSendMessageLoading: true,
    },
  }));

  const selectedThread = get().chat.selectedThread;
  const userMessage: Message = { role: "user", content: message };

  try {
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken?.toString();

    if (!idToken) {
      throw new Error("No authentication token available");
    }
    // THIS IS BRAND NEW THREAD
    if (!selectedThread) {
      const discussion: Message[] = [userMessage];

      const thread: Thread = await sendSendMessageService(
        idToken,
        discussion,
        null,
        null
      );

      set((state) => ({
        chat: {
          ...state.chat,
          isSendMessageLoading: false,
          threads: { ...state.chat.threads, [thread.threadId]: thread },
          selectedThread: thread,
          selectedThreadId: thread.threadId,
        },
      }));
    } else {
      console.log("existing thread, discussion continues");
      const discussion: Message[] = [...selectedThread.discussion, userMessage];
      const thread: Thread = await sendSendMessageService(
        idToken,
        discussion,
        selectedThread.createdAtTimeStamp,
        selectedThread.threadId
      );

      set((state) => ({
        chat: {
          ...state.chat,
          isSendMessageLoading: false,
          threads: { ...state.chat.threads, [thread.threadId]: thread },
          selectedThread: thread,
          selectedThreadId: thread.threadId,
        },
      }));
    }
  } catch (err) {
    console.log("error:");
    console.log(err);

    set((state) => ({
      chat: {
        ...state.chat,
        isSendMessageLoading: false,
        error: "Failed to send message",
      },
    }));
  }
};
