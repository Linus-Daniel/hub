import { NextRequest } from "next/server";
import { connectDB } from "./mongodb";
import mongoose from "mongoose";

// Define User model for validation (matching conces-official)
const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "alumni", "chapter-admin", "admin"],
    required: true,
  },
  verified: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function validateAdminToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid authorization header");
  }

  const token = authHeader.substring(7);

  try {
    // Decode the base64 token
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());

    // Basic validation
    if (!decoded.userId || !decoded.email || !decoded.timestamp) {
      throw new Error("Invalid token structure");
    }

    // Check token age (24 hours max)
    const tokenAge = Date.now() - decoded.timestamp;
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    if (tokenAge > maxAge) {
      throw new Error("Token expired");
    }

    // Connect to database and validate user exists and has admin permissions
    await connectDB();
    
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Verify user is verified and has admin role
    if (!user.verified) {
      throw new Error("User account not verified");
    }

    if (user.role !== "admin" && user.role !== "chapter-admin") {
      throw new Error("Insufficient permissions - Admin role required");
    }

    // Return enriched token data
    return {
      userId: decoded.userId,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      verified: user.verified,
      timestamp: decoded.timestamp,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Invalid token format");
  }
}
