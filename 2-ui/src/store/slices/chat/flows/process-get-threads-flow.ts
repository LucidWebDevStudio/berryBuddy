import { StoreApi } from "zustand";
import { State } from "../../../state";
import { getThreadsService } from "../../../../services/chat.service";
import { Thread } from "../../../../models/thread";
import { arrayToHashmap } from "../../../../shared/array-to-dictionary.util";
import { fetchAuthSession } from "@aws-amplify/auth";

export const processGetThreadsFlow = async (
  set: StoreApi<State>["setState"],
  get: StoreApi<State>["getState"]
) => {
  set((state) => {
    return {
      chat: {
        ...state.chat,
        isLoadingThreads: true,
      },
    };
  });

  try {
    // Get the ID token from Amplify Auth session
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken?.toString();

    if (!idToken) {
      throw new Error("No authentication token available");
    }

    const rawThreads: Thread[] = await getThreadsService(idToken);

    const threadsAsDictionary: {
      [threadId: string]: Thread;
    } = arrayToHashmap(rawThreads, "threadId");

    set((state) => {
      return {
        chat: {
          ...state.chat,
          threads: threadsAsDictionary,
          isLoadingThreads: false,
        },
      };
    });
  } catch (err) {
    console.log(err);
    set((state) => ({
      chat: {
        ...state.chat,
        error: "Failed to get threads",
        isLoadingThreads: false,
      },
    }));
  }
};
