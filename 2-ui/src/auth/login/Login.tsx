import { signIn } from "@aws-amplify/auth";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../shared/Logo";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn({
        username: email,
        password: password,
      });

      console.log("Login successful:", result);

      // Navigate to home on success
      if (result.isSignedIn) {
        navigate("/");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex w-full min-h-screen items-start justify-center bg-background p-4 pt-20">
      <div className="w-full max-w-md">
        <div className="bg-card border-2 border-border rounded-2xl shadow-lg p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Logo size="2xl" alt="BerryBuddy Chat Logo" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome Back
              </h1>
              <p className="text-muted-foreground mt-2">
                Sign in to continue to BerryBuddy
              </p>
            </div>
          </div>

          {error && (
            <div className="p-4 text-sm bg-destructive/10 border-l-4 border-destructive rounded-r-lg text-foreground">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={onLogin}>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-foreground">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-input border-2 border-border text-foreground text-base rounded-xl focus:ring-2 focus:ring-primary focus:border-primary block w-full p-3 placeholder:text-muted-foreground transition-all"
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
                placeholder="Enter your password"
                className="bg-input border-2 border-border text-foreground text-base rounded-xl focus:ring-2 focus:ring-primary focus:border-primary block w-full p-3 placeholder:text-muted-foreground transition-all"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">
                New to BerryBuddy?
              </span>
            </div>
          </div>

          <Link
            to="/register"
            className="block w-full text-center text-primary hover:text-accent font-medium py-2 rounded-xl hover:bg-primary/5 transition-all"
          >
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
};
