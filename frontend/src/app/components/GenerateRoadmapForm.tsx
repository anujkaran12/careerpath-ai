"use client";

import { FormEvent, useState } from "react";
import {
  ExperienceLevel,
  GenerateRoadmapPayload,
  GenerationType,
} from "@/types/roadmap";

type Props = {
  isGenerating: boolean;
  onGenerate: (payload: GenerateRoadmapPayload) => Promise<void>;
};

const experienceLevels: ExperienceLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

const generationTypes: { label: string; value: GenerationType }[] = [
  { label: "AI Generated", value: "ai" },
  { label: "Hardcoded", value: "hardcoded" },
];

const parseSkills = (value: string) =>
  value
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

export default function GenerateRoadmapForm({
  isGenerating,
  onGenerate,
}: Props) {
  const [targetRole, setTargetRole] = useState("");
  const [currentSkills, setCurrentSkills] = useState("");
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel>("Beginner");
  const [generationType, setGenerationType] = useState<GenerationType>("ai");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onGenerate({
      targetRole: targetRole.trim(),
      currentSkills: parseSkills(currentSkills),
      experienceLevel,
      generationType,
    });
  };

  return (
    <section className="rounded-lg border border-(--border-primary) bg-(--bg-card) p-5">
      <h2 className="mb-5 text-xl font-medium">Generate Roadmap</h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm text-(--text-secondary)">
            Target Role
          </label>

          <input
            type="text"
            value={targetRole}
            onChange={(event) => setTargetRole(event.target.value)}
            placeholder="Frontend Developer"
            className="w-full rounded-lg border border-(--border-primary) bg-(--bg-secondary) px-3 py-2.5 text-(--text-primary) placeholder:text-(--text-muted) outline-none focus:border-(--accent)"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-(--text-secondary)">
            Current Skills
          </label>

          <textarea
            rows={4}
            value={currentSkills}
            onChange={(event) => setCurrentSkills(event.target.value)}
            placeholder="HTML, CSS, JavaScript"
            className="w-full resize-none rounded-lg border border-(--border-primary) bg-(--bg-secondary) px-3 py-2.5 text-(--text-primary) placeholder:text-(--text-muted) outline-none focus:border-(--accent)"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-(--text-secondary)">
            Experience Level
          </label>

          <select
            value={experienceLevel}
            onChange={(event) =>
              setExperienceLevel(event.target.value as ExperienceLevel)
            }
            className="w-full rounded-lg border border-(--border-primary) bg-(--bg-secondary) px-3 py-2.5 outline-none focus:border-(--accent)"
          >
            {experienceLevels.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-(--text-secondary)">
            Roadmap Source
          </label>

          <div className="grid grid-cols-2 gap-2 rounded-lg border border-(--border-primary) bg-(--bg-secondary) p-1">
            {generationTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setGenerationType(type.value)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  generationType === type.value
                    ? "bg-(--accent) text-black"
                    : "text-(--text-secondary) hover:text-(--text-primary)"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={isGenerating}
          type="submit"
          className="w-full rounded-lg bg-(--accent) py-2.5 font-medium text-black transition hover:bg-(--accent-hover) disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGenerating ? "Generating..." : "Generate Roadmap"}
        </button>
      </form>
    </section>
  );
}
