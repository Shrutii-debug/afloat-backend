import { ApiError } from "../utils/ApiError.js";
import {
  createMaterial,
  getMaterialsBySubject,
  deleteMaterial,
} from "../models/material.model.js";

export const createMaterialService = async (data) => {
  if (!data.subject_id || !data.title || !data.file_url)
    throw new ApiError(400, "Missing required fields");

  return await createMaterial(data);
};

export const getMaterialsService = async (subject_id) => {
  return await getMaterialsBySubject(subject_id);
};

export const deleteMaterialService = async (id) => {
  await deleteMaterial(id);
};