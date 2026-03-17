import { createInternship, getInternships } from "../models/internship.model.js";

export const createInternshipService = async (data) => {
  return await createInternship(data);
};

export const getInternshipsService = async () => {
  return await getInternships();
};