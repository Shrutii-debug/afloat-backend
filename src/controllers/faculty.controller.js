import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {
  createFacultyService,
  getFacultyService,
  getFacultyByIdService,
  updateFacultyService,
  deleteFacultyService,
} from "../services/faculty.service.js";



export const getFacultyController = asyncHandler(async (req, res) => {
  const data = await getFacultyService(req.query);

  res
    .status(200)
    .json(new ApiResponse(200, data, "Faculty fetched successfully"));
});



export const getFacultyByIdController = asyncHandler(async (req, res) => {
  const faculty = await getFacultyByIdService(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, faculty, "Faculty fetched successfully"));
});



export const createFacultyController = asyncHandler(async (req, res) => {
  const faculty = await createFacultyService(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, faculty, "Faculty created successfully"));
});



export const updateFacultyController = asyncHandler(async (req, res) => {
  const faculty = await updateFacultyService(req.params.id, req.body);

  res
    .status(200)
    .json(new ApiResponse(200, faculty, "Faculty updated successfully"));
});



export const deleteFacultyController = asyncHandler(async (req, res) => {
  await deleteFacultyService(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Faculty deleted successfully"));
});