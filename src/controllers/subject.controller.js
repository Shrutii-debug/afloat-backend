import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";

import {
  createSubjectService,
  getSubjectsService,
  getSubjectByIdService,
  deleteSubjectService,
} from "../services/subject.service.js";


export const getSubjectsController = asyncHandler(async (req, res) => {
  const data = await getSubjectsService(req.user, req.query);

  res
    .status(200)
    .json(new ApiResponse(200, data, "Subjects fetched successfully"));
});


export const getSubjectByIdController = asyncHandler(async (req, res) => {
  const subject = await getSubjectByIdService(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, subject, "Subject fetched successfully"));
});



export const createSubjectController = asyncHandler(async (req, res) => {
  const subject = await createSubjectService(req.body);

  res
    .status(201)
    .json(new ApiResponse(201, subject, "Subject created successfully"));
});


export const deleteSubjectController = asyncHandler(async (req, res) => {
  await deleteSubjectService(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, null, "Subject deleted successfully"));
});