import BrandingPanel from "@/components/auth/BrandingPanel";
import AuthContainer from "@/components/auth/AuthContainer";

export default function AuthPage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      <BrandingPanel />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50">
        <AuthContainer />
      </div>
    </div>
  );
}
