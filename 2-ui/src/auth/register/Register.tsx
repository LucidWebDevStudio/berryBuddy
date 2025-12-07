import { signUp } from "@aws-amplify/auth";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../shared/Logo";

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email: email,
          },
          autoSignIn: true, // Enable auto sign-in after verification
        },
      });

      console.log("Registration successful:", result);

      if (result.isSignUpComplete) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else if (result.nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        setSuccess("Account created! Redirecting to verification...");
        setTimeout(
          () => navigate(`/verify-email?email=${encodeURIComponent(email)}`),
          1500
        );
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex w-full min-h-screen items-start justify-center bg-background p-4 pt-20">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-br from-primary/5 via-card to-accent/5 border-2 border-primary/20 rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-2 bg-primary/10 rounded-full">
                <Logo size="2xl" alt="BerryBuddy Chat Logo" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Join BerryBuddy
              </h1>
              <p className="text-muted-foreground mt-2">
                Create your account and start chatting
              </p>
            </div>
          </div>

          {error && (
            <div className="p-4 text-sm bg-destructive/10 border-l-4 border-destructive rounded-r-lg text-foreground">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 text-sm bg-green-500/10 border-l-4 border-green-500 rounded-r-lg text-foreground">
              {success}
            </div>
          )}

          <form className="space-y-5" onSubmit={onRegister}>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-foreground">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-card/50 backdrop-blur-sm border-2 border-primary/30 text-foreground text-base rounded-xl focus:ring-2 focus:ring-primary focus:border-primary block w-full p-3 placeholder:text-muted-foreground transition-all"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-foreground">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Create a strong password"
                className="bg-card/50 backdrop-blur-sm border-2 border-primary/30 text-foreground text-base rounded-xl focus:ring-2 focus:ring-primary focus:border-primary block w-full p-3 placeholder:text-muted-foreground transition-all"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Must be at least 8 characters long
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-primary-foreground bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-primary/30 font-semibold rounded-xl text-base px-6 py-3.5 text-center transition-all shadow-md hover:shadow-lg ${
                isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">
                Already have an account?
              </span>
            </div>
          </div>

          <Link
            to="/login"
            className="block w-full text-center text-primary hover:text-accent font-medium py-2 rounded-xl hover:bg-primary/5 transition-all"
          >
            Sign in instead
          </Link>
        </div>
      </div>
    </main>
  );
};
