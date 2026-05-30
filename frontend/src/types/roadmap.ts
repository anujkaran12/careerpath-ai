export type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced";
export type GenerationType = "ai" | "hardcoded";

export type RoadmapStep = {
  _id?: string;
  step: number;
  title: string;
  description: string;
  estimatedDuration: string;
  resources: string[];
  projectSuggestion: string;
};

export type Roadmap = {
  _id: string;
  targetRole: string;
  currentSkills: string[];
  experienceLevel: ExperienceLevel;
  generationType?: GenerationType;
  roadmap: RoadmapStep[];
  createdAt?: string;
  updatedAt?: string;
};

export type GenerateRoadmapPayload = {
  targetRole: string;
  currentSkills: string[];
  experienceLevel: ExperienceLevel;
  generationType: GenerationType;
};
