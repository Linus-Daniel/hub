"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { FaCheckCircle, FaKey } from "react-icons/fa";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    if (!token) {
      setError("Invalid reset link");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(result.message || "Failed to reset password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy via-navy/90 to-navy/80 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-navy mb-4">
            Invalid Reset Link
          </h1>
          <p className="text-gray-600 mb-6">
            This password reset link is invalid or has expired.
          </p>
          <Button onClick={() => router.push("/auth")} className="w-full">
            Back to Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy/90 to-navy/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {!success ? (
          <>
            <div className="text-center mb-6">
              <div className="bg-navy/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaKey className="text-2xl text-navy" />
              </div>
              <h1 className="text-2xl font-bold text-navy">
                Reset Your Password
              </h1>
              <p className="text-gray-600 mt-2">
                Enter your new password below
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="New Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password")}
              />

              <Input
                label="Confirm New Password"
                type="password"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" loading={loading}>
                Reset Password
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="bg-teal/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-4xl text-teal" />
            </div>
            <h1 className="text-2xl font-bold text-navy mb-2">
              Password Reset Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Your password has been reset successfully. You can now sign in
              with your new password.
            </p>
            <Button onClick={() => router.push("/auth")} className="w-full">
              Continue to Sign In
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
