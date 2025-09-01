"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FaGoogle,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { loginSchema, LoginInput } from "@/lib/validators";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface SignInFormProps {
  onForgotPassword: () => void;
  onOAuthSignIn: (provider: string) => Promise<void>;
}

export default function SignInForm({
  onForgotPassword,
  onOAuthSignIn,
}: SignInFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/account");
      router.refresh();
    } catch (err) {
      setError("An error occurred. Please try again.");
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

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded"
            {...register("rememberMe")}
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700"
          >
            Remember me
          </label>
        </div>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm font-medium text-navy hover:text-gold transition-colors"
        >
          Forgot Password?
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <Button type="submit" className="w-full mb-6" loading={loading}>
        Sign In
      </Button>

      <div className="relative flex items-center justify-center mb-6">
        <div className="flex-grow border-t border-gray-200" />
        <span className="flex-shrink mx-4 text-gray-500 text-sm">
          or continue with
        </span>
        <div className="flex-grow border-t border-gray-200" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => onOAuthSignIn("google")}
          className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FaGoogle className="text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => onOAuthSignIn("github")}
          className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FaGithub className="text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => onOAuthSignIn("linkedin")}
          className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FaLinkedin className="text-gray-700" />
        </button>
      </div>
    </form>
  );
}
