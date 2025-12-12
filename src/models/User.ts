import { Schema, model, models, Document } from "mongoose";

// Interfaces
interface INotifications {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}

interface IPrivacy {
  profileVisible: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showLocation: boolean;
}

interface IBilling {
  plan: "Free" | "Pro" | "Enterprise";
  status: "active" | "inactive" | "canceled";
  renewalDate?: Date;
}

export interface ITalentUser extends Document {
  _id: string;
  fullName: string; // Changed from fullname to fullName for consistency
  email: string;
  phone?: string;
  institution?: string;
  avatar?: string;
  major?: string;
  graduationYear?: string;
  emailVerified?: Date;
  emailVerificationToken?: string;
  password: string;
  location?: string;

  bio?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  profilePicture?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  status: "pending" | "approved" | "rejected";
  
  verified?: boolean; // Add verified field for consistency

  notifications: INotifications;
  privacy: IPrivacy;
  billing: IBilling;
  createdAt: Date;
  updatedAt: Date;
}

// Schema
const UserSettingsSchema = new Schema<ITalentUser>(
  {
    fullName: { type: String, required: true }, // Changed from fullname to fullName
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    institution: { type: String },
    major: { type: String },
    graduationYear: { type: String },
    location: { type: String },
    bio: { type: String },
    website: { type: String },
    linkedin: { type: String },
    github: { type: String },
    avatar: { type: String },
    profilePicture: { type: String },

    password: { type: String, required: true },

    emailVerificationToken: { type: String },
    emailVerified: { type: Date },

    // ✅ Approval status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // Add verified field for consistency with conces-official
    verified: { type: Boolean, default: false },

    // ✅ Password reset fields
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },

    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      marketing: { type: Boolean, default: false },
    },

    privacy: {
      profileVisible: { type: Boolean, default: true },
      showEmail: { type: Boolean, default: false },
      showPhone: { type: Boolean, default: false },
      showLocation: { type: Boolean, default: true },
    },

    billing: {
      plan: {
        type: String,
        enum: ["Free", "Pro", "Enterprise"],
        default: "Free",
      },
      status: {
        type: String,
        enum: ["active", "inactive", "canceled"],
        default: "active",
      },
      renewalDate: { type: Date },
    },
  },
  { timestamps: true }
);

// Add indexes for better performance
UserSettingsSchema.index({ email: 1 }, { unique: true });
UserSettingsSchema.index({ fullName: 1 });
UserSettingsSchema.index({ status: 1 });
UserSettingsSchema.index({ institution: 1 });
UserSettingsSchema.index({ createdAt: -1 });
UserSettingsSchema.index({ 
  fullName: 'text', 
  email: 'text', 
  institution: 'text', 
  major: 'text' 
});

const TalentUser = models.TalentUser || model<ITalentUser>("TalentUser", UserSettingsSchema);

export default TalentUser;