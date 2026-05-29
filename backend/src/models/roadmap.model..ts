import mongoose, { Schema, Document } from "mongoose";

export interface IRoadmap extends Document {
  targetRole: string;
  currentSkills: string[];
  experienceLevel: "Beginner" | "Intermediate" | "Advanced";
  roadmap: {
    step: number;
    title: string;
    description: string;
    estimatedDuration: string;
    resources: string[];
    projectSuggestion: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const roadmapSchema = new Schema(
  {
    targetRole: {
      type: String,
      required: true,
      trim: true,
    },

    currentSkills: {
      type: [String],
      default: [],
    },

    experienceLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },

    roadmap: [
      {
        step: Number,
        title: String,
        description: String,
        estimatedDuration: String,
        resources: [String],
        projectSuggestion: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IRoadmap>("Roadmap", roadmapSchema);
