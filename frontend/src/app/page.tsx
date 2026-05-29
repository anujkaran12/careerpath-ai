"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import GenerateRoadmapForm from "@/app/components/GenerateRoadmapForm";
import HomeHeader from "@/app/components/HomeHeader";
import RecentRoadmaps from "@/app/components/RecentRoadmaps";
import { GenerateRoadmapPayload, Roadmap } from "@/types/roadmap";

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.msg || error.message;
  }

  return "Something went wrong";
};

const getRoadmaps = async () => {
  const response = await axios.get("/api/roadmaps");

  return response.data.data as Roadmap[];
};

const generateRoadmap = async (payload: GenerateRoadmapPayload) => {
  await axios.post("/api/roadmaps/generate", payload);
};

const deleteRoadmap = async (id: string) => {
  await axios.delete(`/api/roadmaps/${id}`);
};

export default function Home() {
  const [error, setError] = useState("");
  const [isFetchingRoadmaps, setIsFetchingRoadmaps] = useState(true);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);

  const loadRoadmaps = async () => {
    try {
      setIsFetchingRoadmaps(true);
      setRoadmaps(await getRoadmaps());
    } finally {
      setIsFetchingRoadmaps(false);
    }
  };

  const handleGenerate = async (payload: GenerateRoadmapPayload) => {
    try {
      setIsGeneratingRoadmap(true);
      setError("");
      await generateRoadmap(payload);
      await loadRoadmaps();
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError("");
      await deleteRoadmap(id);
      setRoadmaps((items) => items.filter((item) => item._id !== id));
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  useEffect(() => {
    let isActive = true;

    const loadRoadmaps = async () => {
      try {
        if (isActive) {
          setIsFetchingRoadmaps(true);
        }

        const items = await getRoadmaps();

        if (isActive) {
          setRoadmaps(items);
        }
      } catch (error) {
        if (isActive) {
          setError(getErrorMessage(error));
        }
      } finally {
        if (isActive) {
          setIsFetchingRoadmaps(false);
        }
      }
    };

    void loadRoadmaps();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-(--bg-primary) text-(--text-primary)">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <HomeHeader />

        <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
          <GenerateRoadmapForm
            isGenerating={isGeneratingRoadmap}
            onGenerate={handleGenerate}
          />
          <RecentRoadmaps
            error={error}
            isFetching={isFetchingRoadmaps}
            roadmaps={roadmaps}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </main>
  );
}
