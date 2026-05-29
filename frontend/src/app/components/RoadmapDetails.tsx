import Link from "next/link";
import { Roadmap, RoadmapStep } from "@/types/roadmap";

type Props = {
  roadmap: Roadmap;
};

const formatDate = (date?: string) => {
  if (!date) {
    return "Not available";
  }

  return new Date(date).toLocaleDateString();
};

const renderMeta = (label: string, value: string | number) => (
  <div>
    <p className="text-xs uppercase text-(--text-muted)">{label}</p>
    <p className="mt-1 text-sm font-medium text-(--text-primary)">{value}</p>
  </div>
);

const renderSkills = (skills: string[]) => (
  <div className="mt-5 flex flex-wrap gap-2">
    {skills.map((skill) => (
      <span
        key={skill}
        className="rounded-lg border border-(--border-primary) px-3 py-1 text-sm text-(--text-secondary)"
      >
        {skill}
      </span>
    ))}
  </div>
);

const renderResources = (resources: string[]) => {
  if (!resources.length) {
    return <p className="text-sm text-(--text-muted)">No resources listed.</p>;
  }

  return (
    <ul className="mt-3 space-y-2">
      {resources.map((resource, index) => (
        <li
          key={`${resource}-${index}`}
          className="rounded-lg bg-(--bg-secondary) px-3 py-2 text-sm text-(--text-secondary)"
        >
          {resource}
        </li>
      ))}
    </ul>
  );
};

const renderStep = (item: RoadmapStep) => (
  <article
    key={item._id ?? item.step}
    className="rounded-lg border border-(--border-primary) bg-(--bg-card) p-5"
  >
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--accent) text-sm font-medium text-black">
          {item.step}
        </span>
        <div>
          <h2 className="text-xl font-medium leading-snug">{item.title}</h2>
          <p className="mt-1 text-sm text-(--text-muted)">
            {item.estimatedDuration}
          </p>
        </div>
      </div>
    </div>

    <p className="mt-4 leading-7 text-(--text-secondary)">
      {item.description}
    </p>

    <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_320px]">
      <div>
        <h3 className="text-sm font-medium">Resources</h3>
        {renderResources(item.resources)}
      </div>

      <div>
        <h3 className="text-sm font-medium">Project</h3>
        <p className="mt-3 rounded-lg bg-(--bg-secondary) px-3 py-2 text-sm leading-6 text-(--text-secondary)">
          {item.projectSuggestion}
        </p>
      </div>
    </div>
  </article>
);

export default function RoadmapDetails({ roadmap }: Props) {
  return (
    <main className="min-h-screen bg-(--bg-primary) text-(--text-primary)">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link
          href="/"
          className="text-sm text-(--text-secondary) transition hover:text-(--text-primary)"
        >
          Back to roadmaps
        </Link>

        <header className="mt-8 border-b border-(--border-primary) pb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm text-(--text-secondary)">
                {roadmap.experienceLevel} roadmap
              </p>
              <h1 className="mt-3 text-4xl font-medium tracking-tight">
                {roadmap.targetRole}
              </h1>
              {renderSkills(roadmap.currentSkills)}
            </div>

            <div className="grid grid-cols-3 gap-6">
              {renderMeta("Steps", roadmap.roadmap.length)}
              {renderMeta("Created", formatDate(roadmap.createdAt))}
              
            </div>
          </div>
        </header>

        <section className="mt-8 space-y-4">
          {roadmap.roadmap.map((item) => renderStep(item))}
        </section>
      </div>
    </main>
  );
}
