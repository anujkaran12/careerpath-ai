import mongoose, { Schema } from "mongoose";

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

    generationType: {
      type: String,
      enum: ["ai", "hardcoded"],
      default: "ai",
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

export const RoadmapModel = mongoose.model("Roadmap", roadmapSchema);
