// /app/dashboard/settings/components/PrivacySettings.tsx
"use client";

import { AlertTriangle } from "lucide-react";

interface PrivacySettingsProps {
  privacy: {
    profileVisible: boolean;
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
  };
  onSave: (data: any) => void;
  saving: boolean;
}

export default function PrivacySettings({
  privacy,
  onSave,
  saving,
}: PrivacySettingsProps) {
  const handleToggle = (key: string) => {
    onSave({
      ...privacy,
      [key]: !privacy[key as keyof typeof privacy],
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Privacy Settings</h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Profile Visibility
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Make your profile visible to other users
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.profileVisible}
              onChange={() => handleToggle("profileVisible")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Show Email Address
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Display your email address on your public profile
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.showEmail}
              onChange={() => handleToggle("showEmail")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Show Phone Number
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Display your phone number on your public profile
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.showPhone}
              onChange={() => handleToggle("showPhone")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Show Location</h3>
            <p className="text-gray-600 text-sm mt-1">
              Display your location on your public profile
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={privacy.showLocation}
              onChange={() => handleToggle("showLocation")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-red-800">Danger Zone</h3>
            <p className="text-red-600 text-sm mt-1">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
