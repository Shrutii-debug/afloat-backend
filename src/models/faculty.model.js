import { pool } from "../config/db.js";

export const getAllFaculty = async () => {
  const { rows } = await pool.query(
    `SELECT id, name, email, office_hours, department_id
     FROM faculty ORDER BY name`
  );
  return rows;
};

export const findFacultyById = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM faculty WHERE id=$1`,
    [id]
  );
  return rows[0];
};
