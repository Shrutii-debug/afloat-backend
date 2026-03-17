import express from "express";
import { getTasksController, createTaskController } from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", getTasksController);
router.post("/", createTaskController);

export default router;