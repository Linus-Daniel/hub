"use client";

import { FaEnvelope } from "react-icons/fa";

interface ResetSuccessProps {
  onBack: () => void;
}

export default function ResetSuccess({ onBack }: ResetSuccessProps) {
  return (
    <div className="text-center transition-all duration-300">
      <div className="flex justify-center mb-6">
        <div className="bg-teal p-4 rounded-full">
          <FaEnvelope className="text-white text-2xl" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-navy mb-4">Check Your Email</h2>
      <p className="text-gray-600 mb-8">
        We&apos;ve sent a password reset link to your email address. Please
        check your inbox and follow the instructions.
      </p>

      <button
        onClick={onBack}
        className="text-navy hover:text-gold font-medium transition-colors"
      >
        Return to Sign In
      </button>
    </div>
  );
}
