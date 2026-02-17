import { pool } from "../config/db.js";

export const findByCourseIds = async (courseIds) => {
  const { rows } = await pool.query(
    `SELECT * FROM assignments
     WHERE course_id = ANY($1::int[])`,
    [courseIds]
  );
  return rows;
};
