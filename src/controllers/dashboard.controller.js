import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getDashboardService } from "../services/dashboard.service.js";

export const getDashboardController = asyncHandler(async (req, res) => {
  const data = await getDashboardService(req.user);

  res.status(200).json(
    new ApiResponse(200, data, "Dashboard fetched successfully")
  );
});