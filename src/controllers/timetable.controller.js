import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiResponse }from "../utils/ApiResponse.js"

import {
  createTimetableService,
  getTimetableService,
  deleteTimetableService,
} from "../services/timetable.service.js"

export const getTimetableController = asyncHandler(async (req, res) => {
    const { day } = req.query

    const data = await getTimetableService(req.user, day)

    res
    .status(200)
    .json(new ApiResponse(200, data, "Timetable fetched successfully"))
})

export const createTimetableController = asyncHandler(async (req, res) => {
  const entry = await createTimetableService(req.body)

  res
    .status(201)
    .json(new ApiResponse(201, entry, "Timetable entry created"))
});

export const deleteTimetableController = asyncHandler(async (req, res) => {
  await deleteTimetableService(req.params.id)

  res
    .status(200)
    .json(new ApiResponse(200, null, "Timetable entry deleted"))
})