import { Request, Response } from "express";
import mongoose from "mongoose";
import { IGenerateRoadmapBody } from "../types";
import { RoadmapModel } from "../models/roadmap.model";
import { generateRoadmapWithAI } from "../services/ai.service";
import { generateHardcodedRoadmap } from "../services/hardcodedRoadmap.service";

export const generateRoadmapHandler = async (req: Request, res: Response) => {
  try {
    const { targetRole, currentSkills, experienceLevel, generationType } =
      req.body as IGenerateRoadmapBody;
    const selectedGenerationType = generationType ?? "ai";

    if (!targetRole || !currentSkills || !experienceLevel) {
      return res
        .status(400)
        .json({ status: "error", msg: "All fields are required" });
    }

    if (!["ai", "hardcoded"].includes(selectedGenerationType)) {
      return res
        .status(400)
        .json({ status: "error", msg: "Invalid generation type" });
    }

    const generatedRoadmap =
      selectedGenerationType === "hardcoded"
        ? generateHardcodedRoadmap({
            currentSkills,
            experienceLevel,
            targetRole,
            generationType: selectedGenerationType,
          })
        : await generateRoadmapWithAI({
            currentSkills,
            experienceLevel,
            targetRole,
            generationType: selectedGenerationType,
          });

    if (generatedRoadmap) {
      await RoadmapModel.create({
        targetRole,
        currentSkills,
        experienceLevel,
        generationType: selectedGenerationType,
        roadmap: generatedRoadmap.roadmap,
      });

      return res.status(201).json({
        status: "success",
        msg: "Roadmap Generated Successfully",
        data: {
          ...generatedRoadmap,
          generationType: selectedGenerationType,
        },
      });
    }
    return res.status(400).json({
      status: "error",
      msg: "Unable to Generate Roadmap",
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ status: "error", msg: error.message ?? "internal server error" });
  }
};

export const getAllRoadmapsHandler = async (req: Request, res: Response) => {
  try {
    const roadmaps = await RoadmapModel.find();
    return res.status(200).json({
      status: "success",
      msg: "Fetched all Roadmaps successfully",
      data: roadmaps,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ status: "error", msg: error.message ?? "internal server error" });
  }
};

export const deleteRoadmapHandler = async (req: Request, res: Response) => {
  try {
    const { id: roadmapId } = req.params;

    if (!mongoose.isValidObjectId(roadmapId)) {
      return res
        .status(400)
        .json({ status: "error", msg: "Invalid roadmap id" });
    }

    const deleted = await RoadmapModel.findByIdAndDelete(roadmapId);
    if (!deleted) {
      return res
        .status(404)
        .json({ status: "error", msg: "Roadmap not found" });
    }

    return res
      .status(200)
      .json({ status: "success", msg: "Roadmap deleted successfully" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ status: "error", msg: error.message ?? "internal server error" });
  }
};

export const getRoadmapByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id: roadmapId } = req.params;

    if (!mongoose.isValidObjectId(roadmapId)) {
      return res
        .status(400)
        .json({ status: "error", msg: "Invalid roadmap id" });
    }

    const roadmap = await RoadmapModel.findById(roadmapId);
    if (!roadmap) {
      return res
        .status(404)
        .json({ status: "error", msg: "Roadmap not found" });
    }

    return res.status(200).json({
      status: "success",
      msg: "Roadmap Fetched Successfully",
      data: roadmap,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ status: "error", msg: error.message ?? "internal server error" });
  }
};
