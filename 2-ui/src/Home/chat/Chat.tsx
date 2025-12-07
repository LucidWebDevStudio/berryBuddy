import { useEffect } from "react";
import { ChatDiscussion } from "./chat-discussion/ChatDiscussion";
import { SideNav } from "./sidenav/sidenav";
import { EmptyHelloChatScreen } from "./empty-hello-chat-screen/EmptyHelloChatScreen";
import { useMyStore } from "../../store/state";

export const Chat = () => {
  const { selectedThread, getThreads } = useMyStore().chat;

  useEffect(() => {
    getThreads();
  }, []);

  return (
    <>
      <SideNav>
        {selectedThread?.discussion?.length ? (
          <ChatDiscussion />
        ) : (
          <EmptyHelloChatScreen />
        )}
      </SideNav>
    </>
  );
};
