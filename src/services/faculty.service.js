import {ApiError }from "../utils/ApiError.js";

import {
  createFaculty,
  getFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
} from "../models/faculty.model.js";



export const createFacultyService = async (data) => {
  if (!data.name || !data.department)
    throw new ApiError(400, "Missing required fields");

  return await createFaculty(data);
};



export const getFacultyService = async (query) => {
  return await getFaculty(query.department);
};



export const getFacultyByIdService = async (id) => {
  const faculty = await getFacultyById(id);

  if (!faculty)
    throw new ApiError(404, "Faculty not found");

  return faculty;
};



export const updateFacultyService = async (id, data) => {
  const faculty = await getFacultyById(id);

  if (!faculty)
    throw new ApiError(404, "Faculty not found");

  return await updateFaculty(id, data);
};



export const deleteFacultyService = async (id) => {
  const faculty = await getFacultyById(id);

  if (!faculty)
    throw new ApiError(404, "Faculty not found");

  await deleteFaculty(id);
};