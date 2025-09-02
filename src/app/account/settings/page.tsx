"use client";

import { useState, useEffect } from "react";
import { User, Bell, Shield, CreditCard, Save } from "lucide-react";
import { toast } from "sonner";
import ProfileSettings from "@/components/accont/ProfileSettings";
import NotificationSettings from "@/components/accont/Notificatiion";
import PrivacySettings from "@/components/accont/Privacy";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  useEffect(() => {
    fetchUserSettings();
  }, []);

  const fetchUserSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      if (!response.ok) throw new Error("Failed to fetch settings");
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updates: any) => {
    setSaving(true);
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error("Failed to save settings");

      const updatedData = await response.json();
      setUserData(updatedData);
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Settings
          </h1>
          <p className="text-gray-600 mt-1">Manage your account preferences</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar - Mobile Horizontal, Desktop Vertical */}
            <div className="lg:w-64 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200">
              <nav className="p-2 lg:p-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? "bg-teal-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {activeTab === "profile" && userData && (
                <ProfileSettings
                  userData={userData}
                  onSave={handleSave}
                  saving={saving}
                />
              )}

              {activeTab === "notifications" && userData && (
                <NotificationSettings
                  notifications={userData.notifications}
                  onSave={(notifications) => handleSave({ notifications })}
                  saving={saving}
                />
              )}

              {activeTab === "privacy" && userData && (
                <PrivacySettings
                  privacy={userData.privacy}
                  onSave={(privacy) => handleSave({ privacy })}
                  saving={saving}
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
