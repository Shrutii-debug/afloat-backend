import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createNoticeService,
  getNoticeByIdService,
  getNoticesService,
  deleteNoticeService,
} from "../services/notice.service.js";

export const createNoticeController = asyncHandler(async(req, res) => {
    const notice = await createNoticeService(req.body)

res
    .status(201)
    .json(new ApiResponse(201, notice, "notice created successfully"))
    })

export const getNoticeByIdController = asyncHandler(async (req, res) => {
    const notice = await getNoticeByIdService(req.params.id)

    res
    .status(200)
    .json(new ApiResponse(200, notice, "notice fetched successfully"))
})

export const getNoticedController = asyncHandler(async (req, res) => {
    const data = await getNoticesService(req.query)
    res
    .status(200)
    .json(new ApiResponse(200, data, "notices fetched successfully"))
})

export const deleteNoticeController = asyncHandler(async (req, res) => {
    await deleteNoticeService(req.params.id)

    res
    .status(200)
    .json(new ApiResponse(200, null, "notice deleted successfully"))
})
