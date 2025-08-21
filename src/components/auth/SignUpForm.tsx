"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/lib/validators";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { FaGoogle, FaLinkedin } from "react-icons/fa";

interface SignUpFormProps {
  onSuccess: () => void;
}

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="transition-all duration-300"
    >
      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <div className="mb-5">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Role (Optional)
        </label>
        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all"
          {...register("role")}
        >
          <option value="">Select your role</option>
          <option value="student">Student</option>
          <option value="alumni">Alumni</option>
          <option value="recruiter">Recruiter</option>
        </select>
      </div>

      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded"
            {...register("acceptTerms")}
          />
        </div>
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I agree to the{" "}
          <span className="text-navy hover:text-gold cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-navy hover:text-gold cursor-pointer">
            Privacy Policy
          </span>
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="mb-4 text-sm text-red-500">
          {errors.acceptTerms.message}
        </p>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <Button type="submit" className="w-full mb-6" loading={loading}>
        Create Account
      </Button>

      <div className="relative flex items-center justify-center mb-6">
        <div className="flex-grow border-t border-gray-200" />
        <span className="flex-shrink mx-4 text-gray-500 text-sm">
          or continue with
        </span>
        <div className="flex-grow border-t border-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FaGoogle className="mr-2" />
          <span className="text-gray-700 font-medium">Google</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FaLinkedin className="mr-2" />
          <span className="text-gray-700 font-medium">LinkedIn</span>
        </button>
      </div>
    </form>
  );
}
