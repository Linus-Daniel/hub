const mongoose = require("mongoose");

// TalentUser Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false, // Don't include by default in queries
    },
    bio: {
      type: String,
      required: true,
    },
    avatar: String,
    location: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
      minlength: 2,
    },
    graduationYear: {
      type: Number,
      required: true,
      min: 2020,
      max: 2035,
    },
    major: {
      type: String,
      required: true,
      minlength: 2,
    },
    minor: String,
    gpa: {
      type: Number,
      min: 0,
      max: 4.0,
    },
    phoneNumber: String,
    dateOfBirth: Date,
    socialLinks: {
      linkedin: {
        type: String,
        match: /^https?:\/\/.+/,
      },
      github: {
        type: String,
        match: /^https?:\/\/.+/,
      },
      portfolio: {
        type: String,
        match: /^https?:\/\/.+/,
      },
      twitter: {
        type: String,
        match: /^https?:\/\/.+/,
      },
      instagram: {
        type: String,
        match: /^https?:\/\/.+/,
      },
      behance: {
        type: String,
        match: /^https?:\/\/.+/,
      },
      dribbble: {
        type: String,
        match: /^https?:\/\/.+/,
      },
    },
    preferences: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      profileVisibility: {
        type: String,
        enum: ["public", "private", "university"],
        default: "public",
      },
      showContact: {
        type: Boolean,
        default: true,
      },
    },
    verificationStatus: {
      email: {
        type: Boolean,
        default: false,
      },
      university: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: Boolean,
        default: false,
      },
    },
    accountStatus: {
      type: String,
      enum: ["active", "suspended", "pending", "inactive"],
      default: "active",
    },
    lastLoginAt: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes for TalentUser
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true, sparse: true });
userSchema.index({ name: "text", bio: "text", major: "text" });
userSchema.index({ university: 1 });
userSchema.index({ graduationYear: 1 });
userSchema.index({ major: 1 });
userSchema.index({ location: 1 });
userSchema.index({ university: 1, graduationYear: 1 });
userSchema.index({ major: 1, graduationYear: 1 });
userSchema.index({ accountStatus: 1 });

// Skill Schema (embedded in Portfolio)
const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  yearsOfExperience: Number,
  certifications: [String],
  endorsements: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TalentUser",
        required: true,
      },
      endorserName: {
        type: String,
        required: true,
      },
      relationship: {
        type: String,
        required: true,
      },
      message: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Create Models
const TalentUser = mongoose.model("TalentUser", userSchema);

module.exports = {
  TalentUser,
};
