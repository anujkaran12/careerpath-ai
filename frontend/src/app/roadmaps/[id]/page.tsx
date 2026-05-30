"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import CircularLoader from "@/app/components/CircularLoader";
import ErrorMessage from "@/app/components/ErrorMessage";
import RoadmapDetails from "@/app/components/RoadmapDetails";
import { Roadmap } from "@/types/roadmap";

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data as
      | { msg?: string; message?: string }
      | undefined;

    return (
      responseData?.msg ||
      responseData?.message ||
      error.message ||
      "Something went wrong"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
};

const getRoadmap = async (id: string) => {
  const response = await axios.get(`/api/roadmaps/${id}`);

  return response.data.data as Roadmap | null;
};

export default function Page() {
  const params = useParams<{ id: string }>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadRoadmap = async () => {
      try {
        const item = await getRoadmap(params.id);

        if (isActive) {
          setRoadmap(item);
        }
      } catch (error) {
        if (isActive) {
          setError(getErrorMessage(error));
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    void loadRoadmap();

    return () => {
      isActive = false;
    };
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <CircularLoader label="Loading roadmap" />
      </main>
    );
  }

  if (error || !roadmap) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-(--bg-primary) px-6 text-(--text-primary)">
        <ErrorMessage
          className="w-full max-w-md"
          message={error || "Roadmap Not Found"}
          title={error ? "Unable to load roadmap" : "Roadmap not found"}
        />
      </main>
    );
  }

  return <RoadmapDetails roadmap={roadmap} />;
}
