import {ApiError} from "../utils/ApiError.js";

import {
  createSubject,
  getSubjects,
  getSubjectById,
  deleteSubject,
} from "../models/subject.model.js";



export const createSubjectService = async (data) => {
  if (!data.name || !data.department || !data.year)
    throw new ApiError(400, "Missing required fields");

  return await createSubject(data);
};



export const getSubjectsService = async (user, query) => {
  const department = query.department || user.department;
  const year = query.year || user.year;

  return await getSubjects(department, year);
};



export const getSubjectByIdService = async (id) => {
  const subject = await getSubjectById(id);

  if (!subject)
    throw new ApiError(404, "Subject not found");

  return subject;
};


export const deleteSubjectService = async (id) => {
  await deleteSubject(id);
};