import { Document } from "mongoose";

export type IExperienceLevel = "Beginner" | "Intermediate" | "Advanced";
export type IGenerationType = "ai" | "hardcoded";

export interface IGenerateRoadmapBody {
  targetRole: string;
  currentSkills: string[];
  experienceLevel: IExperienceLevel;
  generationType?: IGenerationType;
}

export interface IGetPrompt {
  targetRole: string;
  currentSkills: [string];
  experienceLevel: IExperienceLevel;
}


