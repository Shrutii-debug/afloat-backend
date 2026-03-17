import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {
  createMaterialService,
  getMaterialsService,
  deleteMaterialService,
} from "../services/material.service.js";

export const createMaterialController = asyncHandler(async (req, res) => {
  const material = await createMaterialService(req.body);

  res.status(201).json(
    new ApiResponse(201, material, "Material uploaded successfully")
  );
});

export const getMaterialsController = asyncHandler(async (req, res) => {
  const data = await getMaterialsService(req.query.subject_id);

  res.status(200).json(
    new ApiResponse(200, data, "Materials fetched successfully")
  );
});

export const deleteMaterialController = asyncHandler(async (req, res) => {
  await deleteMaterialService(req.params.id);

  res.status(200).json(
    new ApiResponse(200, null, "Material deleted successfully")
  );
});