import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getBooksService } from "../services/book.service.js";

export const getBooksController = asyncHandler(async (req, res) => {
  const title = req.query.title || "";
  const books = await getBooksService(title);

  res.status(200).json(
    new ApiResponse(200, books, "Books fetched successfully")
  );
});