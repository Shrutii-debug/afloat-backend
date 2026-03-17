import { asyncHandler} from "../utils/asyncHandler.js";
import { ApiResponse }from "../utils/ApiResponse.js";
import {
  createInternshipService,
  getInternshipsService,
} from "../services/internship.service.js";

export const createInternshipController = asyncHandler(async (req, res) => {
  const data = await createInternshipService(req.body);

  res.status(201).json(
    new ApiResponse(201, data, "Internship created successfully")
  );
});

export const getInternshipsController = asyncHandler(async (req, res) => {
  const data = await getInternshipsService();

  res.status(200).json(
    new ApiResponse(200, data, "Internships fetched successfully")
  );
});