import { RequestHandler } from "express";
import mongoose from "mongoose";
import { IGenerateRoadmapBody } from "../types";
import { RoadmapModel } from "../models/roadmap.model";
import { generateRoadmapWithAI } from "../services/ai.service";

export const generateRoadmapHandler: RequestHandler = async (req, res) => {
  try {
    const { targetRole, currentSkills, experienceLevel } =
      req.body as IGenerateRoadmapBody;

    if (!targetRole || !currentSkills || !experienceLevel) {
      return res
        .status(400)
        .json({ status: "error", msg: "All fields are required" });
    }

    const generatedRoadmap = await generateRoadmapWithAI({
      currentSkills,
      experienceLevel,
      targetRole,
    });

    if (generatedRoadmap) { 
      const roadmap = await RoadmapModel.create({
        targetRole,
        currentSkills,
        experienceLevel,
        roadmap: generatedRoadmap.roadmap,
      });

      return res.status(201).json({
        status: "success",
        msg: "Roadmap Generated Successfully",
        data: generatedRoadmap,
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

export const getAllRoadmapsHandler: RequestHandler = async (req, res) => {
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

export const deleteRoadmapHandler: RequestHandler = async (req, res) => {
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

export const getRoadmapByIdHandler: RequestHandler = async (req, res) => {
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
