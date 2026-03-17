import { pool } from "../config/db.js";

export const createInternship = async (data) => {
  const { company, title, deadline, link } = data;

  const { rows } = await pool.query(
    `INSERT INTO internships (company, title, deadline, link)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [company, title, deadline, link]
  );

  return rows[0];
};

export const getInternships = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM internships ORDER BY deadline ASC`
  );
  return rows;
};