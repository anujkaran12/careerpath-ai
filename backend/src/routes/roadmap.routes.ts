import express from "express";
import {
  deleteRoadmapHandler,
  generateRoadmapHandler,
  getAllRoadmapsHandler,
  getRoadmapByIdHandler,
} from "../controllers/roadmap.controller";

const roadmapRouter = express.Router();

roadmapRouter.get("/", getAllRoadmapsHandler);

roadmapRouter.post("/generate", generateRoadmapHandler);

roadmapRouter.get("/:id", getRoadmapByIdHandler);

roadmapRouter.delete("/:id", deleteRoadmapHandler);



export default roadmapRouter;
