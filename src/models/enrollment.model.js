import { pool } from "../config/db.js";

export const findCoursesByStudent = async (studentId) => {
  const { rows } = await pool.query(
    `SELECT c.*
     FROM enrollments e
     JOIN courses c ON e.course_id = c.id
     WHERE e.student_id = $1`,
    [studentId]
  );
  return rows;
};
