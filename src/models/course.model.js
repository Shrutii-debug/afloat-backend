import { pool } from "../config/db.js";

export const getCoursesByDepartment = async (deptId) => {
  const { rows } = await pool.query(
    `SELECT * FROM courses WHERE department_id=$1`,
    [deptId]
  );
  return rows;
};

export const findCourseById = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM courses WHERE id=$1`,
    [id]
  );
  return rows[0];
};
