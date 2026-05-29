"use client";

import Link from "next/link";
import CircularLoader from "@/app/components/CircularLoader";
import { Roadmap } from "@/types/roadmap";

type Props = {
  error: string;
  isFetching: boolean;
  roadmaps: Roadmap[];
  onDelete: (id: string) => Promise<void>;
};

const formatDate = (date?: string) => {
  if (!date) {
    return "Recently";
  }

  return new Date(date).toLocaleDateString();
};

export default function RecentRoadmaps({
  error,
  isFetching,
  roadmaps,
  onDelete,
}: Props) {
  const renderContent = () => {
    if (isFetching) {
      return (
        <main className="h-full flex items-center justify-center">
          <CircularLoader label="Loading roadmaps" />
        </main>
      );
    }

    if (error) {
      return <p className="text-(--danger)">{error}</p>;
    }

    if (!roadmaps.length) {
      return (
        <div className="flex h-[300px] items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-medium">No Roadmaps Yet</h3>
            <p className="mt-2 text-sm text-(--text-secondary)">
              Generate your first roadmap to get started.
            </p>
          </div>
        </div>
      );
    }

    return renderRoadmapGrid();
  };

  const renderRoadmapGrid = () => (
    <div className="grid gap-3 md:grid-cols-2">
      {roadmaps.map((item) => (
        <article
          key={item._id}
          className="rounded-lg border border-(--border-primary) bg-(--bg-secondary) p-4 transition"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-lg border border-(--border-primary) px-2.5 py-1 text-xs text-(--text-secondary)">
              {item.experienceLevel}
            </span>

            <span className="text-xs text-(--text-muted)">
              {formatDate(item.createdAt)}
            </span>
          </div>

          <h3 className="mt-4 text-lg font-medium">{item.targetRole}</h3>

          <p className="mt-2 text-sm text-(--text-secondary)">
            {item.roadmap.length} learning steps generated
          </p>

          <div className="mt-5 flex gap-2">
            <Link
              href={`/roadmaps/${item._id}`}
              className="flex-1 rounded-lg bg-(--accent) px-3 py-2 text-center text-sm font-medium text-black"
            >
              View Roadmap
            </Link>

            <button
              type="button"
              onClick={() => onDelete(item._id)}
              className="rounded-lg border border-(--danger) px-3 py-2 text-sm text-(--danger) transition"
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <section className="rounded-lg border border-(--border-primary) bg-(--bg-card) p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-medium">Recent Roadmaps</h2>
      </div>

      {renderContent()}
    </section>
  );
}
