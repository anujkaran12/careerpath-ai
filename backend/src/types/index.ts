import { Document } from "mongoose";

export type IExperienceLevel = "Beginner" | "Intermediate" | "Advanced";

export interface IGenerateRoadmapBody {
  targetRole: string;
  currentSkills: string[];
  experienceLevel: IExperienceLevel;
}

export interface IGetPrompt {
  targetRole: string;
  currentSkills: [string];
  experienceLevel: IExperienceLevel;
}


