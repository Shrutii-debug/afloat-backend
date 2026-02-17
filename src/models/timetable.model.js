import { pool } from "../config/db.js";

export const findByDayAndSection = async (day, section, courseIds) => {
  const { rows } = await pool.query(
    `SELECT t.*, c.course_name
     FROM timetable t
     JOIN courses c ON t.course_id = c.id
     WHERE t.day_of_week = $1
     AND t.section = $2
     AND t.course_id = ANY($3::int[])
     ORDER BY start_time`,
    [day, section, courseIds]
  );
  return rows;
};
