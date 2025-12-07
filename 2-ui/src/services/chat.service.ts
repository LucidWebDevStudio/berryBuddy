import { API_URL } from "../constants";
import { Message } from "../models/thread";

export const sendSendMessageService = async (
  idToken: string,
  discussion: Message[],
  createdAtTimeStamp: string | null,
  threadId: string | null
) => {
  const response = await fetch(`${API_URL}/send-message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: idToken,
    },
    body: JSON.stringify({ discussion, createdAtTimeStamp, threadId }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("error in sendSendMessageService:", errorText);
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const res = await response.json();
  return res;
};

export const getThreadsService = async (idToken: string) => {
  const response = await fetch(`${API_URL}/threads`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: idToken,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("error in getThreadsService:", errorText);
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const res = await response.json();
  return res;
};
