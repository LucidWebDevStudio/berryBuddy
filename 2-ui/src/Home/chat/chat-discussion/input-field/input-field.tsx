import { Loader2, SendHorizonal } from "lucide-react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useMyStore } from "../../../../store/state";

export const InputField = () => {
  const { sendMessage, isSendMessageLoading } = useMyStore().chat;

  const [userInput, setUserInput] = useState("");

  const handleKeyDown = (e: any) => {
    // Enter sends message. Shift + Enter adds new row

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline insertion
      handleSendMessage(); // Submit the message
    }
  };

  const handleSendMessage = () => {
    console.log("handleSendMessage");

    const trimmed = userInput.trim();
    if (trimmed === "") return;
    sendMessage(userInput);
    setUserInput("");
  };

  return (
    <div className="relative w-full">
      <TextareaAutosize
        placeholder="Tell me about a favorite animal, toy, or color..."
        disabled={isSendMessageLoading}
        className="flex w-full resize-none rounded-2xl border border-border bg-input px-3 py-2 pr-10 text-base text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        maxRows={8}
        minRows={3}
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      {isSendMessageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-input/80 backdrop-blur-sm rounded-2xl">
          <div className="flex flex-col items-center gap-3 p-4">
            <div className="relative">
              <Loader2 className="animate-spin text-primary" size={32} />
              <div className="absolute inset-0 animate-ping">
                <Loader2 className="text-primary/30" size={32} />
              </div>
            </div>
            <span className="text-sm font-medium text-primary animate-pulse">
              Berry is thinking...
            </span>
          </div>
        </div>
      )}

      <button
        disabled={isSendMessageLoading}
        onClick={handleSendMessage}
        className={`cursor-pointer absolute bottom-2.5 right-2.5 text-foreground hover:text-primary transition-colors ${
          isSendMessageLoading ? "opacity-0 pointer-events-none" : ""
        }`}
      >
        <SendHorizonal size={18} />
      </button>
    </div>
  );
};
