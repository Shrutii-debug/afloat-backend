import ApiError from "../utils/ApiError.js";
import {
  createTimetableEntry,
  getStudentTimetable,
  deleteTimetableEntry,
  countTodayClasses,
} from "../models/timetable.model.js";

export const createTimeTableService = async (data) => {
    if(!data.subject_id || !data.day_of_week)
        throw new ApiError(400, "Missing required fields")

    return await createTimetableEntry(data)
}

export const getTimetableService = async (user, day) => {
    return await getStudentTimetable(
        user.department,
        user.year,
        day
    )
}

export const deleteTimetableService = async (id) => {
    await deleteTimetableEntry(id)
}

export const getTodayClassCountService = async (user) => {
    const today = new Date().toLocaleString("en-US", {weekday: "long"})

    return await countTodayClasses(
        user.department,
        user.year,
        today
    )
}