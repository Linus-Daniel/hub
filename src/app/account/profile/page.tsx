"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeftIcon,
  BriefcaseIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  AcademicCapIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
      return;
    }
    if (status === "authenticated") {
      fetchUserData();
    }
  }, [status, router]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/settings");
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Profile not found</h2>
          <p className="text-gray-600 mt-2">Unable to load your profile data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-teal-600 transition"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              <span className="font-medium">Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          {/* Cover/Header Section */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-32"></div>
          
          {/* Profile Info Section */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-12">
              {/* Profile Picture */}
              <div className="relative mb-4 sm:mb-0">
                <img
                  src={
                    userData.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      userData.fullname || "User"
                    )}&background=14b8a6&color=fff&size=128`
                  }
                  alt="Profile"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-1 right-1 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>

              {/* Basic Info */}
              <div className="text-center sm:text-left sm:ml-6 flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {userData.fullname || "Your Name"}
                </h1>
                <p className="text-gray-600 text-lg">{userData.bio || "Add a bio to your profile"}</p>
                
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 mt-3 text-sm text-gray-600">
                  {userData.location && (
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span>{userData.location}</span>
                    </div>
                  )}
                  {userData.institution && (
                    <div className="flex items-center">
                      <AcademicCapIcon className="h-4 w-4 mr-1" />
                      <span>{userData.institution}</span>
                    </div>
                  )}
                  {userData.graduationYear && (
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span>Class of {userData.graduationYear}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                  <button
                    onClick={() => router.push('/account/settings')}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Edit Profile
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Share Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-900">{userData.email}</span>
                </div>
                {userData.phone && (
                  <div className="flex items-center">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-gray-900">{userData.phone}</span>
                  </div>
                )}
                {userData.website && (
                  <div className="flex items-center">
                    <UserIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <a
                      href={userData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-700"
                    >
                      {userData.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            {(userData.linkedin || userData.github) && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h2>
                <div className="space-y-3">
                  {userData.linkedin && (
                    <a
                      href={userData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <span className="mr-3">LinkedIn</span>
                    </a>
                  )}
                  {userData.github && (
                    <a
                      href={userData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-800 hover:text-gray-900"
                    >
                      <span className="mr-3">GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Academic Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Institution</label>
                  <p className="mt-1 text-gray-900">{userData.institution || "Not specified"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Major</label>
                  <p className="mt-1 text-gray-900">{userData.major || "Not specified"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
                  <p className="mt-1 text-gray-900">{userData.graduationYear || "Not specified"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      userData.status === 'approved' 
                        ? 'bg-green-100 text-green-800'
                        : userData.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {userData.status || 'Pending'}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Profile Visibility</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    userData.privacy?.profileVisible 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {userData.privacy?.profileVisible ? 'Public' : 'Private'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Show Email</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    userData.privacy?.showEmail 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {userData.privacy?.showEmail ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Show Phone</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    userData.privacy?.showPhone 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {userData.privacy?.showPhone ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}