"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { FaCheck } from "react-icons/fa";

export default function SignUpSuccess() {
  const router = useRouter();

  return (
    <div className="text-center transition-all duration-300">
      <div className="flex justify-center mb-6">
        <div className="bg-teal p-4 rounded-full">
          <FaCheck className="text-white text-2xl" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-navy mb-4">Welcome to CONCES!</h2>
      <p className="text-gray-600 mb-8">
        Your account has been created successfully. You&apos;re now part of
        Nigeria&apos;s brightest talent network.
      </p>

      <Button onClick={() => router.push("/account")} className="w-full">
        Continue to Dashboard
      </Button>
    </div>
  );
}
