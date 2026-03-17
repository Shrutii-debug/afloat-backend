import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getTasksService, createTaskService } from "../services/task.service.js";

export const getTasksController = asyncHandler(async (req, res) => {
  const userId = req.query.user_id || 1;

  const tasks = await getTasksService(userId);

  res.status(200).json(
    new ApiResponse(200, tasks, "Tasks fetched successfully")
  );
});

export const createTaskController = asyncHandler(async (req, res) => {
  const task = await createTaskService(req.body);

  res.status(201).json(
    new ApiResponse(201, task, "Task created successfully")
  );
});