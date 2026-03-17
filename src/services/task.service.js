import { getTasksByUserId, createTask } from "../models/task.model.js";

export const getTasksService = async (userId) => {
  return await getTasksByUserId(userId);
};

export const createTaskService = async (data) => {
  return await createTask(data);
};