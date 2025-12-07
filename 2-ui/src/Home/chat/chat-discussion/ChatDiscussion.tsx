import { useEffect, useRef } from "react";
import { autoScrollToBottom } from "../../../shared/auto-to-scroll-bottom";
import { ChatHeader } from "./chat-header/chat-header";
import { DiscussionWrapper } from "./discussion-wrapper/discussion-wrapper";
import { InputField } from "./input-field/input-field";
import { useMyStore } from "../../../store/state";

export const ChatDiscussion = () => {
  const { selectedThread } = useMyStore().chat;

  // Auto-scroll to bottom when discussion updates
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    autoScrollToBottom(scrollContainerRef);
  }, [selectedThread]);

  return (
    <main className="flex flex-col items-center h-screen w-screen p-4 sm:p-7">
      <ChatHeader />

      <div className="flex flex-1 w-full max-w-[700px] flex-col justify-between rounded-md overflow-hidden">
        {/* Scrollable Top Item */}
        <section
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto rounded-md pb-20"
        >
          <DiscussionWrapper />
        </section>

        {/* Bottom Item */}
        <section className="mt-3.5 pb-8 p-1 mb-2 md:pb-0">
          <InputField></InputField>
        </section>
      </div>
    </main>
  );
};
