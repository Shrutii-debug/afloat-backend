import { pool } from "../config/db.js";

export const findPreferences = async (studentId) => {
  const { rows } = await pool.query(
    `SELECT * FROM student_preferences WHERE student_id=$1`,
    [studentId]
  );
  return rows[0];
};
