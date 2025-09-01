"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";
import Button from "@/components/ui/Button";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message);
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during verification");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy/90 to-navy/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <FaSpinner
              className="text-6xl text-gold mb-4 animate-spin"
            />
            <h1 className="text-2xl font-bold text-navy mb-2">
              Verifying Email...
            </h1>
            <p className="text-gray-600">
              Please wait while we verify your email address
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="bg-teal/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle
                className="text-4xl text-teal"
              />
            </div>
            <h1 className="text-2xl font-bold text-navy mb-2">
              Email Verified!
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <Button onClick={() => router.push("/auth")} className="w-full">
              Continue to Sign In
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTimesCircle
                className="text-4xl text-red-500"
              />
            </div>
            <h1 className="text-2xl font-bold text-navy mb-2">
              Verification Failed
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <Button
              onClick={() => router.push("/auth")}
              variant="outline"
              className="w-full"
            >
              Back to Sign In
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
