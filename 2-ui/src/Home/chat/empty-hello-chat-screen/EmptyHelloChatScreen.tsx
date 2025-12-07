import { Logo } from "../../../shared/Logo";
import { InputField } from "../chat-discussion/input-field/input-field";

export const EmptyHelloChatScreen = () => {
  return (
    <div className="w-screen h-screen flex justify-center pt-[33vh]">
      <div className="w-full max-w-xl sm:max-w-3xl px-4 text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <Logo size="2xl" alt="BerryBuddy Logo" />
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-background"></span>
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Hi, I'm BerryBud!✨
          </h1>
          <p className="text-muted-foreground">
            I create calming bedtime stories to help little ones drift off to
            sleep. Just tell me one favorite thing—like an animal, toy, or
            color—and I'll craft a peaceful story around it.
          </p>
        </div>

        <InputField></InputField>
      </div>
    </div>
  );
};
