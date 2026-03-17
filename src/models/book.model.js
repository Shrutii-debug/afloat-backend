import { pool } from "../config/db.js";

export const getAllBooks = async (title = "") => {
  let query = `
    SELECT 
      b.id,
      b.isbn,
      b.title,
      b.author,
      b.publisher,
      b.category,
      COUNT(bc.id) AS total_copies,
      COUNT(CASE WHEN bc.status = 'available' THEN 1 END) AS available_copies
    FROM books b
    LEFT JOIN book_copies bc ON b.id = bc.book_id
  `;

  const values = [];

  if (title) {
    query += ` WHERE LOWER(b.title) LIKE LOWER($1) `;
    values.push(`%${title}%`);
  }

  query += `
    GROUP BY b.id
    ORDER BY b.title ASC
  `;

  const { rows } = await pool.query(query, values);
  return rows;
};