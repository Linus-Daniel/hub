// /app/dashboard/settings/components/NotificationSettings.tsx
"use client";

interface NotificationSettingsProps {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
  };
  onSave: (data: any) => void;
  saving: boolean;
}

export default function NotificationSettings({
  notifications,
  onSave,
  saving,
}: NotificationSettingsProps) {
  const handleToggle = (key: string) => {
    onSave({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications],
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Notification Preferences
      </h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Email Notifications
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Receive notifications via email
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => handleToggle("email")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Push Notifications
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Receive push notifications in your browser
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={() => handleToggle("push")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              SMS Notifications
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Receive important updates via SMS
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={() => handleToggle("sms")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Marketing Communications
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Receive updates about new features and opportunities
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.marketing}
              onChange={() => handleToggle("marketing")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
