import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db";
import roadmapRouter from "./routes/roadmap.routes";

const app = express();
const PORT = process.env.PORT || 5001;


app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000/",
  }),
);
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "CareerPath AI API Running",
  });
});

app.use("/api/roadmaps", roadmapRouter);

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Server startup aborted because the database connection failed.",
    );
    process.exit(1);
  }
}

startServer();
