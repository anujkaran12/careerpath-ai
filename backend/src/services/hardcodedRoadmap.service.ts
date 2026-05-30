import { IGenerateRoadmapBody } from "../types";

const formatSkills = (skills: string[]) => {
  if (!skills.length) {
    return "your current skills";
  }

  return skills.join(", ");
};

export const generateHardcodedRoadmap = ({
  targetRole,
  currentSkills,
  experienceLevel,
}: IGenerateRoadmapBody) => {
  const skillsText = formatSkills(currentSkills);

  return {
    targetRole,
    experienceLevel,
    roadmap: [
      {
        step: 1,
        title: `${targetRole} foundation review`,
        description: `Start by mapping the core skills needed for a ${targetRole} role and compare them with your current skills: ${skillsText}. Focus on filling the most important gaps first.`,
        estimatedDuration: "1 week",
        resources: [
          `${targetRole} beginner roadmap`,
          `${targetRole} fundamentals documentation`,
        ],
        projectSuggestion: `Create a simple notes document that lists the required skills for ${targetRole} and marks what you already know.`,
      },
      {
        step: 2,
        title: "Strengthen core concepts",
        description: `Build stronger fundamentals based on your ${experienceLevel.toLowerCase()} level. Prioritize concepts that appear often in real ${targetRole} job descriptions.`,
        estimatedDuration: "2 weeks",
        resources: [
          "Official documentation",
          "FreeCodeCamp or equivalent structured tutorials",
        ],
        projectSuggestion: `Build a small practice project that uses your existing skills (${skillsText}) plus one new core concept.`,
      },
      {
        step: 3,
        title: "Practice role-specific tools",
        description: `Learn the common tools, workflows, and best practices expected from a ${targetRole}. Keep the scope practical and avoid learning too many tools at once.`,
        estimatedDuration: "2 weeks",
        resources: [
          `${targetRole} tools guide`,
          "YouTube crash courses from reputable instructors",
        ],
        projectSuggestion: `Create a mini project using one important tool used by ${targetRole} professionals.`,
      },
      {
        step: 4,
        title: "Build a portfolio project",
        description: `Create a complete project that proves you can apply your skills to a realistic ${targetRole} problem. Make sure it has clear documentation and a polished result.`,
        estimatedDuration: "3 weeks",
        resources: [
          "GitHub project examples",
          "Portfolio project case studies",
        ],
        projectSuggestion: `Build and publish a portfolio project targeted specifically at ${targetRole} applications.`,
      },
      {
        step: 5,
        title: "Prepare for interviews",
        description: `Practice explaining your projects, decisions, tradeoffs, and learning path. Connect your current skills (${skillsText}) to the responsibilities of a ${targetRole}.`,
        estimatedDuration: "1-2 weeks",
        resources: [
          `${targetRole} interview questions`,
          "Mock interview practice platforms",
        ],
        projectSuggestion: "Write short STAR-format answers for your strongest project and skill examples.",
      },
      {
        step: 6,
        title: "Apply and iterate",
        description: `Start applying for ${targetRole} opportunities, track feedback, and improve your roadmap based on rejected applications, interviews, and new skill gaps.`,
        estimatedDuration: "Ongoing",
        resources: [
          "LinkedIn job alerts",
          "Resume review checklist",
        ],
        projectSuggestion: `Create a job application tracker for ${targetRole} roles and update it weekly.`,
      },
    ],
  };
};
