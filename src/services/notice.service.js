import { ApiError } from "../utils/ApiError.js"
import { getPagination } from "../utils/pagination.js"

import {
  createNotice,
  getNoticeByID,
  getFilteredNotices,
  countFilteredNotices,
  deleteNotice,
  countUrgentNotices,
} from "../models/notice.model.js"

export const createNoticeService = async (data) => {
  if (!data.title)
    throw new ApiError(400, "Title is required")

  return await createNotice(data)
}

export const getNoticeByIdService = async (id) => {
  const notice = await getNoticeByID(id)

  if (!notice)
    throw new ApiError(404, "Notice not found")

  return notice
}

export const getNoticesServices = async(queryParams) => {
    const {
        department,
        year,
        urgency,
        type,
        page = 1,
        limit = 10,
        sortField = "created_at",
        sortOrder = "DESC"
    } = queryParams

    const allowedSortFields = [
        "created_at",
        "title",
        "urgency",
        "type",
        "department"
    ]

    if(!allowedSortFields.includes(sortField)){
        throw new ApiError(400, "Invalid sort field")
    }

    const normalizedSortOrder = sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC"

    const filters = {
        department,
        urgency,
        year,
        type
    }

    const pagination = getPagination(page, limit)

    const notices = await getFilteredNotices(
        filters,
        pagination,
        sortField,
        normalizedSortOrder
    )

    const total = await countFilteredNotices(filters)

    return{
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        data: notices
    }
}

export const deleteNoticeService = async (id) => {
  const notice = await getNoticeById(id)

  if (!notice)
    throw new ApiError(404, "Notice not found")

  await deleteNotice(id)
}

export const getUrgentNoticeCountService = async (user) => {
  return await countUrgentNotices(user.department, user.year)
}