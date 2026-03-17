import { getAllBooks } from "../models/book.model.js";

export const getBooksService = async (title) => {
  return await getAllBooks(title);
};