"use client";

import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetSuccess from "./ResetSuccess";
import SignUpSuccess from "./SignUpSuccess";
import { FaGraduationCap } from "react-icons/fa";

type AuthView =
  | "signin"
  | "signup"
  | "forgot"
  | "reset-success"
  | "signup-success";

export default function AuthContainer() {
  const [currentView, setCurrentView] = useState<AuthView>("signin");

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md transition-all duration-300">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="bg-navy p-3 rounded-lg">
          <FaGraduationCap
          
            className="text-gold text-xl"
          />
        </div>
      </div>

      {/* Form Tabs */}
      {(currentView === "signin" || currentView === "signup") && (
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setCurrentView("signin")}
            className={`flex-1 py-3 font-medium text-center relative ${
              currentView === "signin" ? "text-navy" : "text-gray-500"
            }`}
          >
            Sign In
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-gold transform transition-all duration-300 ${
                currentView === "signin" ? "w-full" : "w-0"
              }`}
            />
          </button>
          <button
            onClick={() => setCurrentView("signup")}
            className={`flex-1 py-3 font-medium text-center relative ${
              currentView === "signup" ? "text-navy" : "text-gray-500"
            }`}
          >
            Sign Up
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-gold transform transition-all duration-300 ${
                currentView === "signup" ? "w-full" : "w-0"
              }`}
            />
          </button>
        </div>
      )}

      {/* Forms */}
      {currentView === "signin" && (
        <SignInForm onForgotPassword={() => setCurrentView("forgot")} />
      )}
      {currentView === "signup" && (
        <SignUpForm onSuccess={() => setCurrentView("signup-success")} />
      )}
      {currentView === "forgot" && (
        <ForgotPasswordForm
          onBack={() => setCurrentView("signin")}
          onSuccess={() => setCurrentView("reset-success")}
        />
      )}
      {currentView === "reset-success" && (
        <ResetSuccess onBack={() => setCurrentView("signin")} />
      )}
      {currentView === "signup-success" && <SignUpSuccess />}
    </div>
  );
}
