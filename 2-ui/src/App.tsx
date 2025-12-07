import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./auth/login/Login";
import { Register } from "./auth/register/Register";
import { VerifyEmail } from "./auth/verify-email/VerifyEmail";
import { AuthenticatedRoute, UnAuthenticatedRoute } from "./Guards/Guards";
import { Home } from "./Home/Home";
import { ThemeToggle } from "./shared/theme-toggle/ThemeToggle";

export const App = () => {
  return (
    <>
      <ThemeToggle />
      <Routes>
        <Route
          path="/login"
          element={
            <UnAuthenticatedRoute>
              <Login />
            </UnAuthenticatedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <UnAuthenticatedRoute>
              <Register />
            </UnAuthenticatedRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <UnAuthenticatedRoute>
              <VerifyEmail />
            </UnAuthenticatedRoute>
          }
        />
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <Home />
            </AuthenticatedRoute>
          }
        />

        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </>
  );
};
