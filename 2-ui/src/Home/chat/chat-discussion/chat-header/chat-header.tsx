import { useEffect, useState } from "react";
import { Logo } from "../../../../shared/Logo";

export const ChatHeader = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning!");
    } else if (hour < 18) {
      setGreeting("Good afternoon!");
    } else {
      setGreeting("Good evening!");
    }
  }, []);

  return (
    <header className="w-full max-w-[700px] pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Logo size="md" alt="BerryBuddy Logo" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-background"></span>
            </span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
              {greeting}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
