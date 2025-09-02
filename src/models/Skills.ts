import { Schema, model, models, Document, Types } from "mongoose";

// Skill interface
interface ISkill extends Document {
  user: Types.ObjectId; // Reference to User
  category: string;     // e.g., "Frontend Development"
  name: string;         // e.g., "React"
  level: string;        // e.g., "Expert"
  proficiency: number;  // e.g., 90 (percentage)
  experience: number;   // e.g., 3 (years)
  endorsements: number; // e.g., 12
  description?: string; // Optional extra details
}

// Skill schema
const SkillSchema = new Schema<ISkill>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true }, // e.g. "Frontend Development"
    name: { type: String, required: true },     // e.g. "React"
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced", "Expert"], required: true },
    proficiency: { type: Number, min: 0, max: 100, required: true }, // percentage
    experience: { type: Number, required: true }, // years
    endorsements: { type: Number, default: 0 },
    description: { type: String }
  },
  { timestamps: true }
);

export const Skill = models.Skill || model<ISkill>("Skill", SkillSchema);
