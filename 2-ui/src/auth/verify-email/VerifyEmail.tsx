import { autoSignIn, confirmSignUp, resendSignUpCode } from "@aws-amplify/auth";
import { Loader2, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Logo } from "../../shared/Logo";

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailFromUrl);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Step 1: Confirm the email
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      console.log("Email verified successfully");

      // Step 2: Automatically sign in using autoSignIn
      // This works if the user registered with signUp and hasn't closed the session
      try {
        const result = await autoSignIn();
        console.log("Auto-login successful:", result);

        if (result.isSignedIn) {
          setSuccess("Email verified! Redirecting to home...");
          setTimeout(() => navigate("/"), 1500);
        }
      } catch (autoSignInError) {
        console.log("AutoSignIn not available, redirecting to login");
        // If autoSignIn fails (e.g., session expired), redirect to login
        setSuccess("Email verified! Please sign in...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.message || "Failed to verify email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onResendCode = async () => {
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsResending(true);
    setError("");
    setSuccess("");

    try {
      await resendSignUpCode({
        username: email,
      });

      console.log("Verification code resent");
      setSuccess("Verification code sent! Check your email.");
    } catch (err: any) {
      console.error("Resend error:", err);
      setError(err.message || "Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="flex w-full min-h-screen items-start justify-center bg-background p-4 pt-20">
      <div className="w-full max-w-md">
        <div className="bg-card border-2 border-border rounded-2xl shadow-lg p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <Mail className="text-primary" size={40} />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Verify Your Email
              </h1>
              <p className="text-muted-foreground mt-2">
                We've sent a verification code to your email address. Enter it
                below to complete your registration.
              </p>
            </div>
          </div>

          {error && (
            <div className="p-4 text-sm bg-destructive/10 border-l-4 border-destructive rounded-r-lg text-foreground">
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 text-sm bg-green-500/10 border-l-4 border-green-500 rounded-r-lg text-foreground flex items-center gap-2">
              <ShieldCheck size={18} />
              {success}
            </div>
          )}

          <form className="space-y-5" onSubmit={onVerify}>
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
                Verification Code
              </label>
              <input
                type="text"
                name="code"
                id="code"
                className="bg-input border-2 border-border text-foreground rounded-xl focus:ring-2 focus:ring-primary focus:border-primary block w-full p-3 placeholder:text-muted-foreground transition-all text-center !text-2xl tracking-widest font-semibold"
                placeholder="000000"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground mt-1 text-center">
                Enter the 6-digit code from your email
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
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify Email"
              )}
            </button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={onResendCode}
              disabled={isResending}
              className={`text-sm text-primary hover:underline font-medium ${
                isResending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isResending ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={14} />
                  Resending code...
                </span>
              ) : (
                "Didn't receive the code? Resend"
              )}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">
                Already verified?
              </span>
            </div>
          </div>

          <Link
            to="/login"
            className="block w-full text-center text-primary hover:text-accent font-medium py-2 rounded-xl hover:bg-primary/5 transition-all"
          >
            Sign in to your account
          </Link>
        </div>
      </div>
    </main>
  );
};
