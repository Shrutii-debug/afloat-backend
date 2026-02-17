import { pool } from "../config/db.js";

export const findStudentById = async (id) => {
  const { rows } = await pool.query(
    `SELECT s.id, s.name, s.email, s.year, s.section,
            s.department_id, d.name AS department_name
     FROM students s
     LEFT JOIN departments d ON s.department_id = d.id
     WHERE s.id = $1`,
    [id]
  );
  return rows[0];
};
